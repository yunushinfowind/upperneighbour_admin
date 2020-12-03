const config = require("../config/config.js");
module.exports = (sequelize, Sequelize) => {
    const TeacherVideo = sequelize.define("teacherVideo", {
      user_id: {
        type: Sequelize.INTEGER
      },
      video_link: {
        type: Sequelize.STRING,
        get() {
          return (this.getDataValue('video_link')) ? config.HOST + 'uploads/artists/videos/' + this.getDataValue('video_link') : config.HOST + '/app/controllers/images/user_default.png';
      }
      },
      video_title: {
        type: Sequelize.STRING
      },
      video_description: {
        type: Sequelize.TEXT
      },
      video_thumb: {
        type: Sequelize.STRING,
        get() {
          return (this.getDataValue('video_thumb')) ? config.HOST + 'uploads/artists/thumbs/' + this.getDataValue('video_thumb') : config.HOST + '/app/controllers/images/user_default.png';
      }
      },
      duration: {
        type: Sequelize.STRING
      }
    },
      {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
    TeacherVideo.associate = models => {
      TeacherVideo.belongsTo(models.user, {
          foreignKey: 'user_id'
      });
    }
    return TeacherVideo;
  };
  