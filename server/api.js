const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
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
var examSchema = new Schema({name: 'string', courseId: 'string', numOfPages:'number',ownerId: 'string',time:'string'});
var exam = mongoose.model('exam', examSchema);
var pageSchema = new Schema({examId: 'string', pageNumber: 'number', content: 'string', imgUrl: 'string',ownerId: 'string',time:'string'});
var page = mongoose.model('page', pageSchema);
var answerSchema = new Schema({pageId: 'string', content: 'string', ownerId: 'string', time:'string',likeCnt: 'number'});
var answer = mongoose.model('answer', answerSchema);
var commentSchema = new Schema({answerId: 'string', content: 'string', ownerId: 'string' , time:'string'});
var comment = mongoose.model('comment', commentSchema);
var userSchema = new Schema({studentId: 'string', fbId: 'string'});
var user = mongoose.model('user', userSchema);

getNowTime = () =>{
  const time = new Date();
  let t = [];
  t[0] = time.getFullYear();
  t[1] = time.getMonth() + 1;
  t[2] = time.getDate();
  t[3] = time.getHours();
  t[4] = time.getMinutes();
  t[5] = time.getSeconds();
  for (let i = 3; i <= 5; i++) {
    if (t[i] >= 0 && t[i] <= 9) {
      t[i] = '0' + t[i];
    }
  }
  return `${t[0]}/${t[1]}/${t[2]} ${t[3]}:${t[4]}:${t[5]}`;
}

router.post('/insert/comment',(req,res,next)=>{
  let temp = new comment(req.body);
  temp.time=getNowTime();
  //console.log(temp);
  temp.save((err) => {
    if(err) return handleError(err);
  });
  res.send(temp);
})

router.post('/insert/Answer',(req,res,next)=>{
  let temp = new answer(req.body);
  temp.time=getNowTime();
  //console.log(temp);
  temp.save((err) => {
    if(err) return handleError(err);
  });
  res.send(temp);
})

router.post('/insert/exam/:name', (req, res, next)=> {
  const examData = req.body;
  const name = req.params.name;

  course.find({name:name})
    .exec((err, data) => {
      const courseId=data[0]._id;
      course.find({courseId: courseId})
        .exec((err, data) => {
          //console.log(data);
          const examTemp = new exam({name: examData.examName, courseId: courseId, numOfPages:examData.text.length,ownerId:examData.ownerId,time:getNowTime()});
          //console.log(examTemp);
          examTemp.save((err) => {
            if(err) return handleError(err);
          });
          //console.log(examData)
          for(let i=1;i<=examData.text.length;i++){
            const pageTemp = new page({examId: examTemp._id, pageNumber: i, content: examData.text[i-1], imgUrl: examData.imgUrl[i-1],ownerId:examData.ownerId,time:getNowTime()});
            pageTemp.save((err) => {
              if(err) return handleError(err);
            });
          }
          return examTemp;
        });
    }).then((e)=>{/*console.log(e[0]._id);res.redirect(`/exampage/${e[0]._id}`);*/});
    
});

router.get('/get-data/answer/:id', (req, res, next)=> {
  const ID = req.params.id;
  comment.find({answerId: ID})
    .exec((err, data) => {
      //console.log(data);
      res.json(data);
    });
})

router.get('/get-data/singlepageAnswers/:id', (req, res, next)=> {
  const ID = req.params.id;
  answer.find({pageId: ID})
    .exec((err, data) => {
      //console.log(data);
      res.json(data);
    });
})

router.get('/get-data/singlepage', (req, res, next)=> {
  //console.log(req.query);
  page.find({pageNumber: req.query.pageNumber,examId:req.query.examId})
    .exec((err, data) => {
      //console.log(data);
      res.json(data);
    });
})

router.get('/get-data/category', (req, res, next) => {
  department.find({})
    .exec((err, data) => {
      res.json(data);
      console.log(data);
    });
});

router.get('/get-data/exam/:id', (req, res, next) => {
  const ID = req.params.id;
  exam.find({_id: ID})
    .exec((err, data) => {
      res.json(data);
    });
});

router.get('/get-data/department/name/:name', (req, res, next) => {
  const name = req.params.name;
  let departId;
  department.find({name: name})
    .exec((err, data) => {
      departId=data[0]._id;
      course.find({departmentId: departId})
        .exec((err, data) => {
          //console.log(data);
          res.json(data);
        }); 
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



addDepartment = (name, imgUrl) => {
  let temp = new department({name: name, imgUrl: imgUrl});
  temp.save((err) => {
    if(err) return handleError(err);
  });
}
/*
let names=['電機系','化學系','財金系','法律系','歷史系','醫學系'];
let imgUrls=['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg'];
for(let i=0;i<6;i++){
    addDepartment(names[i],imgUrls[i]);
}*/
addCourse = (name, departmentId) => {
  let temp = new course({name: name, departmentId: departmentId});
  temp.save((err) => {
    if(err) return handleError(err);
  });
  // console.log(departmentId);
}
/*
let names=[['電磁學','電子學'],['普通化學','進階化學'],['如何成為Elite','炒股教學'],['如何吉人','民法'],['秦朝','漢朝'],['普通醫學','外科']];
let departmentIds=['59520d8ab87f2c1e2d5c0f9e','59520d8ab87f2c1e2d5c0f9f',"59520d8ab87f2c1e2d5c0fa0","59520d8ab87f2c1e2d5c0fa1","59520d8ab87f2c1e2d5c0fa2","59520d8ab87f2c1e2d5c0fa3"];
for(let i=0;i<6;i++){
    for(let j=0;j<names[i].length;j++)
    addCourse(names[i][j],departmentIds[i]);
}*/

addExam = (name, courseId, ownerId) => {
  let temp = new exam({name: name, courseId: courseId, ownerId: ownerId});
  temp.save((err) => {
    if(err) return handleError(err);
  });
}
/*
let names=[['電磁上','電磁下'],['普化上','普化下'],['進化上','進化下'],['電子上','電子下']];
let courseIds=["59520fa38aa9241ee4523f36","59520fa38aa9241ee4523f38","59520fa38aa9241ee4523f39","59520fa38aa9241ee4523f37"];
for(let i=0;i<names.length;i++){
    for(let j=0;j<names[i].length;j++)
      addExam(names[i][j],courseIds[i]);
}*/

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



router.get('/user', (req, res) => {
    if(req.user === undefined) {
      res.json('NO');
    } else if(typeof(req.user) === 'string') {
      // res.redirect(`/api/add-user/${req.user}`);
      user.findOne({studentId: req.user})
        .exec((err, data) => {
          if(data === null) {
            let temp = new user({studentId: req.user, fbId: req.session.passport.user.id});
            temp.save((err) => {
              if(err) return handleError(err);
            });
          }
          res.json(req.user);
        });

      
    } else {
      user.findOne({fbId: req.user.id})
        .exec((err, data) => {
          if(data === null) {
            res.json('MAIL');
          } else {
            res.json(data.studentId);
          }
        });
    }
    // console.log(req);
  }
);

// router.get('/add-user/:id', passport.authenticate('facebook'), (req, res) => {
//   console.log(req);
//   let temp = new user({studentId: req.params.id, fbId: req.user.id});
//   res.redirect('/');
// });

module.exports = router;
