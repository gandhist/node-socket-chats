/*
SQLyog Ultimate v12.5.1 (64 bit)
MySQL - 10.4.17-MariaDB : Database - pjk3
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`pjk3` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `pjk3`;

/*Table structure for table `groups_chats` */

DROP TABLE IF EXISTS `groups_chats`;

CREATE TABLE `groups_chats` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `send_by` varchar(100) DEFAULT NULL COMMENT 'user_chat_id',
  `message` text DEFAULT NULL,
  `type_message` bigint(2) DEFAULT 0 COMMENT '0 text, 1 file',
  `group_id` varchar(20) DEFAULT NULL COMMENT 'group_id',
  `inserted_at` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4;

/*Data for the table `groups_chats` */

insert  into `groups_chats`(`id`,`send_by`,`message`,`type_message`,`group_id`,`inserted_at`) values 
(35,'43','asd',0,'103_13',20210510101014),
(36,'43','dd',0,'103_13',20210510101020),
(37,'43','asd',0,'103_13',20210510101021),
(38,'44','ddd',0,'103_13',20210510101226),
(39,'44','yap',0,'103_13',20210510101237),
(40,'44','something went wrong?',0,'103_13',20210510101245),
(41,'43','no verythin is ok',0,'103_13',20210510101303),
(42,'43','????‍♂️',0,'103_13',20210510101333),
(43,'44','you back',0,'103_13',20210510101354),
(44,'44','?',0,'103_13',20210510101355),
(45,'43','d',0,'103_13',20210510111033),
(46,'43','a',0,'103_13',20210510111041),
(47,'44','d',0,'103_13',20210510111045),
(48,'44','a',0,'103_13',20210510111051),
(49,'44','d',0,'103_13',20210510111320),
(50,'44','d',0,'103_13',20210510111321),
(51,'44','d',0,'103_13',20210510111321),
(52,'43','d',0,'103_13',20210510113020),
(53,'43','dd',0,'103_13',20210510113022),
(54,'43','s',0,'103_13',20210510113033),
(55,'44','asd',0,'103_13',20210510113036),
(56,'43','a',0,'103_13',0),
(57,'44','ds',0,'103_13',0),
(58,'44','asd',0,'103_13',0),
(59,'43','dd',0,'103_13',0),
(60,'43','n',0,'103_13',0),
(61,'43','sd',0,'103_13',0),
(62,'44','aaa',0,'103_13',0),
(63,'43','dds',0,'103_13',0),
(64,'43','d',0,'103_13',0),
(65,'44','a',0,'103_13',0),
(66,'43','d',0,'103_13',0),
(67,'44','a',0,'103_13',0),
(68,'43','a',0,'103_13',0),
(69,'43','a',0,'103_13',0),
(70,'43','a',0,'103_13',0),
(71,'44','d',0,'103_13',0),
(72,'44','ds',0,'103_13',0),
(73,'43','a',0,'103_13',0),
(74,'45','hello',0,'103_13',0),
(75,'43','https://github.com/rangav/thunder-client-support',0,'103_13',0),
(76,'45','oeky',0,'103_13',0),
(77,'43','te',0,'103_13',0),
(78,'43','tts',0,'103_13',0),
(79,'43','as',0,'103_13',0),
(80,'44','asd',0,'103_13',0),
(81,'43','asd',0,'103_13',0),
(82,'43','2',0,'103_13',0),
(83,'43','https://github.com/jshemas/openGraphScraper',0,'103_13',0),
(84,'43','https://getbootstrap.com/docs/5.0/components/list-group/',0,'103_13',0),
(85,'43','ddd',0,'103_13',0),
(86,'43','ssss',0,'103_13',0),
(87,'43','ssssss',0,'103_13',0),
(88,'43','sssddsasds',0,'103_13',0),
(89,'43','asd',0,'103_13',0),
(90,'43','s',0,'103_13',0),
(91,'43','d',0,'103_13',0),
(92,'43','s',0,'103_13',0);

/*Table structure for table `personal_chats` */

DROP TABLE IF EXISTS `personal_chats`;

CREATE TABLE `personal_chats` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_relasi` varchar(200) DEFAULT NULL COMMENT 'sender_receiver',
  `send_by` bigint(20) DEFAULT NULL COMMENT 'user_chat_id',
  `message` text DEFAULT NULL,
  `type_message` int(2) DEFAULT 0 COMMENT '0 text, 1 file',
  `target_id` bigint(20) DEFAULT NULL COMMENT 'user_chat_id',
  `inserted_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `personal_chats` */

insert  into `personal_chats`(`id`,`id_relasi`,`send_by`,`message`,`type_message`,`target_id`,`inserted_at`) values 
(1,'43_45',43,'asd',0,45,'2021-05-11 20:24:08'),
(2,'43_45',43,'khjkhjkasd',0,45,'2021-05-11 20:24:08');

/*Table structure for table `users_chats` */

DROP TABLE IF EXISTS `users_chats`;

