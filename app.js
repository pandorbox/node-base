const express = require("express");
const pool = require("./pool");
const cors = require("cors");

var app = express();
var server = app.listen(3000);
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

const demo = require("./user/myly.js");
app.use("/demo", demo);

// 后台管理系统
// 获取用户
app.get("/getuser", (req, res) => {
  var sql = "select * from user ";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// 删除用户
app.post("/deluser", (req, res) => {
  var $id = req.body.id;
  var sql = "DELETE FROM user WHERE id=? ";
  var sql2 = "DELETE FROM usermsg WHERE id=? ";
  pool.query(sql, [$id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      pool.query(sql2, [$id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send("1");
        } else {
          res.send("0");
        }
      });
    } else {
      res.send("0");
    }
  });
});

// 获取用户详情
app.get("/getusermsg", (req, res) => {
  var sql = "select * from usermsg ";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//修改个人信息
app.post("/updusermsg", (req, res) => {
  //获取用户名称
  var $username = req.body.username;
  var $usernc = req.body.usernc;
  var $userjj = req.body.userjj;
  var $userjf = req.body.userjf;
  var sql = "update usermsg set usernc=?,userjj=?,userfs=? WHERE username=?";
  pool.query(sql, [$usernc, $userjj, $userjf, $username], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send("1");
    } else {
      res.send("0");
    }
  });
});

// 获取公告详情
app.get("/notic", (req, res) => {
  var sql = "select * from notic";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// 删除公告
app.post("/delnotic", (req, res) => {
  var $id = req.body.id;
  var sql = "DELETE FROM notic WHERE id=? ";
  pool.query(sql, [$id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send("1");
    } else {
      res.send("0");
    }
  });
});
// 添加公告
app.post("/addnotic", (req, res) => {
  var $notictit = req.body.notictit;
  var $noticmsg = req.body.noticmsg;
  var sql = "INSERT INTO notic(notictit,noticmsg) VALUES(?,?)";
  pool.query(sql, [$notictit, $noticmsg], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send("1");
    } else {
      res.send("0");
    }
  });
});
//修改公告
app.post("/updnotic", (req, res) => {
  //获取用户名称
  var $id = req.body.id;
  var $notictit = req.body.notictit;
  var $noticmsg = req.body.noticmsg;
  if ($notictit == "" && !$noticmsg == "") {
    var sql = "update notic set noticmsg=? WHERE id=?";
    pool.query(sql, [$noticmsg, $id], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.send("1");
      } else {
        res.send("0");
      }
    });
  } else if ($noticmsg == "" && !$notictit == "") {
    var sql = "update notic set notictit=? WHERE id=?";
    pool.query(sql, [$notictit, $id], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.send("1");
      } else {
        res.send("0");
      }
    });
  } else {
    var sql = "update notic set notictit=?,noticmsg=? WHERE id=?";
    pool.query(sql, [$notictit, $noticmsg, $id], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.send("1");
      } else {
        res.send("0");
      }
    });
  }
});

// 获取课程详情
app.get("/getkechen", (req, res) => {
  var sql = "select * from kclist where isshow='true'";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//添加推荐课程
app.post("/addtjkechen", (req, res) => {
  var $id = req.body.id;
  var sql = "update kclist set other='推荐' WHERE id=? and isshow='true'";
  pool.query(sql, [$id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send("1");
    } else {
      res.send("0");
    }
  });
});
//删除推荐课程
app.post("/deltjkechen", (req, res) => {
  var $id = req.body.id;
  var sql = "select * from kclist where id=? and isshow='true'";
  pool.query(sql, [$id], (err, result) => {
    if (err) throw err;
    var sql2 = "update kclist set other='非推荐' WHERE id=?";
    pool.query(sql2, [$id], (err, results) => {
      if (err) throw err;
      if (results.affectedRows > 0) {
        res.send("1");
      } else {
        res.send("0");
      }
    });
  });
});
// 获取推荐课程详情
app.get("/gettjkechen", (req, res) => {
  var sql = "select * from kclist where other='推荐'";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// 获取非推荐课程详情
app.get("/getntjkechen", (req, res) => {
  var sql = "select * from kclist where other<>'推荐' and isshow='true'";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// 删除课程
app.post("/delkechen", (req, res) => {
  var $id = req.body.id;
  var sql = "DELETE FROM kclist WHERE id=? ";
  pool.query(sql, [$id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send("1");
    } else {
      res.send("0");
    }
  });
});

// 获取待审核课程
app.get("/shenhe", (req, res) => {
  var sql = "select * from kclist where isshow='false'";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
//通过审核
app.post("/shenhepass", (req, res) => {
  var $id = req.body.id;
  var sql = "update kclist set isshow='true' WHERE id=?";
  pool.query(sql, [$id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send("1");
    } else {
      res.send("0");
    }
  });
});
// =====================================================================================
// 获取首页课程列表
app.get("/kclistone", (req, res) => {
  var sql = "select * from kclist where other='推荐'";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ result: result, tit: "精品推荐", img: "http://127.0.0.1:3000/img/bg/tuijian.jpg" });
  });
});
app.get("/kclisttwo", (req, res) => {
  var sql = "select * from kclist where kcclass='文史类' and isshow='true'";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ result: result, tit: "历史文学类", img: "http://127.0.0.1:3000/img/bg/lishi.jpg" });
  });
});
app.get("/kclistthr", (req, res) => {
  var sql = "select * from kclist where kcclass='计算机类' and isshow='true'";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ result: result, tit: "计算机科学类", img: "http://127.0.0.1:3000/img/bg/jisuanji.jpg" });
  });
});
app.get("/kclistfou", (req, res) => {
  var sql = "select * from kclist where kcclass='经济类' and isshow='true'";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ result: result, tit: "经济/贸易类", img: "http://127.0.0.1:3000/img/bg/jinji.jpg" });
  });
});
// 获取全部课程名
app.get("/allkclist", (req, res) => {
  var sql = "select distinct other from kclist";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// 默认课程列表
app.get("/defkclist", (req, res) => {
  var sql = "select * from kclist where kcclass='计算机类' and isshow='true'";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// 获取课程列表
app.post("/thiskclist", (req, res) => {
  var $kcclass = req.body.kcclass;
  var sql = "select * from kclist where kcclass=? and isshow='true'";
  pool.query(sql, [$kcclass], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// 获取课程详情
app.post("/thiskclistdetail", (req, res) => {
  // var $kcname=req.body.kcname;
  var $id = req.body.id;
  var sql = "select * from kclist where id=?";
  pool.query(sql, [$id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/search", (req, res) => {
  var $msg = req.query.msg;
  var $msg = "%" + $msg + "%";
  var sql = "SELECT * FROM dq_shopclassimg WHERE title LIKE ? OR size LIKE ?";
  pool.query(sql, [$msg, $msg], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send(result);
      return;
    } else {
      res.send("1");
      return;
    }
  });
});
