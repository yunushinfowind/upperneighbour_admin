const db = require("../models");
const UserRoom = db.user_room;
const Room = db.room;
const Message = db.message;
const User = db.user;
const Blog = db.blog;
const UserSavedRoutine = db.userSaveRoutine;
const RoutineVideo = db.routineVideo;
const TeacherVideos = db.teacherVideo;
const Routine = db.routine;
const TeacherPrfile = db.teacherProfile;
const UserEmoji = db.userEmoji;
const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const config = require("../config/config.js");
const user = require("../routes/user");
// const { where } = require("sequelize");
// const Instagram = require('instagram-web-api')




exports.blogList = async (req, res) => {
	let token = await User.getToken(req);
	let isValidToekn = await validateToekn(token);
	if (isValidToekn) {
		let whereCondition = {
			status: 'active'
		}
		if (req.query.search) {
			console.log('innnn')
			whereCondition = {
				[Op.and]: [
					{ status: 'active' },
					{
						title: {
							[Op.like]: '%' + req.query.search + '%'
						}
					}
				]
			}
		}
		let limit = 10
		let offset = 0 + (req.query.page - 1) * limit
		let blogList = await Blog.findAndCountAll({
			where: whereCondition,
			limit: limit,
			offset: offset,
			order: [['id', 'DESC']]
		});
		if (blogList) {
			blogList['rows'] = blogList['rows'];
			blogList['currentPage'] = req.query.page;
			blogList['totalPages'] = Math.ceil(blogList['count'] / limit);
		}
		res.send({ success: true, message: "", data: blogList });
	} else {
		res.send({ success: false, message: "Invalid token", data: [] });
	}
};

exports.blogDetail = async function (req, res, next) {
	try {
		var blog = await Blog.findOne({ where: { id: req.params.blog_id } });
		res.send({ success: true, message: "", data: blog });
	} catch (e) {
		res.send({ success: false, message: e.message, data: [] });
	}
}

exports.userDetail = async function (req, res, next) {

	try {
		let token = await User.getToken(req);
		let isValidToekn = await validateToekn(token);
		if (isValidToekn) {
			let loginId = await getLoginUserId(token);
			result = await User.findOne({
				where: { id: loginId }
			});
			res.send({ success: true, message: "", data: result });
		} else {
			res.send({ success: false, message: "Invalid token", data: [] });
		}
	} catch (e) {
		res.send({ success: false, message: e.message, data: [] });
	}
}

exports.savedVideoList = async function (req, res, next) {

	try {
		let token = await User.getToken(req);
		let isValidToekn = await validateToekn(token);
		if (isValidToekn) {
			let loginId = await getLoginUserId(token);
			var All = [];
			let limit = 10
			let offset = 0 + (req.query.page - 1) * limit
			let userVideoList = await UserSavedRoutine.findAndCountAll({
				where: {
					user_id: loginId
				},
				limit: limit,
				offset: offset,
				include: [{
					model: db.routine
				}
				],
				order: [['id', 'DESC']]
			}
			);
			for (const row of userVideoList['rows']) {
				var obj = Object.assign({}, row.get());
				obj.total_duration = await getTotalRoutineDuration(obj.routine_id);
				All.push(obj);
			}
			userVideoList['rows'] = All;
			userVideoList['currentPage'] = req.query.page;
			userVideoList['totalPages'] = Math.ceil(userVideoList['count'] / limit);
			res.send({ success: true, message: "", data: userVideoList });
		} else {
			res.send({ success: false, message: "Invalid token", data: [] });
		}

	} catch (e) {
		res.send({ success: false, message: e.message, data: [] });
	}
}

