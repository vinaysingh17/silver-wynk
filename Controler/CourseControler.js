const { default: mongoose } = require("mongoose");
const Answers = require("../Schema/Answers");
const Course = require("../Schema/Subject");
const VotorList = require("../Schema/VotorList");

const createBulAnswer = async (req, res) => {
  const uploadedList = await Course.insertMany(req.body.data, {
    ordered: true,
  });
  res
    .status(200)
    .send({ success: true, data: uploadedList, message: "Data uploaded" });
};
const createCourse = async (req, res, next) => {
  try {
    console.log(req.body);
    const upload = await Course.create(req.body);
    res
      .status(200)
      .send({ success: true, data: upload, message: "Data uploaded" });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};

const getTeachers = async (req, res, next) => {
  const data = await Course.find(req.query).populate("teacher");
  res.status(200).send({ success: true, message: "ALl USer", data });
};
const getCourseByTeacher = async (req, res, next) => {
  const data = await Course.find({ teacher: req.params.teacher });
  res.status(200).send({ success: true, message: "ALl USer", data });
};

const getStatistic = async (req, res, next) => {
  try {
    // console.log(req.body);
    // return null;
    const { question } = req.params;
    console.log(question, "<< this is question");
    if (!question) {
      return res
        .status(400)
        .send({ success: false, message: "Question (question) is required" });
    }
    const groupByBoothId1 = await Answers.aggregate([
      {
        $match: {
          question: mongoose.Types.ObjectId(question),
        },
      },
      {
        $group: {
          _id: {
            question: "$question",
            answer: "$answer",
          },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send({ success: true, data: groupByBoothId1 });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};
const dailySurvey = async (req, res, next) => {
  try {
    // console.log(req.body);
    // return null;
    const { surveyBy } = req.params;
    console.log(surveyBy, "<< this is question");
    if (!surveyBy) {
      return res
        .status(400)
        .send({ success: false, message: "surveyBy (surveyBy) is required" });
    }
    const groupByBoothId1 = await Answers.aggregate([
      {
        $match: {
          surveyBy: mongoose.Types.ObjectId(surveyBy),
        },
      },
      {
        $group: {
          _id: {
            date: "$date",
          },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send({ success: true, data: groupByBoothId1 });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};

module.exports = {
  createCourse,
  createBulAnswer,
  getStatistic,
  dailySurvey,
  getTeachers,
  getCourseByTeacher,
};