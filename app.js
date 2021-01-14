const express = require("express");
const pool = require("./pool");
const cors = require("cors");
const JwtUtil = require("./public/utils/jwt");

var app = express();
var server = app.listen(3001);
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(
  cors({
    origin: "http://localhost:8080" || "http://127.0.0.1:8080" || "http://172.20.10.2:8080",
    credentials: true
  })
);
app.use(express.static(__dirname + "/public"));

//验证token
app.use(function(req, res, next) {
  // 需要进行token校验的路由
  if (req.url == "/user/getMyNoteList" || req.url == "/user/addnote" || req.url == "/user/getUserInfo") {
    let token = req.headers.authorization;
    let jwt = new JwtUtil(token);
    let result = jwt.verifyToken();
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result == "err") {
      res.send({ code: 401, msg: "身份验证失败,请重新登录" });
    } else {
      next();
    }
  } else {
    next();
  }
});

const upload = require("./until/upload.js");
const token = require("./until/token.js");

app.use("/upload", upload);
app.use("/token", token);

// get请求
app.get("/router", (req, res) => {
  // sql 语句
  var sql = "select * from user ";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// post请求
app.post("/router", (req, res) => {
  // 获取参数
  var $params = req.body.params;
  if (!$params) {
    res.send({ code: 401, msg: "params不能为空" });
    return;
  }
  // sql 语句
  var sql = "select * from admins where " + "adminname=?";
  pool.query(sql, [$params], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ code: 200, msg: "", data: result });
    } else {
      res.send({ code: 404, msg: "未知错误" });
    }
  });
});
