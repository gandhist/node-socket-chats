/*
SQLyog Community
MySQL - 10.4.13-MariaDB : Database - pjk3
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `groups_chats` */

CREATE TABLE `groups_chats` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `send_by` varchar(100) DEFAULT NULL COMMENT 'user_chat_id',
  `message` text DEFAULT NULL,
  `type_message` bigint(2) DEFAULT 0 COMMENT '0 text, 1 file',
  `group_id` varchar(20) DEFAULT NULL COMMENT 'group_id',
  `inserted_at` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4;

/*Data for the table `groups_chats` */

insert  into `groups_chats`(`id`,`send_by`,`message`,`type_message`,`group_id`,`inserted_at`) values (35,'43','asd',0,'103_13',1620616214000),(36,'43','dd',0,'103_13',1620616220000),(37,'43','asd',0,'103_13',1620616221000),(38,'44','ddd',0,'103_13',1620616346000),(39,'44','yap',0,'103_13',1620616357000),(40,'44','something went wrong?',0,'103_13',1620616365000),(41,'43','no verythin is ok',0,'103_13',1620616383000),(42,'43','????‍♂️',0,'103_13',1620616413000),(43,'44','you back',0,'103_13',1620616434000),(44,'44','?',0,'103_13',1620616435000),(45,'43','d',0,'103_13',1620619833000),(46,'43','a',0,'103_13',1620619841000),(47,'44','d',0,'103_13',1620619845000),(48,'44','a',0,'103_13',1620619851000),(49,'44','d',0,'103_13',1620620000000),(50,'44','d',0,'103_13',1620620001000),(51,'44','d',0,'103_13',1620620001000),(52,'43','d',0,'103_13',1620621020000),(53,'43','dd',0,'103_13',1620621022000),(54,'43','s',0,'103_13',1620621033000),(55,'44','asd',0,'103_13',1620621036000),(56,'43','a',0,'103_13',1620621036000),(57,'44','ds',0,'103_13',1620621036000),(58,'44','asd',0,'103_13',1620621036000),(59,'43','dd',0,'103_13',1620621036000),(60,'43','n',0,'103_13',1620621036000),(61,'43','sd',0,'103_13',1620621036000),(62,'44','aaa',0,'103_13',1620621036000),(63,'43','dds',0,'103_13',1620621036000),(64,'43','d',0,'103_13',1620621036000),(65,'44','a',0,'103_13',1620621036000),(66,'43','d',0,'103_13',1620621036000),(67,'44','a',0,'103_13',1620621036000),(68,'43','a',0,'103_13',1620621036000),(69,'43','a',0,'103_13',1620621036000),(70,'43','a',0,'103_13',1620621036000),(71,'44','d',0,'103_13',1620621036000),(72,'44','ds',0,'103_13',1620621036000),(73,'43','a',0,'103_13',1620621036000),(74,'45','hello',0,'103_13',1620621036000),(75,'43','https://github.com/rangav/thunder-client-support',0,'103_13',1620621036000),(76,'45','oeky',0,'103_13',1620621036000),(77,'43','te',0,'103_13',1620621036000),(78,'43','tts',0,'103_13',1620621036000),(79,'43','as',0,'103_13',1620621036000),(80,'44','asd',0,'103_13',1620621036000),(81,'43','asd',0,'103_13',1620621036000),(82,'43','2',0,'103_13',1620621036000),(83,'43','https://github.com/jshemas/openGraphScraper',0,'103_13',1620621036000),(84,'43','https://getbootstrap.com/docs/5.0/components/list-group/',0,'103_13',1620621036000),(85,'43','ddd',0,'103_13',1620621036000),(86,'43','ssss',0,'103_13',1620621036000),(87,'43','ssssss',0,'103_13',1620621036000),(88,'43','sssddsasds',0,'103_13',1620621036000),(89,'43','asd',0,'103_13',1620621036000),(90,'43','s',0,'103_13',1620621036000),(91,'43','d',0,'103_13',1620621036000),(92,'43','s',0,'103_13',1620621036000),(93,'43','tes epoch',0,'103_13',1622099511386),(94,'43','fake news',0,'103_13',1622446473493),(95,'43','rope a dope',0,'103_13',1622450044009),(96,'43','quid pro quo',0,'103_13',1622450085126),(97,'43','rope a dope',0,'103_13',1622450114065),(98,'43','quid pro quo',0,'103_13',1622460134511),(99,'43','Covfefe',0,'103_13',1622450230352),(100,'43','Covfefe',0,'103_13',1622450256136),(101,'43','Covfefe',0,'103_13',1622450281521),(102,'43','Covfefe',0,'103_13',1622450298833),(103,'43','Covfefe',0,'103_13',1622450832089),(104,'43','Covfefe',0,'103_13',1622450858571),(105,'43','covfefe',0,'103_13',1622450875313),(106,'43','Quid pro quo',0,'103_13',1622451043192),(107,'43','Covfefe',0,'103_13',1622454746833),(108,'43','ULULLLU',0,'103_13',1622454813557);

