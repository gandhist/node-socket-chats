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
  `type_message` varchar(200) DEFAULT 'plain-text' COMMENT 'MIME TYPE',
  `media` text DEFAULT NULL,
  `group_id` varchar(20) DEFAULT NULL COMMENT 'group_id',
  `inserted_at` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4;

/*Data for the table `groups_chats` */

insert  into `groups_chats`(`id`,`send_by`,`message`,`type_message`,`media`,`group_id`,`inserted_at`) values (35,'43','91a8797dde2ac2037641f63c7d376af2','plain-text',NULL,'103_13',1620616214000),(36,'43','da829cf97a60524edf770746e956b645','plain-text',NULL,'103_13',1620616220000),(37,'43','7161589442a7083c3b9ba75a609f0710','plain-text',NULL,'103_13',1620616221000),(38,'44','5da6989d1f35acbdae41337916ebda2b','plain-text',NULL,'103_13',1620616346000),(39,'44','f7f60992f1f77bcf869efd69960008d0','plain-text',NULL,'103_13',1620616357000),(40,'44','aa5edc6760b873b380397b0c79fea9f8','plain-text',NULL,'103_13',1620616365000),(41,'43','0afa4568196c7156b567e5d51a2fcc80','plain-text',NULL,'103_13',1620616383000),(42,'43','b2c1cda3643c1541e36611f5552fe08c','plain-text',NULL,'103_13',1620616413000),(43,'44','5ced0334e7a5710ab24e0a6d3ff09e36','plain-text',NULL,'103_13',1620616434000),(44,'44','af00a07f538e79808d656979ce570414','plain-text',NULL,'103_13',1620616435000),(45,'43','42491a6b58c1cf98e3f0b2b3534f9826','plain-text',NULL,'103_13',1620619833000),(46,'43','04dd246a676796f2ad8d27a7996382cf','plain-text',NULL,'103_13',1620619841000),(47,'44','19b685bff8ada0ae8d5be29b6150130c','plain-text',NULL,'103_13',1620619845000),(48,'44','7cd092c1c24aadf3ebddc43c6370b831','plain-text',NULL,'103_13',1620619851000),(49,'44','807921072c2a4e64e9a596fed8aac7eb','plain-text',NULL,'103_13',1620620000000),(50,'44','e5c02a5b3ae64a221ef9c943e8936b07','plain-text',NULL,'103_13',1620620001000),(51,'44','6325afb9a5076d4478eb241061ab3830','plain-text',NULL,'103_13',1620620001000),(52,'43','e6f774764e73786e1c71ce5ae719b208','plain-text',NULL,'103_13',1620621020000),(53,'43','fe489c0e8be997fab34fc82aa5e424b7','plain-text',NULL,'103_13',1620621022000),(54,'43','067c9cd4effe40bb0af5c6d66d28b60d','plain-text',NULL,'103_13',1620621033000),(55,'44','0383e84ad93fdeb46f49a9877d2720a7','plain-text',NULL,'103_13',1620621036000),(56,'43','0470a9d581fd6c49dbe42698d4280da2','plain-text',NULL,'103_13',1620621036000),(57,'44','a6a1a41429ec8a924db335298c725f74','plain-text',NULL,'103_13',1620621036000),(58,'44','5f07691f7c56dbc47e228da1d8cdc79a','plain-text',NULL,'103_13',1620621036000),(59,'43','01a9e4f030c7cfd8722ca8baf62a0bcb','plain-text',NULL,'103_13',1620621036000),(60,'43','dd8faff8df51a3da9bfc4c99c314bc23','plain-text',NULL,'103_13',1620621036000),(61,'43','2b5521de217f3beca547ff8287d7e9b2','plain-text',NULL,'103_13',1620621036000),(62,'44','8e6ae8ce4dfbde15d9f1d7f9a2885af5','plain-text',NULL,'103_13',1620621036000),(63,'43','e0ab9b6bcd7d531c7ec1b9ece4e71ba9','plain-text',NULL,'103_13',1620621036000),(64,'43','7f417fc440eb269d1ea6f3af5671ee28','plain-text',NULL,'103_13',1620621036000),(65,'44','68645ee02b7f14324c61cff85ce6e0a8','plain-text',NULL,'103_13',1620621036000),(66,'43','0546dcdc9a058074fcf7f4663a6832f4','plain-text',NULL,'103_13',1620621036000),(67,'44','e4f094079fd78549ad0fbf63edea4083','plain-text',NULL,'103_13',1620621036000),(68,'43','55eb6532fdd881d2e8148a7ae0c1042f','plain-text',NULL,'103_13',1620621036000),(69,'43','49e9665b4bca6280521bc2a2614010bb','plain-text',NULL,'103_13',1620621036000),(70,'43','d5143e725d1d7d1abf943394330d9c06','plain-text',NULL,'103_13',1620621036000),(71,'44','38d86a76b1b4838aa9d0cdef48d4a101','plain-text',NULL,'103_13',1620621036000),(72,'44','40861c5938612e3354ad0973bb86743d','plain-text',NULL,'103_13',1620621036000),(73,'43','c345ff3863470a1ff1a7f0d837bdde9f','plain-text',NULL,'103_13',1620621036000),(74,'45','d33a7bcd7fdd284a547a5ad90f3d07bd','plain-text',NULL,'103_13',1620621036000),(75,'43','27e3894922643aeba0e617dd2fc6e3b1','plain-text',NULL,'103_13',1620621036000),(76,'45','0661f17401b29ca6bcc1e5ae35fa49ea','plain-text',NULL,'103_13',1620621036000),(77,'43','a9de9759ff17feb263baaa3953af3ef4','plain-text',NULL,'103_13',1620621036000),(78,'43','78e3ebaf348973b74bd37ce95317a416','plain-text',NULL,'103_13',1620621036000),(79,'43','f28626f98a24cdffdd0487666e5be9d7','plain-text',NULL,'103_13',1620621036000),(80,'44','1e050fd82e1eeb17bac0ebb85d1599a5','plain-text',NULL,'103_13',1620621036000),(81,'43','aeeada23e9c16067aeb4dade84fd20e1','plain-text',NULL,'103_13',1620621036000),(82,'43','d378404c7285b2fa8a381cb7d570f92c','plain-text',NULL,'103_13',1620621036000),(83,'43','8c57e88d8eeb96da66963f65bb55f617','plain-text',NULL,'103_13',1620621036000),(84,'43','3dcdb6f716e7f9efa98d3d5967ab9587','plain-text',NULL,'103_13',1620621036000),(85,'43','1cc448696946375db3c5c71dbb0878d6','plain-text',NULL,'103_13',1620621036000),(86,'43','516fee61161f7706b1b0ff8df95c4c6b','plain-text',NULL,'103_13',1620621036000),(87,'43','ce6bfb79cff90bf1e37c96177517b11b','plain-text',NULL,'103_13',1620621036000),(88,'43','a526141ad9ac8ee9bd58554645ad1126','plain-text',NULL,'103_13',1620621036000),(89,'43','a49967d75e6d6e9a16b395ddd3418faa','plain-text',NULL,'103_13',1620621036000),(90,'43','e4c5ed7e703b62ca11e080c12b596e46','plain-text',NULL,'103_13',1620621036000),(91,'43','288e615c3318aa6fd56aa0dbadbe34f5','plain-text',NULL,'103_13',1620621036000),(92,'43','8305f10363715ab2330f82beef138dd5','plain-text',NULL,'103_13',1620621036000),(93,'43','fec5f7ebd824c5da40bc02ac11478f60','plain-text',NULL,'103_13',1622099511386),(94,'43','9443d4730c80d8462ded2841295a0c73','plain-text',NULL,'103_13',1622446473493),(95,'43','688ec1c9c538d7a95071c3c76ffcab76','plain-text',NULL,'103_13',1622450044009),(96,'43','7fef44ec590967c02c726e16a4213107','plain-text',NULL,'103_13',1622450085126),(97,'43','e95ee98f2513021e1fd2d0e36d2285b1','plain-text',NULL,'103_13',1622450114065),(98,'43','a7faba9929483ae53ff8c488495e87cc','plain-text',NULL,'103_13',1622460134511),(99,'43','cdd92310b8d9dcc0e92d09fad8568383','plain-text',NULL,'103_13',1622450230352),(100,'43','e5c61a8035dc3fb7d92e8635fd6c468f','plain-text',NULL,'103_13',1622450256136),(101,'43','ba346feaee166e7c672888a3e957fc40','plain-text',NULL,'103_13',1622450281521),(102,'43','acfe042312cbb285c19fd42f87c810b6','plain-text',NULL,'103_13',1622450298833),(103,'43','278b09ba1c01ad536fdc97d661893c70','plain-text',NULL,'103_13',1622450832089),(104,'43','2daf5a9a1a0324ef748f9f44bd4a94b5','plain-text',NULL,'103_13',1622450858571),(105,'43','71a4d00d1e8e53f14c869d735ca03405','plain-text',NULL,'103_13',1622450875313),(106,'43','6b54e9dda300149c4306542c962528bd','plain-text',NULL,'103_13',1622451043192),(107,'43','606df5010678fc1c1cf026ee35706591','plain-text',NULL,'103_13',1622454746833),(108,'43','5bb416e2498afe1802da60310273416d','plain-text',NULL,'103_13',1622454813557);

