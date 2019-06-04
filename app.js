var express = require("express");
var app = express();
var mainctrl  = require("./controllers/mainctrl.js");
//连接数据库，nodejs进程实时连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/smv2', {useNewUrlParser: true});

app.set("view engine","ejs");

//路由清单，Restful风格
app.get("/"                     ,mainctrl.showIndex);//呈递首页
app.get("/add"                  ,mainctrl.showAdd); //呈递表单
app.propfind("/student/:sid"    ,mainctrl.check); //Ajax接口检查用户名是否被占用
app.post("/student"             ,mainctrl.doAddStudent); //Ajax接口保存表单
app.delete("/student/:sid"      ,mainctrl.deleteStudent);
app.get("/student/:sid",         mainctrl.showUpdate);
app.post("/student/:sid"        ,mainctrl.updateStudent); 
app.get("/student"              ,mainctrl.getAllStudents);


app.use(express.static("public"));
app.listen(3000);

