const pool = require("../pool.js");
const express = require("express");
var router = express.Router();

//fs fileSystem 文件系统模块
//操作文件:创建/删除/移动文件
const fs = require("fs");
const multer = require("multer");
//创建multer对象指定上传文件目录
//指定上传文件目录
var upload = multer({ dest: "public/img/" });

// -----------------上传文件--------------------------------------
// 上传音频
router.post("/upaudio", upload.array("kcaudio", 1), (req, res) => {
  //获取参数
  var $kcaudio = "";
  for (var i = 0; i < 1; i++) {
    console.log(req.files);
    //获取上传文件类型 音频
    var type = req.files[i].mimetype;
    var i2 = type.indexOf("mp3");
    if (i2 == -1) {
      res.send({ code: -2, msg: "上传只能是mp3音频" });
      return;
    }
    //创建新文件名
    var src = req.files[i].originalname;
    var i3 = src.lastIndexOf(".");
    var fRand = Math.floor(Math.random() * 9999);
    var suff = src.substring(i3, src.length);
    var des = "./public/audio/" + fRand + suff;
    //将临时文件移动upload目录下
    fs.renameSync(req.files[i].path, des);
    //得到上传文件路径
    $kcaudio = "http://127.0.0.1:3000/audio/" + fRand + suff;
    console.log($kcaudio);
  }
  var sql = "INSERT INTO list(kcaudio) VALUES (?) ";
  pool.query(sql, [$kcaudio], (err, result) => {
    if (err) throw err;
  });
});

// 上传图片
router.post("/uppicture", upload.array("kcimg", 1), (req, res) => {
  //获取参数
  var $kcimg = "";
  for (var i = 0; i < 1; i++) {
    console.log(req.files);
    var size = req.files[i].size / 1000 / 1000;
    if (size > 2) {
      res.send({ code: -1, msg: "上传图片过大 超过2MB" });
      return;
    }
    //获取上传文件类型  图片
    //image/gif image/png image/jpg  text/css
    var type = req.files[i].mimetype;
    var i2 = type.indexOf("image");
    if (i2 == -1) {
      res.send({ code: -2, msg: "上传只能是图片" });
      return;
    }
    //创建新文件名
    var src = req.files[i].originalname;
    var i3 = src.lastIndexOf(".");
    var fRand = Math.floor(Math.random() * 9999);
    var suff = src.substring(i3, src.length);
    var des = "./public/img/" + fRand + suff;
    //将临时文件移动upload目录下
    fs.renameSync(req.files[i].path, des);
    //得到上传图片路径
    $kcimg = "http://127.0.0.1:3000/img/" + fRand + suff;
  }

  var sql = "INSERT INTO list(kcimg) VALUES (?)";
  pool.query(sql, [$kcimg], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send("上传成功,待审核");
    } else {
      res.send({ code: 401, msg: "上传失败！" });
    }
  });
});

//导出
module.exports = router;