/*Table structure for table `media` */

CREATE TABLE `media` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `file_name` varchar(200) DEFAULT NULL,
  `extension` varchar(200) DEFAULT NULL,
  `uri` text DEFAULT NULL,
  `download_uri` text DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

/*Data for the table `media` */

insert  into `media`(`id`,`file_name`,`extension`,`uri`,`download_uri`,`size`,`created_by`,`created_at`,`updated_by`,`updated_at`,`deleted_by`,`deleted_at`) values (8,'USER_UPLOAD_45_1623224253649.jpg','jpg','https://storage.googleapis.com/csi-absensi/chat/USER_UPLOAD_45_1623224253649.jpg','https://storage.googleapis.com/download/storage/v1/b/csi-absensi/o/chat%2FUSER_UPLOAD_45_1623224253649.jpg?generation=1623224254067390&alt=media',126553,45,'2021-06-09 07:37:34',NULL,'2021-06-09 14:37:34',NULL,NULL),(9,'USER_UPLOAD_45_1623224920123.jpg','jpg','https://storage.googleapis.com/csi-absensi/chat/USER_UPLOAD_45_1623224920123.jpg','https://storage.googleapis.com/download/storage/v1/b/csi-absensi/o/chat%2FUSER_UPLOAD_45_1623224920123.jpg?generation=1623224925615504&alt=media',126553,45,'2021-06-09 07:48:45',NULL,'2021-06-09 14:48:45',NULL,NULL),(10,'USER_UPLOAD_45_1623317019620.jpg','jpg','https://storage.googleapis.com/csi-absensi/chat/USER_UPLOAD_45_1623317019620.jpg','https://storage.googleapis.com/download/storage/v1/b/csi-absensi/o/chat%2FUSER_UPLOAD_45_1623317019620.jpg?generation=1623317019983596&alt=media',126553,45,'2021-06-10 09:23:40',NULL,'2021-06-10 16:23:40',NULL,NULL);

