const mongoose = require("mongoose");

var console = require('tracer').colorConsole();

const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Class = require("../models/Class");
const Task = require("../models/Task")

exports.search_class_list = (req, res, next) => {
  console.log(req.body);
  const { id } = req.body;
  Teacher.find({ id: id })
    .exec()
    .then(doc => {
      console.log(doc)
      const name = doc[0].name;
      console.log(name);
      Class.find()
        .exec()
        .then(docs => {
          console.log(docs)
          var result = docs.map((item) => {
            if (item.teachers.indexOf(name) !== -1) {
              return item.name
            }
          })
          var true_resut = result.filter(item => {
            return !!item;
          })
          console.log(true_resut);
          res.json({
            classList: true_resut
          })
        })
    })
}

exports.publish_task = (req, res, next) => {
  console.log(req.body);
  const { publisherId, classes, title, content, publishTime, endTime } = req.body;
  Teacher.find({ id: publisherId })
    .exec()
    .then(doc => {
      var teacherName = doc[0].name;
      var Task_doc = new Task({
        _id: new mongoose.Types.ObjectId(),
        publisher: teacherName,
        classes: classes,
        title: title,
        content: content,
        publishTime: publishTime,
        endTime: endTime
      })
      Task_doc.save(function (err, doc) {
        console.log(doc)
        res.json({
          message:'发布成功'
        })
      })
    })
}

exports.published_task = (req, res, next) => {
  console.log(req.body);
  const { id } = req.body;
  Teacher.find({ id: id })
    .exec()
    .then(doc => {
      // console.log(doc)
      const name = doc[0].name;
      // console.log(name);
      Task.find({ publisher: name }, { title: 1, publishTime: 1, classes: 1 }, (err, docs) => {
        let docs_str = JSON.stringify(docs);
        var docs_str_key = docs_str.replace(/_id/g, 'key');
        var docs_key = JSON.parse(docs_str_key);
        console.log(docs_key)
        res.json({
          publishedTasks: docs_key
        })
      })
    })
}

exports.deleted_task = (req, res, next) => {
  console.log(req.body);
  const { id } = req.body;
  Task.remove({ _id: id })
  .exec()
  .then(()=>{
    res.json({
      message:'删除成功'
    })
  })
}