CREATE TABLE `users_chats` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `is_online` int(1) DEFAULT 0 COMMENT '0 offline, 1 online',
  `picture` varchar(200) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `no_hp` varchar(50) DEFAULT NULL,
  `tipe_user` varchar(50) DEFAULT NULL COMMENT 'peserta, karyawan internal',
  `hint` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users_chats` */

insert  into `users_chats`(`id`,`is_online`,`picture`,`name`,`email`,`no_hp`,`tipe_user`,`hint`,`password`,`token`) values 
(43,NULL,'https://avatars.githubusercontent.com/u/22018903?s=400&v=4','Gandhi','bollox@gmail.com','025652','peserta','123456789','$2b$10$5lSTLLZm0bjbGnbVmxY2juCEAmG03RxdWaiTp1sJzFgC.7t2drsx.','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjA4MzIwMTEsImlkIjo0MywibmFtZSI6InN0aWNoIiwidGlwZV91c2VyIjoicGVzZXJ0YSIsImVtYWlsIjoiYm9sbG94QGdtYWlsLmNvbSIsIm5vX2hwIjoiMDI1NjUyIiwiaWF0IjoxNjIwNjE2MDExfQ.-jdZgin_sj2UmzMq3NZ-o-ZyrGCML6XCaWh5LVe0f9Y'),
(44,NULL,'http://emilcarlsson.se/assets/louislitt.png','Samwel Tarly','bollos@gmail.com','025652','peserta','123456789','$2b$10$pj1nDTW4zKEa2vQenHO9reuNjZnojla9s8a1MI4o6ZL95xxXbfJqi','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjA4MzIwODMsImlkIjo0NCwibmFtZSI6IlNhbXdlbCBUYXJseSIsInRpcGVfdXNlciI6InBlc2VydGEiLCJlbWFpbCI6ImJvbGxvc0BnbWFpbC5jb20iLCJub19ocCI6IjAyNTY1MiIsImlhdCI6MTYyMDYxNjA4M30.fS2wJQiQ4hIOZnV58R3l4Ri0Rz9aPV6PxXopnVUHDbw'),
(45,NULL,'http://emilcarlsson.se/assets/louislitt.png','Ipin','ipin@gmail.com','025652','peserta','123456789','$2b$10$pj1nDTW4zKEa2vQenHO9reuNjZnojla9s8a1MI4o6ZL95xxXbfJqi','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjA4MzIwODMsImlkIjo0NCwibmFtZSI6IlNhbXdlbCBUYXJseSIsInRpcGVfdXNlciI6InBlc2VydGEiLCJlbWFpbCI6ImJvbGxvc0BnbWFpbC5jb20iLCJub19ocCI6IjAyNTY1MiIsImlhdCI6MTYyMDYxNjA4M30.fS2wJQiQ4hIOZnV58R3l4Ri0Rz9aPV6PxXopnVUHDbw'),
(46,NULL,NULL,'Samwel Tarly','bollos@gmail.com','025652','peserta','123456789','$2b$10$X52rdh97/oXO3sWp8qOA6.RoIJM5UHpsJEKt4UP7K6sr/ukpJ5Zsq','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDcxMTM0MDUsImlkIjo0NiwibmFtZSI6IlNhbXdlbCBUYXJseSIsInRpcGVfdXNlciI6InBlc2VydGEiLCJlbWFpbCI6ImJvbGxvc0BnbWFpbC5jb20iLCJub19ocCI6IjAyNTY1MiIsImlhdCI6MTYyMDcxMzQwNX0.7RaXg4ICUv9oWUF-9hkd8LnEjvE3_ER7hgp0lczWWPY'),
(47,NULL,NULL,'Samwel Tarly','bollos@gmail.com','025652','peserta','123456789','$2b$10$UnTZioZAqZtIpMkt3qvYUuSJrpdKc3Krf3k2ccn/LUacQw5R4nFF6','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDcxMTM0NTksImlkIjo0NywibmFtZSI6IlNhbXdlbCBUYXJseSIsInRpcGVfdXNlciI6InBlc2VydGEiLCJlbWFpbCI6ImJvbGxvc0BnbWFpbC5jb20iLCJub19ocCI6IjAyNTY1MiIsImlhdCI6MTYyMDcxMzQ1OX0.iftvunFx2hXY4V37o-2WKhUGLbpliXBSurx3bMJB8gw');

/*Table structure for table `users_groups_chats` */

DROP TABLE IF EXISTS `users_groups_chats`;

CREATE TABLE `users_groups_chats` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_chat_id` bigint(20) DEFAULT NULL,
  `group_id` varchar(100) DEFAULT NULL COMMENT 'id_jadwal_noKelompok',
  `picture` varchar(200) DEFAULT NULL,
  `group_name` varchar(100) DEFAULT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users_groups_chats` */

insert  into `users_groups_chats`(`id`,`user_chat_id`,`group_id`,`picture`,`group_name`,`inserted_at`) values 
(1,45,'103_13','http://emilcarlsson.se/assets/mikeross.png','lets wrestle','2021-05-10 12:52:24'),
(2,44,'103_13','http://emilcarlsson.se/assets/mikeross.png','lets wrestle','2021-05-10 10:52:20'),
(3,43,'103_13','http://emilcarlsson.se/assets/mikeross.png','lets wrestle','2021-05-10 10:52:19');

/*Table structure for table `users_personal_chats` */

DROP TABLE IF EXISTS `users_personal_chats`;

CREATE TABLE `users_personal_chats` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_chat_id` bigint(20) DEFAULT NULL COMMENT 'users_chats',
  `id_target` bigint(20) DEFAULT NULL COMMENT 'users_chats',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users_personal_chats` */

insert  into `users_personal_chats`(`id`,`user_chat_id`,`id_target`) values 
(1,43,45),
(2,45,43);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
