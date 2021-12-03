-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: titan_games
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `postalCode` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (2,'asd123','','',0,1212,12),(10,'asd123','ALDEA SAN ANTONIO','30',0,2222,10),(12,'Richieri 613','','',0,1661,16),(13,'','','',0,0,17),(14,'','','',0,0,18),(15,'','','',0,0,19),(16,'','','',0,0,20),(17,'','','',0,0,21),(18,'','','',0,0,22);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userId` int(10) NOT NULL,
  `productId` int(10) NOT NULL,
  `quantity` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `productId` (`productId`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Aventura'),(2,'Acción'),(11,'Rol'),(12,'Simulación'),(13,'Estrategia'),(14,'Deportes');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` varchar(800) DEFAULT NULL,
  `offers` int(11) DEFAULT NULL,
  `minimumVideo` varchar(200) DEFAULT NULL,
  `minimumProcessor` varchar(200) DEFAULT NULL,
  `minimumRam` varchar(200) DEFAULT NULL,
  `recommendedVideo` varchar(200) DEFAULT NULL,
  `recommendedProcessor` varchar(200) DEFAULT NULL,
  `recommendedRam` varchar(200) DEFAULT NULL,
  `videoURL` varchar(100) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `subCategoryId` int(11) DEFAULT NULL,
  `timesVisited` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ef58d02f-4de8-4f36-bdcd-d7fc35ed0d2a` (`categoryId`),
  KEY `subCategoryId` (`subCategoryId`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`subCategoryId`) REFERENCES `subcategories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'The Witcher 3',600,'Mientras la guerra se extiende por los Reinos del Norte, aceptarás el contrato de tu vida: encontrar a la niña de la profecía, un arma viviente que puede alterar el mundo tal y como lo conocemos. ',15,'1050ti','I5 7400','8gb','1070ti','i7 8100','16gb','https://www.youtube.com/embed/c0i88t0Kacs?start=15',11,12,9),(2,'Battlefield 4',5500,'Esta es la mejor experiencia de Battlefield 4. Vive el mayor conflicto de la humanidad con un completo arsenal de armas, vehículos y dispositivos, y todos los contenidos de personalización de los dos primeros años ',25,'Nvidia GeForce 8800 GT','(Intel): Core 2 Duo 2.4 GHz','4 GB','NVIDIA GeForce GTX 660','(Intel): Quad-core CPU','8 GB de RAM','https://www.youtube.com/embed/ASzOzrB-a9E?start=2',2,2,9),(11,'Ni no Kuni™ II: Revenant Kingdom',649,'Únete al viaje que llevará al joven rey Evan en busca de un nuevo reino, además de, con la ayuda de nuevos amigos, unir el mundo y salvar a sus gentes de un mal espantoso. ',0,'NVIDIA GeForce GTX 750 Ti','Intel Core i5-4460','4 GB de RAM','NVIDIA GeForce GTX 970','Intel Core i7-3770','8 GB de RAM','https://www.youtube.com/embed/2MJs869kavY?start=4',1,1,7),(12,'Hearts of Iron IV',439,'¡Tenemos la victoria al alcance de la mano! Tu capacidad para liderar tu nación es tu arma principal. En el juego de estrategia Hearts of Iron IV podrás ponerte el mando de cualquier nación de la II Guerra Mundial, el conflicto más fascinante de la historia mundial. ',0,'ATI Radeon HD 5850','Intel Core 2 Quad Q9400 @ 2.66 GHz','4 GB de RAM','ATI Radeon HD 6950','Intel Core i5 750 @ 2.66 GHz','4 GB de RAM','https://www.youtube.com/embed/p26A0H3IoO4?start=0',12,16,3),(13,'Europa Universalis IV',439,'Cuatro siglos de historia cobran vida en el juego de gran estrategia de Paradox. Dirige una nación desde el Renacimiento hasta la Revolución en una compleja simulación del comienzo del mundo moderno. Domina el arte de la guerra, la diplomacia y el comercio para cambiar la historia de tu nación.',0,'Nvidia® GeForce™ GTX 460','Intel® Core™ i3-2105','1 GB RAM','Nvidia® GeForce™ GTX 560 Ti','Intel® Core™ i3 3240','8 GB RAM','https://www.youtube.com/embed/hWQ8AXwHPQg?start=0',12,15,2),(15,'The Elder Scrolls IV: Oblivion',240,'The Elder Scrolls IV: Oblivion® Edición Juego del Año presenta uno de los mejores juegos de rol de todos los tiempos como nunca se había visto hasta ahora. Adéntrate en el mundo más detallado y emocionante jamás creado. ',70,'Tarjeta gráfica con 128 MB de VRAM','Intel Pentium 4 a 2 GHz','512 MB de RAM','Tarjeta gráfica con 128 MB de VRAM','Intel Pentium 4 a 2 GHz','512 MB de RAM','https://www.youtube.com/embed/qJnnPh44Rlo?start=0',11,11,4),(17,'Happy Game',272,'Un niño se duerme y queda sumido en una pesadilla horrible. ¿Conseguirás devolverle la felicidad?',0,'DirectX 11 compatible GPU','2 GHz Intel i5','4 GB de RAM','DirectX 11 compatible GPU','2 GHz Intel i5','4 GB de RAM','https://www.youtube.com/embed/6zRXi3nhUaU?start=0',1,1,4),(18,'The Forest',89,'As the lone survivor of a passenger jet crash, you find yourself in a mysterious forest battling to stay alive against a society of cannibalistic mutants. Build, explore, survive in this terrifying first person survival horror simulator',60,'NVIDIA GeForce 8800GT','Intel Dual-Core 2.4 GHz','4 GB de RAM','NVIDIA GeForce GTX 560','Quad Core Processor','4 GB de RAM','https://www.youtube.com/embed/7mwn5U2PNvk?start=15',2,7,11),(19,'Age of Empires IV',2999,'Uno de los juegos de estrategia en tiempo real más queridos vuelve a demostrar todo su esplendor con Age of Empires IV, donde serás la estrella de las épicas batallas históricas que moldearon el mundo que hoy conocemos',0,'AMD Radeon RX Vega 11','Intel Core i5-6300U','8 GB de RAM','Nvidia GeForce 970 GPU','3.6 GHz 6-core (Intel i5)','16 GB de RAM','https://www.youtube.com/embed/Ovt7d34_hRA?start=0',13,18,2),(20,'Dead By Daylight',334,'Dead by Daylight es un juego de horror de multijugador (4 contra 1) en el que un jugador representa el rol del asesino despiadado y los 4 restantes juegan como supervivientes que intentan escapar de él para evitar ser capturados y asesinados',0,'GeForce GTX 460 1GB ','Intel Core i3-4170','8 GB de RAM','AMD HD 8800','AMD FX-8300','16 GB de RAM','https://www.youtube.com/embed/JGhIXLO3ul8?start=5',2,2,4),(22,'Naraka: Bladepoint',1499,'NARAKA: BLADEPOINT es una experiencia mítica de combate y acción para hasta 60 jugadores con enfrentamientos cuerpo a cuerpo basados en las artes marciales, movimientos que desafían la gravedad, héroes personalizables dotados de habilidades épicas y un enorme arsenal de armas',45,'NVIDIA GeForce GTX 750TI','Intel i5 4th generation','8 GB de RAM','NVIDIA GeForce GTX 1060 6G','Intel i7 7th generation','16 GB de RAM','https://www.youtube.com/embed/Q_uBBXiqL1s?start=0',2,7,14),(23,'Back 4 Blood',3999,'Los creadores de la aclamada saga de Left 4 Dead presentan Back 4 Blood, un emocionante juego de disparos en primera persona cooperativo',0,'NVIDIA GeForce GTX 1050 Ti','Intel Core i5-6600 (3.3 GHz)','8 GB de RAM','NVIDIA GeForce GTX 970','Intel Core i5-8400 (2.8 GHz)','12 GB de RAM','https://www.youtube.com/embed/tKlFJbyUsoo?start=4',2,3,10),(24,'Call of Duty®: Back Ops III',600,'Call of Duty® Black Ops III: Zombies Chronicles Edition incluye el juego original completo y la expansión de contenido Zombies Chronicles.',30,'NVIDIA® GeForce® GTX 470 @ 1GB','Intel® Core™ i3-530 @ 2.93 GHz ','6 GB de RAM','NVIDIA® GeForce® GTX 470 @ 1GB','Intel® Core™ i3-530 @ 2.93 GHz','6 GB de RAM','https://www.youtube.com/embed/qAUYNIDEJ6o?start=4',2,2,61),(27,'Surv1v3',280,'Forget what you have played so far, SURV1V3 is a unique realistic zombie survival fps game expressly designed for VIRTUAL REALITY that will let you test your survival skills. Play the thrilling story in single mode or coop with your friends (up to 4 players) and survive the apocalypse!',20,'Nvidia GT 1030','AMD Ryzen 3 1200','8 GB de RAM','Nvidia GTX 1050 ','','','https://www.youtube.com/embed/XNGl5Ct3r4g',2,2,3),(28,'CHORUS',450,'Antes era la guerrera más letal del Círculo, ahora, su enemiga número uno. Controla a Nara y su caza, Forsaken, en un viaje por toda la galaxia para unir a las fuerzas de la resistencia contra el Círculo y liberar al universo de su opresión.',60,'Nvidia GT 1030','AMD Ryzen 3 1200','8 GB de RAM','Nvidia GTX 1050 ','3.6 GHz 6-core (Intel i5)','16 GB de RAM','https://www.youtube.com/embed/gnRy-waJBjA',12,16,5),(29,'Propnight',3456,'Participa en una fiesta apasionante en Propnight, un juego multijugador basado en físicas similar al escondite, combinado con el clásico juego de supervivencia y terror',75,'Nvidia GT 1030','AMD Ryzen 3 1200','8 GB de RAM','Nvidia GTX 1050 ','','','https://www.youtube.com/embed/QhT5_aCmDCk',12,16,4),(30,'Twin Mirror',1483,'¡Juega ya a la demo! Sam Higgs, experiodista de investigación, cambiará para siempre el pequeño pueblo de Basswood en esta intrigante experiencia narrativa del aclamado estudio DONTNOD. ¿Encontrarás la verdad... cueste lo que cueste? ',50,'Nvidia GeForce GTX 750','Intel Core i3 2100','4 GB de RAM','Nvidia GeForce GTX 105','Intel Core i3 6100','8 GB de RAM','https://www.youtube.com/embed/oQ-Rb9ASuXE',1,9,5),(31,'A Plague Tale: Innocence',524,'Sigue la lúgubre historia de la joven Amicia y su hermano pequeño Hugo en un viaje por los momentos más oscuros de la historia. ',75,'GeForce GTX 660','Intel Core i3-2120','8 GB de RAM','GeForce GTX 970','Intel Core i5-4690','16 GB de RAM','https://www.youtube.com/embed/CtP6mNeN6yE',11,13,2),(33,'Sea of Thieves',479,'Sea of Thieves ofrece la experiencia de piratasdefinitiva, desde la navegación y elcombate hasta la exploración y elsaqueo: todo para disfrutar de la vidapirata y convertirteenleyenda. No hay funcionesestablecidas, tienes total libertad para enfrentarte al mundo y a los ',40,'Nvidia GeForce GTX 650','Intel Q9450','4 GB de RAM','Nvidia GeForce GTX 770','Intel i5 4690','8 GB de RAM','https://www.youtube.com/embed/r5JIBaasuE8',1,1,4);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_images`
--

DROP TABLE IF EXISTS `products_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` text DEFAULT NULL,
  `productId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `products_images_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_images`