exports.teacherList = async function (req, res, next) {

	try {
		let token = await User.getToken(req);
		let isValidToekn = await validateToekn(token);
		if (isValidToekn) {
			var All = [];
			let whereCondition = {
				role_id: 3
			}
			if (req.query.search) {
				whereCondition = {
					[Op.and]: [
						{ role_id: 3 },
						{
							fullname: {
								[Op.like]: '%' + req.query.search + '%'
							}
						}
					]
				}
			}
			let limit = 10
			let offset = 0 + (req.query.page - 1) * limit
			let teacherList = await User.findAndCountAll({
				where: whereCondition,
				include: [{
					model: db.teacherProfile
				}
				],
				limit: limit,
				offset: offset,
				order: [['id', 'DESC']]
			}
			);
			for (const row of teacherList['rows']) {
				var obj = Object.assign({}, row.get());
				obj.routine_count = await getRoutineCount(obj.id);
				obj.video_count = await getVideoCount(obj.id);
				obj.normal_video_count = await getNormalVideoCount(obj.id);
				All.push(obj);
			}
			teacherList['rows'] = All;
			teacherList['currentPage'] = req.query.page;
			teacherList['totalPages'] = Math.ceil(teacherList['count'] / limit);
			res.send({ success: true, message: "", data: teacherList });
		} else {
			res.send({ success: false, message: "Invalid token", data: [] });
		}

	} catch (e) {
		res.send({ success: false, message: e.message, data: [] });
	}
}

exports.feedList = async function (req, res, next) {

	try {
		// const username = "pankajsonava453@gmail.com";
		// const password = "sonava@123";
		// const client = new Instagram({ username, password });

		// (async () => {
		// 	await client.login()
		// 	const profile = await client.getProfile()
			// const media = await client.getMediaByShortcode({ shortcode: 'BQE6Cq2AqM9' })
			// var media = await client.getChallenge({ challengeUrl: '/challenge/1284161654/a1B2c3d4E6/' })
			// const location = await client.getMediaFeedByLocation({ locationId: '26914683' })
			// const tag = await client.getMediaFeedByHashtag({ hashtag: 'pmmodi' })
		// 	res.send({ success: true, message: "", data: profile });

		// })()
	} catch (e) {
		res.send({ success: false, message: e.message, data: [] });
	}
}

exports.routineVideoList = async function (req, res, next) {

	try {
		
		let token = await User.getToken(req);
		let isValidToekn = await validateToekn(token);
		if (isValidToekn) {
			let whereCondition = {
				routine_id: req.query.routine_id
			}
			if (req.query.search) {
				whereCondition = {
					[Op.and]: [
						{ routine_id: req.query.routine_id},
						{
							video_title: {
								[Op.like]: '%' + req.query.search + '%'
							}
						}
					]
				}
			}
			let limit = 10
			let offset = 0 + (req.query.page - 1) * limit
			let routineVideoList = await RoutineVideo.findAndCountAll({
				where:whereCondition,
				limit: limit,
				offset: offset,
				include: [
				{
					model: db.videoSlice
				},
				{
					model: db.routine
				},
				{
					model: db.user
				},
				{
					model : db.routine,
					include: [
						{
							model : db.routineFolder,
						}
					]
				}
			   ],
			   group: ['routineVideo.id'],
				order: [['id', 'DESC']]
			}
			);
			routineVideoList['rows'] = routineVideoList['rows'];
			routineVideoList['currentPage'] = req.query.page;
			routineVideoList['totalPages'] = Math.ceil(routineVideoList['count'] / limit);
			res.send({ success: true, message: "", data: routineVideoList });
		} else {
			res.send({ success: false, message: "Invalid token", data: [] });
		}

	} catch (e) {
		res.send({ success: false, message: e.message, data: [] });
	}
}

