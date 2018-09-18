const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
var console = require('tracer').colorConsole();

const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('./schema/').mongoose;
var schema = require('./schema/')

var User = mongoose.model('User', schema.User);
var Admin = mongoose.model('Admin', schema.Admin);
var Teacher = mongoose.model('Teacher', schema.Teacher);
var Student = mongoose.model('Student', schema.Student);
var Class = mongoose.model('Class', schema.Class);
var Homework_teacher = mongoose.model('Homework_teacher', schema.Homework_teacher);
var Homework_student = mongoose.model('Homework_student', schema.Homework_student)


app.post('/login', (req, res) => {
  var userName = req.body.userName;
  var user = mongoose.model('User', schema.user);
  user.find({ userName: userName }, function (err, doc) {
    if (doc[0]) {
      console.log('userName success');
      var password = req.body.password;
      user.find({ password: password }, { role: 1 }, function (err, doc) {
        if (doc[0]) {
          const role = doc[0].role;
          console.log(role);
          console.log('password success');
          res.send({
            status: 'success',
            message: '登陆成功',
            role: role
          })
        } else {
          console.log('password failed');
          res.send({
            status: 'failed',
            message: '密码错误',
            role: ''
          })
        }
      })
    } else {
      console.log('not exists');
      res.send({
        status: 'failed',
        message: '账号不存在',
        role: ''
      })
    }
  })
})

app.post('/admin/add', (req, res) => {
  console.log(req.body);
  var userName = req.body.userName;
  var password = req.body.password;
  var repass = req.body.repass;
  var role = req.body.role;
  if (!userName || !password || !repass || !role) {
    res.send({
      status: 'failed',
      message: '请填写完整信息'
    })
  } else {
    if (password !== repass) {
      res.send({
        status: 'failed',
        message: '密码输入不一致',
      })
    } else {
      var user = mongoose.model('User', schema.user);
      user.find({ userName: userName }, function (err, doc) {
        if (doc[0]) {
          res.send({
            status: 'failed',
            message: '该账户名已经存在',
          })
        } else {
          var user_doc = new User({
            _id: new mongoose.Types.ObjectId(),
            userName: userName,
            password: password,
            role: role
          })
          if (role === 'teacher') {
            user_doc.save(function (err, doc) {
              console.log(doc);
              var teacher_doc = new Teacher({
                id: user_doc._id
              })
              teacher_doc.save(function (err, doc) {
                console.log(doc);
              })
            })
          } else if (role === 'student') {
            user_doc.save(function (err, doc) {
              console.log(doc);
              var student_doc = new Student({
                id: user_doc._id
              })
              student_doc.save(function (err, doc) {
                console.log(doc);
              })
            })
          }
          res.send({
            status: 'success',
            message: '添加成功',
          })
        }
      })
    }
  }
})

server.listen(port, () => console.log(`Listening on port ${port}`));