/*Table structure for table `media` */

CREATE TABLE `media` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `file_name` varchar(200) DEFAULT NULL,
  `extension` varchar(200) DEFAULT NULL,
  `uri` varchar(200) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `media` */

insert  into `media`(`id`,`file_name`,`extension`,`uri`,`size`,`created_by`,`created_at`,`updated_by`,`updated_at`,`deleted_by`,`deleted_at`) values (1,'USER_UPLOAD_451623154247197.jpg','jpg','https://storage.googleapis.com/download/storage/v1/b/csi-absensi/o/chat%2FUSER_UPLOAD_451623154247197.jpg?generation=1623154247525294&alt=media',126553,45,'2021-06-08 12:10:47',NULL,'2021-06-08 19:10:47',NULL,NULL);

/*Table structure for table `personal_chats` */

CREATE TABLE `personal_chats` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_relasi` varchar(200) DEFAULT NULL COMMENT 'sender_receiver',
  `send_by` bigint(20) DEFAULT NULL COMMENT 'user_chat_id',
  `message` text DEFAULT NULL,
  `type_message` int(2) DEFAULT 0 COMMENT '0 text, 1 file',
  `target_id` bigint(20) DEFAULT NULL COMMENT 'user_chat_id',
  `inserted_at` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;

/*Data for the table `personal_chats` */

insert  into `personal_chats`(`id`,`id_relasi`,`send_by`,`message`,`type_message`,`target_id`,`inserted_at`) values (1,'43_45',43,'asd',0,45,1620739448000),(2,'43_45',43,'khjkhjkasd',0,45,1620739448000),(3,'43_45',43,'tes epoch',0,45,1622099495744),(4,'43_45',43,'asdada',0,45,1622434258240),(5,'43_45',43,'sdfsf',0,45,1622434390835),(6,'43_45',43,'gjhg',0,45,1622434426886),(7,'43_45',43,'fg',0,45,1622434463683),(8,'43_45',43,'h',0,45,1622434472871),(9,'43_45',43,'testto',0,45,1622434622733),(10,'43_45',43,'testto',0,45,1622434640018),(11,'43_45',43,'testto',0,45,1622434726829),(12,'43_45',43,'testto',0,45,1622434748347),(13,'43_45',43,'g',0,45,1622434773607),(14,'43_45',43,'k',0,45,1622434798800),(15,'43_45',43,'dfdf',0,45,1622434812195),(16,'43_45',43,'testto',0,45,1622434855103),(17,'43_45',43,'testto',0,45,1622434942889),(18,'43_45',43,'testto',0,45,1622434982331),(19,'43_45',43,'testto',0,45,1622435019494),(20,'43_45',43,'username',0,45,1622435045019),(21,'43_45',43,'testto',0,45,1622435121625),(22,'43_45',43,'killed',0,45,1622435169372),(23,'43_45',43,'res_token[0].username',0,45,1622435203739),(24,'43_45',43,'res_token[0].username',0,45,1622435208467),(25,'43_45',43,'LAGE',0,45,1622435246059),(26,'43_45',43,'TES',0,45,1622441421277),(27,'43_45',43,'FAKE NEWS',0,45,1622446465265),(28,'43_45',43,'QUID PRO QUO',0,45,1622462702990),(29,'43_45',43,'COVFEFE',0,45,1622462821119),(30,'43_45',43,'FAKE NEWS',0,45,1622462968724);

/*Table structure for table `users_chats` */

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
  `token_firebase` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users_chats` */

