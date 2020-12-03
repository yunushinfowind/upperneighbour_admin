const db = require("../models");
const User = db.user;
const Room = db.room;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
var passport = require('passport');
var bcryptjs = require('bcryptjs');
var auth = require('../config/passport');
var appRoot = require('app-root-path');



// Create and Save a new user
exports.register = (req, res) => {


	var fileName = '';
	if (req.files) {
		const image = req.files.profile
		const path = __dirname + '/images/' + image.name
		image.mv(path, (error) => {
			if (error) {
				res.writeHead(500, {
					'Content-Type': 'application/json'
				})
				res.end(JSON.stringify({ status: 'error', message: error }))
			}
		})
		fileName = image.name
	}
	var salt = 10;
	var passwordHash;
	var userData = {};
	bcrypt.hash(req.body.password, salt, (err, encrypted) => {
		passwordHash = encrypted;
		userData = {
			email: req.body.email,
			password: passwordHash,
			fullname: req.body.fullname,
			profile: fileName,
			role_id: req.body.role_id
		};
		User.findOne({ where: { email: req.body.email } }).then(
			user => {
				if (!user) {
					User.create(userData)
						.then(data => {
							res.send({ 'success': true, 'data': data });
						})
						.catch(err => {
							res.status(500).send({
								'success': false,
								message:
									err.message || "Some error occurred while creating the Tutorial."
							});
						});
				} else {
					res.status(421).send({
						'success': false,
						message: "Email Already exist."

					});
				}
			}

		)

	})

};

exports.updateProfile = async function (req, res, next) {

	console.log(req.files);
	try {
		var fileName;
		if (req.files) {
			const image = req.files.profile
			const path = __dirname + '/images/' + image.name
			await image.mv(path, (error) => {
				if (error) {
					console.error(error)
					res.writeHead(500, {
						'Content-Type': 'application/json'
					})
					res.end(JSON.stringify({ status: 'error', message: error }))
				}
			})
			fileName = image.name;
		}

		if (req.body.type == 'private') {
			var userModel = await User.findOne({ where: { id: req.body.user_id } });
			if (userModel) {
				if (req.body.name) {
					userModel.name = req.body.name;
				}
				if (req.files) {
					userModel.profile = fileName;
				}
				userModel.save();
				res.send({ 'success': true, message: "profile updated successfully.", data: userModel });
			}
			res.send({ 'success': false, message: "record not found.", data: [] });
		} else {
			var roomModel = await Room.findOne({ where: { id: req.body.user_id } });
			if (roomModel) {
				if (req.body.name) {
					roomModel.group_name = req.body.name;
				}
				if (req.files) {
					roomModel.group_image = fileName;
				}
				roomModel.save();
				res.send({ 'success': true, message: "profile updated successfully.", data: roomModel });
			}
			res.send({ 'success': false, message: "record not found.", data: [] });
		}
	} catch (error) {
		res.send({ 'success': false, message: error.message, data: [] });
	}

}

exports.login = async function (req, res, next) {

	try {
		let user = await User.findOne({ where: { email: req.body.email, role_id: req.body.role_id } });
		if (user) {
			await bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
				if (err)
					console.log(err);
				if (isMatch) {
					let token = User.generateToken();
					var obj = Object.assign({}, user.get());
					obj.login_token = token;
					let updateData = {
						login_token: token,
						device_id: req.body.device_id
					}
					User.update(updateData, { where: { email: obj.email } });

					res.send({ 'success': true, 'data': obj });
				} else {
					res.send({ 'success': false, message: "invalid credential" });
				}
			});
		}
		else {
			res.status(200).send({
				'success': false, message: "Invalid credential."
			});
		};
	} catch (e) {
		res.send({ success: false, message: e.message, data: [] });
	}

}

exports.socialLogin = async function (req, res, next) {

	try {

		let token = User.generateToken();
		var user = await User.findOne({ where: { source_id: req.body.source_id } });
		if (user) {
			let updateData = {
				login_token: token
			}
			 await User.update(updateData, { where: { id: user.id } })
			user = await User.findOne({ where: { source_id: req.body.source_id } });
		} else {
			let userData = {
				email: req.body.email,
				fullname: req.body.first_name + ' ' + req.body.last_name,
				profile: req.body.profile,
				role_id: req.body.role_id,
				type: 'social',
				source_id: req.body.source_id,
				device_id: req.body.device_id,
				social_type: req.body.type,
				login_token: token
			}
			user = await User.create(userData);
		}
		res.send({ success: true, message: '', data: user });
	} catch (e) {
		res.send({ success: false, message: e.message, data: [] });
	}

}

exports.logout = function (req, res, next) {
	console.log(res.body);
	User.findOne({ where: { email: req.body.email } }).then(data => {
		let updateData = {
			login_token: ''
		}
		User.update(updateData, { where: { email: data.email } });
		res.send({ 'success': true, 'message': 'Logout Successfully.' });
	}).catch(err => {
		res.status(500).send({
			message:
				err.message || "Invalid credential."
		});
	});

}
exports.userLogOut = async function (req, res, next) {

	try {

		let token = await User.getToken(req);
		let isValidToekn = await validateToekn(token);
		if (isValidToekn) {
			let loginId = await getLoginUserId(token);
			await User.findOne({ where: { id: loginId } });
				let updateData = {
					login_token: ''
				}
				User.update(updateData, { where: { id: loginId } });
				res.send({ 'success': true, 'message': 'Logout Successfully.' });
		} else {
			res.send({ success: false, message: "Invalid token", data: [] });
		}
	} catch (e) {
		res.send({ success: false, message: e.message, data: [] });
	}
}
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
	const title = req.query.title;
	var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

	Tutorial.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving tutorials."
			});
		});
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Tutorial.findByPk(id)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Tutorial with id=" + id
			});
		});
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Tutorial.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Tutorial was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Tutorial with id=" + id
			});
		});
};

let validateToekn = async (token) => {
	let userObj = await User.findOne({ where: { login_token: token } });
	if (userObj) {
		return true;
	}
	return false;
}
let getLoginUserId = async (token) => {
	let userObj = await User.findOne({ where: { login_token: token } });
	if (userObj) {
		return userObj.id;
	}
}

let getUserImage = (userid) => {
	User.findOne({ where: { id: userid } }).then(user => {
		var imagePath = appRoot.path + '/app/controlles/images/' + user.profile;
		return imagePath;
	});
}