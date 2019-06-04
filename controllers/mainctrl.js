var Student = require("../models/Student.js");
var formidable = require("formidable");

exports.showIndex = function(req,res){
    res.render("index");
}

exports.showAdd = function(req,res){
    res.render("add");
}

exports.doAddStudent = function(req,res){
    console.log("服务器收到一个post请求");
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //数据库持久
        //var s = new Student(fields);
        //s.save();
        Student.addStudent(fields,function(result){
            res.json({"result":result});
        });
    });
}

exports.check = function(req,res){
    //or ar sid = req.params.sid;
    var sid = req.param("sid");
    Student.checkSid(sid,function(torf){
        res.json({"result":torf});
    });
}

//更改学生的Ajax接口
exports.updateStudent = function(req,res){
    var sid = req.param("sid");
    if(!sid){
        return;
    }
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
       //更改学生 
        Student.find({"sid":sid},function(err,results){
            if(results.length == 0){
                res.json({"result":-1});
                return;
            }
            var thestudent = results[0];  
            //更改属性
            thestudent.name = fields.name;
            thestudent.age = fields.age;
            thestudent.sex = fields.sex;

            thestudent.save(function(err){
                if(err){
                    res.json({"result":-1});
                }else{
                    res.json({"result":1});
                }
            })
        });
    });
}

//删除学生
exports.deleteStudent = function(req,res){
    var sid = req.param("sid");

    Student.find({"sid":sid},function(err,results){
        if(err || results.length == 0){
            res.json({"result":-1});
            return;
        }

        //删除学生
        results[0].remove(function(err){
            if(err){
                res.json({"result":-1});
                return;
            }
            res.json({"result":-1});
        });
    });
}

//Ajax接口，得到所有学生
exports.getAllStudents = function(req,res){
    Student.find({},function(err,results){
        res.json({"results":results});
    })
}

//呈递更改学生的表单
exports.showUpdate = function(req,res){
    var sid = req.param("sid");
    
    //直接用类名调用find，不需要在Student类里面加一个findstudent方法
    Student.find({"sid":sid},function(err,results){
        if(results.length == 0){
            res.send("No such student");
            return;
        }
        res.render("update",{
            info: results[0]
        })
    });
}