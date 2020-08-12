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