/*Table structure for table `personal_chats` */

CREATE TABLE `personal_chats` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_relasi` varchar(200) DEFAULT NULL COMMENT 'sender_receiver',
  `send_by` bigint(20) DEFAULT NULL COMMENT 'user_chat_id',
  `message` text DEFAULT NULL,
  `type_message` varchar(200) DEFAULT 'plain-text' COMMENT 'MIME TYPE',
  `media` text DEFAULT NULL,
  `target_id` bigint(20) DEFAULT NULL COMMENT 'user_chat_id',
  `inserted_at` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;

/*Data for the table `personal_chats` */

insert  into `personal_chats`(`id`,`id_relasi`,`send_by`,`message`,`type_message`,`media`,`target_id`,`inserted_at`) values (1,'43_45',43,'asd','plain-text',NULL,45,1620739448000),(2,'43_45',43,'khjkhjkasd','plain-text',NULL,45,1620739448000),(3,'43_45',43,'tes epoch','plain-text',NULL,45,1622099495744),(4,'43_45',43,'asdada','plain-text',NULL,45,1622434258240),(5,'43_45',43,'sdfsf','plain-text',NULL,45,1622434390835),(6,'43_45',43,'gjhg','plain-text',NULL,45,1622434426886),(7,'43_45',43,'fg','plain-text',NULL,45,1622434463683),(8,'43_45',43,'h','plain-text',NULL,45,1622434472871),(9,'43_45',43,'testto','plain-text',NULL,45,1622434622733),(10,'43_45',43,'testto','plain-text',NULL,45,1622434640018),(11,'43_45',43,'testto','plain-text',NULL,45,1622434726829),(12,'43_45',43,'testto','plain-text',NULL,45,1622434748347),(13,'43_45',43,'g','plain-text',NULL,45,1622434773607),(14,'43_45',43,'k','plain-text',NULL,45,1622434798800),(15,'43_45',43,'dfdf','plain-text',NULL,45,1622434812195),(16,'43_45',43,'testto','plain-text',NULL,45,1622434855103),(17,'43_45',43,'testto','plain-text',NULL,45,1622434942889),(18,'43_45',43,'testto','plain-text',NULL,45,1622434982331),(19,'43_45',43,'testto','plain-text',NULL,45,1622435019494),(20,'43_45',43,'username','plain-text',NULL,45,1622435045019),(21,'43_45',43,'testto','plain-text',NULL,45,1622435121625),(22,'43_45',43,'killed','plain-text',NULL,45,1622435169372),(23,'43_45',43,'res_token[0].username','plain-text',NULL,45,1622435203739),(24,'43_45',43,'res_token[0].username','plain-text',NULL,45,1622435208467),(25,'43_45',43,'LAGE','plain-text',NULL,45,1622435246059),(26,'43_45',43,'TES','plain-text',NULL,45,1622441421277),(27,'43_45',43,'FAKE NEWS','plain-text',NULL,45,1622446465265),(28,'43_45',43,'QUID PRO QUO','plain-text',NULL,45,1622462702990),(29,'43_45',43,'COVFEFE','plain-text',NULL,45,1622462821119),(30,'43_45',43,'FAKE NEWS','plain-text',NULL,45,1622462968724);

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
