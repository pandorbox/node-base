#设置客户端连接服务器使用utf8
SET NAMES UTF8;

#删除（丢弃）数据库qjk,如果存在的话 
DROP DATABASE IF EXISTS qjk;

#创建数据库名称叫qjk CHARSET=UTF8,编码中文支持
CREATE DATABASE qjk CHARSET=UTF8;
USE qjk;

#创建数据表admins
DROP TABLE IF EXISTS admins;
CREATE TABLE admins (
id INT(10) PRIMARY KEY AUTO_INCREMENT,
adminname VARCHAR(10),
adminpwd VARCHAR(20)
);

INSERT INTO admins(adminname,adminpwd) VALUES('admin','123');


#创建数据表user
DROP TABLE IF EXISTS user;
CREATE TABLE user (
id INT(10) PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(10),
userpwd VARCHAR(20)
);

#创建数据表usermsg
DROP TABLE IF EXISTS usermsg;
CREATE TABLE usermsg (
id INT(10) PRIMARY KEY AUTO_INCREMENT,
userimg VARCHAR(50),
username VARCHAR(10),
usernc VARCHAR(20),
userjj VARCHAR(30),
userjf VARCHAR(30)
);

#创建数据表userbj
DROP TABLE IF EXISTS userbj;
CREATE TABLE userbj (
id INT(10) PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(10),
bjtit VARCHAR(20),
bjmsg VARCHAR(100),
bjtime VARCHAR(20)
);

#创建数据表usergz
DROP TABLE IF EXISTS usergz;
CREATE TABLE usergz (
id INT(10) PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(10),
kcid INT(3)
);

#创建数据表userdy
DROP TABLE IF EXISTS userdy;
CREATE TABLE userdy (
id INT(10) PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(10),
kcid INT(3)
);

#创建数据表kcpj
DROP TABLE IF EXISTS kcpj;
CREATE TABLE kcpj (
id INT(10) PRIMARY KEY AUTO_INCREMENT,
kcid INT(3),
pjtime VARCHAR(20),
kcpjmsg VARCHAR(100),
userimg VARCHAR(50),
username VARCHAR(10)
);

#创建数据表kclist
DROP TABLE IF EXISTS kclist;
CREATE TABLE kclist (
id INT(10) PRIMARY KEY AUTO_INCREMENT,
kcimg VARCHAR(50),
kcname VARCHAR(10),
kcclass VARCHAR(20),
kcaudio VARCHAR(50),
kcauthor VARCHAR(10),
kcjj VARCHAR(200),
kcjf INT(3),
kcmb VARCHAR(200),
isshow VARCHAR(10),
other VARCHAR(20)
);

#创建数据表notic
DROP TABLE IF EXISTS notic;
CREATE TABLE notic (
id INT(10) PRIMARY KEY AUTO_INCREMENT,
notictit VARCHAR(20),
noticmsg VARCHAR(200)
);