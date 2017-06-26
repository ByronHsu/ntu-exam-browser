const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ntu-exam');
}
var Schema = mongoose.Schema;
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var departmentSchema = new Schema({name:'string',img:'string',courseId:['ObjectId']});
var department = mongoose.model('department',departmentSchema);
var courseSchema = new Schema({name:'string',departmentId:'ObjectId',examId:['ObjectId']});
var course = mongoose.model('course',courseSchema);

addDepartment = (name,img)=>{
    let tem = new department({name:name,img:img});
    tem.save((err)=>{
        if(err) return handleError(err);
    });
}
addCourse = (name,departmentId)=>{
    let tem = new course({name:name,departmentId:departmentId});
    tem.save((err)=>{
        if(err) return handleError(err);
    });
    console.log(departmentId);
    department.findByIdAndUpdate({
        departmentId
    }, {
        $push: { courseId : '5950c67f0dddbdea92973076' }
    },{new: true});
}
//addDepartment('NTUEE','1.jpg');
//addDepartment('NTUMED','2.jpg');
addCourse('電子學','5950e13485d7b5f279d55053');
addCourse('電路學','5950e13485d7b5f279d55053');

router.get('/get-data/department', function(req, res, next) {
  department.find()
      .then((doc) => {
        res.json(doc);
      });
});
router.get('/get-data/:id/course', function(req, res, next) {
  const ID = req.params.id
  course.find()
      .where('departmentId').equals(ID)
      .then((doc) => {
        res.json(doc);
      });
});




module.exports = router;
