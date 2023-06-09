const express = require("express");
const router = express.Router();

const multer = require("multer");
const {
  createAnswer,
  getStatistic,
  dailySurvey,
  createBulAnswer,
} = require("../Controler/AnswerControler");
const {
  createCourse,
  getTeachers,
  getCourseByTeacher,
  recommendCourse,
  reCommendedCourseBySelections,
} = require("../Controler/CourseControler");
const { createQuestion } = require("../Controler/QuestionControler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
});

router.get("/get", getTeachers);
router.get("/get/:teacher", getCourseByTeacher);
router.get("/recommend/:userId", recommendCourse);
router.get("/recommend-by-selection/:course", reCommendedCourseBySelections);
router.post("/create", createCourse);
router.post("/create-bulk", createBulAnswer);
router.get("/group/:question", getStatistic);
router.get("/daily/:surveyBy", dailySurvey);
// router.put(
//   "/update/:id",
//   upload.fields([{ name: "avatar", maxCount: 1 }]),
//   updateUserDetails
// );
// router.delete("/delete/:id", upload.none(), deleteUser);

module.exports = router;