--

LOCK TABLES `products_images` WRITE;
/*!40000 ALTER TABLE `products_images` DISABLE KEYS */;
INSERT INTO `products_images` VALUES (1,'product-1630325014022.png',1),(2,'product-1630375318093.png',1),(3,'product-1630375318150.png',1),(4,'product-1630468784487.png',1),(5,'product-1630468784538.png',1),(6,'product-1630470009016.png',2),(7,'product-1630470009024.jpg',2),(8,'product-1630470009029.jpg',2),(9,'product-1630470009032.jpg',2),(10,'product-1630325105438.jpg',2),(53,'product-1634581206316.jpg',11),(54,'product-1634581206326.jpg',11),(55,'product-1634581206327.jpg',11),(56,'product-1634581206328.jpg',11),(57,'product-1634581206328.jpg',11),(58,'product-1634582275638.jpg',12),(59,'product-1634582275639.jpg',12),(60,'product-1634582275640.jpg',12),(61,'product-1634582275641.jpg',12),(62,'product-1634582275643.jpg',12),(63,'product-1634582464501.jpg',13),(64,'product-1634582464509.jpg',13),(65,'product-1634582464510.jpg',13),(66,'product-1634582464511.jpg',13),(67,'product-1634582464512.jpg',13),(73,'product-1634583343258.jpg',15),(74,'product-1634583343263.jpg',15),(75,'product-1634583343263.jpg',15),(76,'product-1634583343264.jpg',15),(77,'product-1634583343265.jpg',15),(83,'product-1635516711575.jpg',17),(84,'product-1635516711610.jpg',17),(85,'product-1635516711624.jpg',17),(86,'product-1635516711626.jpg',17),(87,'product-1635516711637.jpg',17),(88,'thumb-1920-581828.jpg',18),(89,'product-1635517060087.jpg',18),(90,'product-1635517060099.jpg',18),(91,'product-1635517060101.jpg',18),(92,'product-1635517060107.jpg',18),(93,'product-1635517254114.jpg',19),(94,'product-1635517254115.jpg',19),(95,'product-1635517254120.jpg',19),(96,'product-1635517254121.jpg',19),(97,'product-1635517254133.jpg',19),(98,'product-1635517529759.jpeg',20),(99,'product-1635517529762.jpg',20),(100,'product-1635517529763.jpg',20),(101,'product-1635517529764.jpg',20),(102,'product-1635517529768.jpeg',20),(103,'EGS_NARAKABLADEPOINT_24Entertainment_S1_2560x1440-5f7eae943282dd9a681a1bd3f88fc354.jpg',22),(104,'product-1635517752802.jpg',22),(105,'product-1635517752806.jpg',22),(106,'product-1635517752815.jpg',22),(107,'product-1635517752827.jpg',22),(108,'product-1635518038309.jpg',23),(109,'product-1635518038312.jpg',23),(110,'product-1635518038315.jpg',23),(111,'product-1635518038323.jpg',23),(112,'product-1635518038324.jpg',23),(113,'product-1635519994940.jpg',24),(114,'product-1635519994945.jpg',24),(115,'product-1635519994961.jpg',24),(116,'product-1635519994969.jpg',24),(117,'product-1635519994976.jpg',24),(125,'product-1638563038196.png',27),(126,'product-1638563038221.jpeg',27),(127,'product-1638563038232.jpg',27),(128,'product-1638563038244.jpg',27),(129,'product-1638563038255.jpg',27),(130,'product-1638563371028.jpeg',28),(131,'product-1638563371031.jpg',28),(132,'product-1638563371032.jpg',28),(133,'product-1638563371034.jpg',28),(134,'product-1638563371040.jpeg',28),(135,'Propnight-Ann_10-15-21.jpg',29),(136,'product-1638563646837.jpg',29),(137,'product-1638563646845.jpg',29),(138,'product-1638563646848.jpg',29),(139,'product-1638563646850.jpg',29),(140,'product-1638564815090.jpg',30),(141,'product-1638564815092.jpg',30),(142,'product-1638564815093.jpg',30),(143,'product-1638564815094.jpg',30),(144,'product-1638564815094.jpg',30),(145,'product-1638565003639.jpeg',31),(146,'product-1638565003644.jpg',31),(147,'product-1638565003645.jpg',31),(148,'product-1638565003646.jpg',31),(149,'product-1638565003647.jpg',31),(160,'product-1638566112523.jpg',33),(161,'product-1638566112529.jpg',33),(162,'product-1638566112530.jpg',33),(163,'product-1638566112531.jpg',33),(164,'product-1638566112532.jpg',33);
/*!40000 ALTER TABLE `products_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Rol de aventuras',1),(2,'First Person Shooter',2),(3,'Third Person Shooter',2),(6,'Arcade',2),(7,'Lucha',2),(8,'Peleas callejeras',2),(9,'Buena trama',1),(10,'Puzles',1),(11,'En grupo',11),(12,'Estrategia',11),(13,'Rol de Acción',11),(14,'Rol japonés',11),(15,'Agricultura',12),(16,'Espacio',12),(17,'Cartas y mesa',13),(18,'Defensa de torres',13),(19,'Militares',13),(20,'Carreras',14),(21,'Pesca y caza',14);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `pass` varchar(200) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `rol` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10,'pepito','a@b.com','$2a$10$PVUuxr681p.JlMfS2G9ubOcEMbRkmhSDuzKbVE1Vku3e1oZXcDRge','user-1635451000214.jpg',2),(12,'asd','1@1.com','$2a$10$KA5xgO0c7SF0HJXTSdcfW.OlK3SoXVV.AfiAIBAJvWP5jOzJC5r5O','default_user.jpg',0),(16,'asd','1@2.com','$2a$10$R/5j56gxMY6WREnxP6mwp.5GzCIwKV8wvpOVUo.mMRZOinaH1VBVq','default_user.jpg',0),(17,'aver','aver@mail.com','$2a$10$iyu17EX5NxEAR8Ggr5bNae8ZKpvzF7c9zpFQqeZbq6j68FYnxmrLi','default_user.jpg',0),(18,'pepito','pepito@mail.com','$2a$10$GFDBhfVpknje1yidtUlIkuLC8Ma0me0saNayKPp1A376ZT5t0wACe','default_user.jpg',0),(19,'jorgito','jorgito@mail.com','$2a$10$aTQqRqB/aMEAMzpSqXl9v.g70mUxzLxIy4Nx5XQwx1oq6LcA00Lhu','default_user.jpg',0),(20,'manuelito','manuelito@mail.com','$2a$10$zQI2XkjmDYyKJlMPLulKL.9lUC4PiQH5AkQ1KCdSK88jeZjuoREMe','default_user.jpg',0),(21,'josesito','josesito@mail.com','$2a$10$/z5aIuzGrJmArAWuDc7WHeUgKdXTEexc.mnRFc967QvSQeeUn2.TK','default_user.jpg',0),(22,'javier','javiersito@mail.com','$2a$10$0qbFv5Vqgcrg/obyqnvtTO3gTCs5zzsUWB0k4McONziUwKplef4ry','default_user.jpg',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'titan_games'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-03 18:25:38