insert  into `users_chats`(`id`,`is_online`,`picture`,`name`,`email`,`no_hp`,`tipe_user`,`hint`,`password`,`token`,`token_firebase`) values (43,NULL,'https://avatars.githubusercontent.com/u/22018903?s=400&v=4','Gandhi','bollox@gmail.com','025652','peserta','123456789','$2b$10$5lSTLLZm0bjbGnbVmxY2juCEAmG03RxdWaiTp1sJzFgC.7t2drsx.','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDc3MjA5MTQsImlkIjo0MywibmFtZSI6IkdhbmRoaSIsInRpcGVfdXNlciI6InBlc2VydGEiLCJlbWFpbCI6ImdhbmRoaUBlbWFpbC5jb20iLCJub19ocCI6IjAyNTY1MiIsImlhdCI6MTYyMTMyMDkxNH0.XA7XaNr6IfkVS87TcVQVTEbYxIkgvnYvrW0fqSmiGuc',NULL),(44,NULL,'http://emilcarlsson.se/assets/louislitt.png','Samwel Tarly','bollos@gmail.com','025652','peserta','123456789','$2b$10$pj1nDTW4zKEa2vQenHO9reuNjZnojla9s8a1MI4o6ZL95xxXbfJqi','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjA4MzIwODMsImlkIjo0NCwibmFtZSI6IlNhbXdlbCBUYXJseSIsInRpcGVfdXNlciI6InBlc2VydGEiLCJlbWFpbCI6ImJvbGxvc0BnbWFpbC5jb20iLCJub19ocCI6IjAyNTY1MiIsImlhdCI6MTYyMDYxNjA4M30.fS2wJQiQ4hIOZnV58R3l4Ri0Rz9aPV6PxXopnVUHDbw','INI ASLI'),(45,NULL,'http://emilcarlsson.se/assets/louislitt.png','Ipin','ipin@gmail.com','025652','peserta','123456789','$2b$10$pj1nDTW4zKEa2vQenHO9reuNjZnojla9s8a1MI4o6ZL95xxXbfJqi','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5MDYxOTQzMTIsImlkIjo0NSwibmFtZSI6IklwaW4iLCJ0aXBlX3VzZXIiOiJwZXNlcnRhIiwiZW1haWwiOiJpcGluQGdtYWlsLmNvbSIsIm5vX2hwIjoiMDI1NjUyIiwiaWF0IjoxNjIwNjE2MDgzfQ.QNiFJWPxJAgiIMbPLzpNPzbiBIdbA-a9Cn8ybPbTvg0','fOkWluzfRMSE3LgDV3cfNr:APA91bEbqsdeV1R98EL0LrZbN5T2QIDKLwUR17EjYLivUPG5LVWktFXSABm3k1J95eAqrKgBJzKH-tr42aL9d_q_f2VaK4r2TTciok71rQsVfvKC45nFFYonq3gPQGt6UfUMf-1Cpuxm'),(46,NULL,NULL,'Samwel Tarly','bollos@gmail.com','025652','peserta','123456789','$2b$10$X52rdh97/oXO3sWp8qOA6.RoIJM5UHpsJEKt4UP7K6sr/ukpJ5Zsq','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDcxMTM0MDUsImlkIjo0NiwibmFtZSI6IlNhbXdlbCBUYXJseSIsInRpcGVfdXNlciI6InBlc2VydGEiLCJlbWFpbCI6ImJvbGxvc0BnbWFpbC5jb20iLCJub19ocCI6IjAyNTY1MiIsImlhdCI6MTYyMDcxMzQwNX0.7RaXg4ICUv9oWUF-9hkd8LnEjvE3_ER7hgp0lczWWPY',NULL),(47,NULL,NULL,'Samwel Tarly','bollos@gmail.com','025652','peserta','123456789','$2b$10$UnTZioZAqZtIpMkt3qvYUuSJrpdKc3Krf3k2ccn/LUacQw5R4nFF6','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDcxMTM0NTksImlkIjo0NywibmFtZSI6IlNhbXdlbCBUYXJseSIsInRpcGVfdXNlciI6InBlc2VydGEiLCJlbWFpbCI6ImJvbGxvc0BnbWFpbC5jb20iLCJub19ocCI6IjAyNTY1MiIsImlhdCI6MTYyMDcxMzQ1OX0.iftvunFx2hXY4V37o-2WKhUGLbpliXBSurx3bMJB8gw',NULL);

/*Table structure for table `users_groups_chats` */

CREATE TABLE `users_groups_chats` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_chat_id` bigint(20) DEFAULT NULL,
  `group_id` varchar(100) DEFAULT NULL COMMENT 'id_jadwal_noKelompok',
  `picture` varchar(200) DEFAULT NULL,
  `group_name` varchar(100) DEFAULT NULL,
  `inserted_at` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users_groups_chats` */

insert  into `users_groups_chats`(`id`,`user_chat_id`,`group_id`,`picture`,`group_name`,`inserted_at`) values (1,45,'103_13','http://emilcarlsson.se/assets/mikeross.png','lets wrestle',1620625944000),(2,44,'103_13','http://emilcarlsson.se/assets/mikeross.png','lets wrestle',1620618740000),(3,43,'103_13','http://emilcarlsson.se/assets/mikeross.png','lets wrestle',1620618739000);

/*Table structure for table `users_personal_chats` */

CREATE TABLE `users_personal_chats` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_chat_id` bigint(20) DEFAULT NULL COMMENT 'users_chats',
  `id_target` bigint(20) DEFAULT NULL COMMENT 'users_chats',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users_personal_chats` */

insert  into `users_personal_chats`(`id`,`user_chat_id`,`id_target`) values (1,43,45),(2,45,43);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
