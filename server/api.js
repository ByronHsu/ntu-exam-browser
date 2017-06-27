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

var categorySchema = new Schema({name: 'string', imgUrl: 'string'});
var category = mongoose.model('category', categorySchema);
var courseSchema = new Schema({name: 'string', categoryId: 'string'});
var course = mongoose.model('course', courseSchema);
var examSchema = new Schema({name: 'string', courseId: 'string', ownerId: 'string'});
var exam = mongoose.model('exam', examSchema);
var pageSchema = new Schema({examId: 'string', pageNumber: 'int', content: 'string', img: [{imgUrl: 'string'}]});
var page = mongoose.model('page', pageSchema);
var answerSchema = new Schema({pageId: 'string', content: 'string', ownerId: 'string', likeCnt: 'int'});
var answer = mongoose.model('answer', answerSchema);
var commentSchema = new Schema({answerId: 'string', content: 'string', ownerId: 'string'});
var comment = mongoose.model('comment', commentSchema);

addCategory = (name, imgUrl) => {
    let temp = new category({name: name, imgUrl: imgUrl});
    temp.save((err) => {
        if(err) return handleError(err);
    });
}

addCourse = (name, categoryId) => {
    let temp = new course({name: name, categoryId: categoryId});
    temp.save((err) => {
        if(err) return handleError(err);
    });
    // console.log(categoryId);
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

addCategory('NTUEE','1.jpg');
addCategory('NTUMED','2.jpg');
addCourse('電子學','5950e13485d7b5f279d55053');
addCourse('電路學','5950e13485d7b5f279d55053');

router.get('/get-data/category', function(req, res, next) {
  category.find()
      .then((doc) => {
        res.json(doc);
      });
});

router.get('/get-data/:id/course', function(req, res, next) {
  const ID = req.params.id
  course.find()
      .where('categoryId').equals(ID)
      .then((doc) => {
        res.json(doc);
      });
});



module.exports = router;
