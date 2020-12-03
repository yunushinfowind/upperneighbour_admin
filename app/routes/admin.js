
module.exports = app => {
  const admin = require("../controllers/Admin.js");
  const validationMiddleware = require('../middleware/validation-middleware');
  var router = require("express").Router();
  router.post("/change-password",  admin.changePassword);
  router.post("/update-status",  admin.updateStatus);
  router.post("/forgot-password",  admin.forgotPassword);
  router.post("/add-blog", admin.addBlog);
  router.post("/edit-blog", admin.editBlog);
  router.get("/blog/:id", admin.blogDetail);
  router.delete("/delete-blog/:id", admin.blogDelete);
  router.get("/routine-list", admin.routineList);
  router.get("/artist-list", admin.artistList);
  router.get("/user-list", admin.userList);
  router.post("/add-routine", admin.addRoutine);
  router.post("/edit-routine", admin.editRoutine);
  router.get("/routine/:id", admin.routineDetail);
  router.delete("/delete-routine/:id", admin.routineDelete);
  /*artist routing*/
  router.post("/add-teacher", admin.addTeacher);
  router.delete("/delete-teacher/:id", admin.teacherDelete);
  router.get("/teacher/:id", admin.teacherInfo);
  router.post("/edit-teacher", admin.editTeacher);
  /*routine video routing*/
  router.post("/add-routine-video", admin.addRoutineVideo);
  router.post("/edit-routine-video" , admin.editRoutineVideo);
  router.get("/routine-video/:id" , admin.routineVideoDetail);
  router.delete("/delete-routine-video/:id" , admin.routineVideoDelete);
  /*artist video routing*/
  router.post("/add-artist-video", admin.addArtistVideo);
  router.get("/artist-video-list", admin.artistVideoList);
  router.post("/edit-artist-video" , admin.editArtistVideo);
  router.get("/artist-video/:id" , admin.artistVideoDetail);
  router.delete("/delete-artist-video/:id" , admin.videoArtistDelete);
   /*artist video routing*/
  router.delete("/delete-slice-folder/:folder_id", admin.deleteSliceFolder);
  router.delete("/delete-slice/:slug", admin.deleteSlice);
  router.get("/get-slice-notation/:slug", admin.getSliceNotation);
  router.post("/create-slice-recording", admin.createVideoSliceRecordong);
  router.post("/create-notation", admin.addSliceNotation);

  app.use('/api/admin', router);
};
