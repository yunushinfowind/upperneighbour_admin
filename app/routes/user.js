
module.exports = app => {
    const user = require("../controllers/User.js");
    const validationMiddleware = require('../middleware/validation-middleware');
    var router = require("express").Router();
    router.get("/blog-list" , user.blogList);
    router.get("/user-detail" , user.userDetail);
    router.get("/my-routine-list" , user.savedVideoList);
    router.get("/teacher-list" , user.teacherList);
    router.get("/feed-list" , user.feedList);
    router.get("/routine-video-list" , user.routineVideoList);
    router.get("/teacher-detail" , user.teacherDetail);
    router.post("/save-unsave-routine" , user.saveUnsaveRoutine);
    router.get("/blog/:blog_id" , user.blogDetail);
    app.use('/api/user', router);
  };
  