exports.teacherDetail = async function (req, res, next) {

	try {
		let token = await User.getToken(req);
		let isValidToekn = await validateToekn(token);
		if (isValidToekn) {
			var result;
			var All = [];
			if (req.query.type == 'profile') {
				result = await TeacherPrfile.findOne({
					where: { user_id: req.query.teacher_id }
				}
				);
				let emojis = await UserEmoji.findAll({ where: { user_id: req.query.teacher_id } });
				result['emojis'] = emojis;
			}

			let limit = 10
			let offset = 0 + (req.query.page - 1) * limit
			if (req.query.type == 'video') {
				result = await TeacherVideos.findAndCountAll({
					where: {
						[Op.and]: [{ user_id: req.query.teacher_id }]
					},
					limit: limit,
					offset: offset,
					// include: [{
					// 	model: db.videoSlice
					// }],
					order: [['id', 'DESC']]
				}
				);
				result['rows'] = result['rows'];
				result['currentPage'] = req.query.page;
				result['totalPages'] = Math.ceil(result['count'] / limit);
			}
			if (req.query.type == 'routine') {
				result = await Routine.findAndCountAll({
					where: {
						[Op.and]: [{ user_id: req.query.teacher_id }]
					},
					limit: limit,
					offset: offset,
					include: [{
						model: db.routineFolder
					}],
					order: [['id', 'DESC']]
				}
				);
				for (const row of result['rows']) {
					var obj = Object.assign({}, row.get());
					var isSaved = await UserSavedRoutine.findOne({ where: { routine_id: obj.id, user_id: req.query.teacher_id } });
					obj.is_saved = (isSaved) ? true : false;
					obj.total_duration = await getTotalRoutineDuration(obj.id);
					All.push(obj);

				}
				result['rows'] = All;
				result['currentPage'] = req.query.page;
				result['totalPages'] = Math.ceil(result['count'] / limit);
			}
			res.send({ success: true, message: "", data: result });
		} else {
			res.send({ success: false, message: "Invalid token", data: [] });
		}

	} catch (e) {
		res.send({ success: false, message: e.message, data: [] });
	}
}

exports.saveUnsaveRoutine = async function (req, res, next) {

	try {
		let token = await User.getToken(req);
		let isValidToekn = await validateToekn(token);
		if (isValidToekn) {
			let user_id = await getLoginUserId(token);

			if (req.body.type == 'save') {
				let data = {
					user_id: user_id,
					routine_id: req.body.routine_id
				}
				console.log('innnn');
				await UserSavedRoutine.create(data);
			} else {
				await UserSavedRoutine.destroy({ where: { id: req.body.routine_id, user_id: user_id } });
			}
			var message;
			if (req.body.type == 'save') {
				message = 'Routine saved successfully.'
			} else {
				message = 'Routine unsaved successfully.'
			}
			res.send({ success: true, message: message, data: [] });
		} else {
			res.send({ success: false, message: message, data: [] });
		}

	} catch (e) {
		res.send({ success: false, message: e.message, data: [] });
	}
}








let getRandomString = (num) => {
	var text = "";
	var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < num; i++) {
		text += char_list.charAt(Math.floor(Math.random() * char_list.length));
	}
	return text;
}

let getRoutineCount = async (teacherId) => {
	return await Routine.count({ where: { user_id: teacherId } });
}


let getVideoCount = async (teacherId) => {
	return await RoutineVideo.count({ where: { user_id: teacherId } });
}

let getNormalVideoCount = async (teacherId) => {
    return await TeacherVideos.count({ where: { user_id: teacherId } });
}

let getTotalRoutineDuration = async (routineId) => {
	let videos = await RoutineVideo.findAll({ where: { routine_id: routineId } });
	if (videos) {
		var times = [0, 0, 0]
		var max = times.length;
		// store time values
		var hoursum = 0;
		var mintsum = 0;
		var secondsum = 0;
		for (var j = 0; j < videos.length; j++) {
			var duration = (videos[j].video_duration || '').split(':');
			hoursum = parseInt(hoursum) + parseInt(duration[0])
			mintsum = parseInt(mintsum) + parseInt(duration[1])
			secondsum = parseInt(secondsum) + parseInt(duration[2])

		}
		console.log(hoursum);
		console.log(mintsum);
		console.log(secondsum);
		var hours = hoursum
		var minutes = mintsum
		var seconds = secondsum

		if (seconds >= 60) {
			var m = (seconds / 60) << 0
			minutes += m
			seconds -= 60 * m
		}

		if (minutes >= 60) {
			var h = (minutes / 60) << 0
			hours += h
			minutes -= 60 * h
		}
		return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
	}
}

let getLoginUserId = async (token) => {
	let userObj = await User.findOne({ where: { login_token: token } });
	if (userObj) {
		return userObj.id;
	}
}


let validateToekn = async (token) => {
	let userObj = await User.findOne({ where: { login_token: token } });
	if (userObj) {
		return true;
	}
	return false;
}

let timeAgo = (date, timezone) => {
	var date = new Date(Date.parse(date + " UTC")).toLocaleString("en-US", { timeZone: timezone });
	return dateFormat(date.toString(), "dddd mmmm dS , yyyy h:MM:ss TT");
}

let bytesToSize = (bytes) => {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];

}

