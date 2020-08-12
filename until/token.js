const pool = require("../pool.js");
const express = require("express");
var router = express.Router();

// 引入jwt token工具
const JwtUtil = require("../public/utils/jwt");
/** ---------------------
 *
 * user_account
 *
 * ----------------------*/
//注册
router.post("/registe", (req, res) => {
  //获取用户名称
  var $uname = req.body.username;
  var $upwd = req.body.userpwd;
  if (!$uname) {
    res.send({ code: 400, msg: "用户名不能为空" });
    return;
  }
  if (!$upwd) {
    res.send({ code: 400, msg: "密码不能为空" });
    return;
  }
  var sql = "select * from user where " + "userName=?";
  pool.query(sql, [$uname], (err, result) => {
    if (err) throw err;
    if (result.length < 1) {
      var sql =
        "INSERT INTO user(userName,userPwd ,userPhoto ,userNickName,userDescribe ,userIntegral,userFans) VALUES (?,?,'http://127.0.0.1:3000/img/userimg/def.png',?,'去添加个人简介','10','0') ";
      pool.query(sql, [$uname, $upwd, $uname], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send({ code: 200, msg: "注册成功！" });
        } else {
          res.send({ code: 400, msg: "注册失败！" });
        }
      });
    } else {
      res.send({ code: 400, msg: "用户名已存在！" });
    }
  });
});

//用户登录
router.post("/login", (req, res) => {
  var $uname = req.body.username;
  var $upwd = req.body.userpwd;
  if (!$uname) {
    res.send({ code: 400, msg: "用户名不能为空" });
    return;
  }
  if (!$upwd) {
    res.send({ code: 400, msg: "请输入密码" });
    return;
  }
  var sql = "select * from user where " + "userName=? and userPwd=?";
  pool.query(sql, [$uname, $upwd], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      // 登陆成功，添加token验证
      let _id = result[0].userId + "";
      // 将用户id传入并生成token
      let jwt = new JwtUtil({ user_id: _id });
      let token = jwt.generateToken();
      result[0]["token"] = token;
      // 将 token 返回给客户端
      res.send({ code: 200, data: result[0] });
    } else {
      res.send({ code: 400, msg: "用户名或密码错误" });
    }
    return;
  });
});

//获取个人信息
router.get("/getUserInfo", (req, res) => {
  //获取用户名称
  let token = req.headers.authorization;
  let jwt = new JwtUtil(token);
  var $userId = jwt.verifyToken().user_id;
  var sql = "select * from user where " + "userId=?";
  pool.query(sql, [$userId], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ code: 200, data: result[0] });
    } else {
      res.send({ code: 400, msg: "获取资料失败" });
    }
  });
});

//导出
module.exports = router;
