const mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
    sid:Number,
    name:String,
    sex:String,
    age:Number
});

//静态方法,增加学习
studentSchema.statics.addStudent = function(json,callback){
    //检查合法性，id是否被占用
    Student.checkSid(json.sid,function(torf){
        if(torf){
            //没有被占用保存
            var s = new Student(json);
            s.save(function(err){
                if(err){
                    callback(-2);
                    return;
                }
            });
            callback(1);
        }else{
            //学号被占用
            callback(-1);
        }
    })
}

//验证学号是否存在
//静态方法
studentSchema.statics.checkSid = function(sid,callback){
    this.find({"sid":sid},function(err,results){
        console.log("checkSid run ot not");
        callback(results.length == 0);
    });
}

//类
var Student = mongoose.model("Student",studentSchema);

//暴露
module.exports = Student;

