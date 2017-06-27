const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ntu-exam-browser');
}
var Schema = mongoose.Schema;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var departmentSchema = new Schema({name: 'string', imgUrl: 'string'});
var department = mongoose.model('department', departmentSchema);
var courseSchema = new Schema({name: 'string', departmentId: 'string'});
var course = mongoose.model('course', courseSchema);
var examSchema = new Schema({name: 'string', courseId: 'string', ownerId: 'string'});
var exam = mongoose.model('exam', examSchema);
var pageSchema = new Schema({examId: 'string', pageNumber: 'number', content: 'string', img: [{imgUrl: 'string'}]});
var page = mongoose.model('page', pageSchema);
var answerSchema = new Schema({pageId: 'string', content: 'string', ownerId: 'string', likeCnt: 'number'});
var answer = mongoose.model('answer', answerSchema);
var commentSchema = new Schema({answerId: 'string', content: 'string', ownerId: 'string'});
var comment = mongoose.model('comment', commentSchema);

addDepartment = (name, imgUrl) => {
  let temp = new department({name: name, imgUrl: imgUrl});
  temp.save((err) => {
    if(err) return handleError(err);
  });
}

addCourse = (name, departmentId) => {
  let temp = new course({name: name, departmentId: departmentId});
  temp.save((err) => {
    if(err) return handleError(err);
  });
  // console.log(departmentId);
}

addExam = (name, courseId, ownerId) => {
  let temp = new exam({name: name, courseId: categoryId, ownerId: ownerId});
  temp.save((err) => {
    if(err) return handleError(err);
  });
}

addPage = (examId, pageNumber, content, img) => {
  let temp = new page({examId: examId, pageNumber: pageNumber, content: content, img: img});
  temp.save((err) => {
    if(err) return handleError(err);
  });
}

addAnswer = (pageId, content, ownerId, likeCnt) => {
  let temp = new answer({pageId: pageId, content: content, ownerId: ownerId, likeCnt: likeCnt});
  temp.save((err) => {
    if(err) return handleError(err);
  });
}

addComment = (answerId, content, ownerId) => {
  let temp = new exam({answerId: answerId, content: content, ownerId: ownerId});
  temp.save((err) => {
    if(err) return handleError(err);
  });
}

// addDepartment('NTUEE','1.jpg');
// addDepartment('NTUMED','2.jpg');
// addCourse('電子學','5950e13485d7b5f279d55053');
// addCourse('電路學','5950e13485d7b5f279d55053');

router.get('/get-data/category', (req, res, next) => {
  department.find({})
    .exec((err, data) => {
      res.json(data);
    });
});

router.get('/get-data/department/:id', (req, res, next) => {
  const ID = req.params.id;
  course.find({departmentId: ID})
    .exec((err, data) => {
      res.json(data);
    });
});

router.get('/get-data/course/:id', (req, res, next) => {
  const ID = req.params.id;
  exam.find({courseId: ID})
    .exec((err, data) => {
      res.json(data);
    });
});

router.get('/get-data/exam/:id', (req, res, next) => {
  const ID = req.params.id;
  page.find({examId: ID})
    .exec((err, data) => {
      res.json(data);
    });
});

module.exports = router;
