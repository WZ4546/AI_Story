-- MySQL dump 10.13  Distrib 9.0.1, for macos14.4 (x86_64)
--
-- Host: localhost    Database: db5619
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `FKpfk8djhv5natgshmxiav6xkpu` (`user_id`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKpfk8djhv5natgshmxiav6xkpu` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category_story`
--

DROP TABLE IF EXISTS `category_story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_story` (
  `category_id` int NOT NULL,
  `story_id` int NOT NULL,
  PRIMARY KEY (`category_id`,`story_id`),
  KEY `FK5piaux32qjq460q4li9a7k5ug` (`story_id`),
  CONSTRAINT `category_story_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `category_story_ibfk_2` FOREIGN KEY (`story_id`) REFERENCES `Story` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK5piaux32qjq460q4li9a7k5ug` FOREIGN KEY (`story_id`) REFERENCES `story` (`id`),
  CONSTRAINT `FKrw67vh3rwm04yhnyjeeiy1stf` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category_user`
--

DROP TABLE IF EXISTS `category_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_user` (
  `category_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`category_id`,`user_id`),
  KEY `FKstpchwxpk402oqhb0h4hmjr4m` (`user_id`),
  CONSTRAINT `category_user_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `category_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKj0b61qjipt755ertgxu5ie0is` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKstpchwxpk402oqhb0h4hmjr4m` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `character`
--

DROP TABLE IF EXISTS `character`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `character` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int DEFAULT NULL,
  `character_code` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `tags` text,
  `profile_image` longtext,
  `appearance` text,
  `background` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `published_at` timestamp NULL DEFAULT NULL,
  `is_published` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `character_code` (`character_code`),
  UNIQUE KEY `UKijj86mpjbto29y69dyy1hskj2` (`character_code`),
  KEY `FKogjivxus6n114xkx0k7p3kbkn` (`owner_id`),
  CONSTRAINT `character_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `User` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FKogjivxus6n114xkx0k7p3kbkn` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `character_story`
--

DROP TABLE IF EXISTS `character_story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `character_story` (
  `character_id` int NOT NULL,
  `story_id` int NOT NULL,
  PRIMARY KEY (`character_id`,`story_id`),
  KEY `FKt0uawl9sf98qdcaputx4q8148` (`story_id`),
  CONSTRAINT `character_story_ibfk_1` FOREIGN KEY (`character_id`) REFERENCES `character` (`id`) ON DELETE CASCADE,
  CONSTRAINT `character_story_ibfk_2` FOREIGN KEY (`story_id`) REFERENCES `Story` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKfcjwnht5xbmb8jf4ru9p6fhu1` FOREIGN KEY (`character_id`) REFERENCES `character` (`id`),
  CONSTRAINT `FKt0uawl9sf98qdcaputx4q8148` FOREIGN KEY (`story_id`) REFERENCES `story` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `character_tag`
--

DROP TABLE IF EXISTS `character_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `character_tag` (
  `character_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`character_id`,`tag_id`),
  KEY `FKkhj4h4bfve0y7pdip3wpkt6gm` (`tag_id`),
  CONSTRAINT `character_tag_ibfk_1` FOREIGN KEY (`character_id`) REFERENCES `character` (`id`) ON DELETE CASCADE,
  CONSTRAINT `character_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `Tag` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKkhj4h4bfve0y7pdip3wpkt6gm` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`),
  CONSTRAINT `FKnkjcpkqgugyvgbyk55k4bds42` FOREIGN KEY (`character_id`) REFERENCES `character` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `user_id` int NOT NULL,
  `story_id` int NOT NULL,
  `rating` int DEFAULT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`story_id`),
  KEY `FKeijsbgrrrd9vc9n5kmign7n4q` (`story_id`),
  CONSTRAINT `FKeijsbgrrrd9vc9n5kmign7n4q` FOREIGN KEY (`story_id`) REFERENCES `story` (`id`),
  CONSTRAINT `FKiyf57dy48lyiftdrf7y87rnxi` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`story_id`) REFERENCES `Story` (`id`) ON DELETE CASCADE,
  CONSTRAINT `review_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Story`
--

DROP TABLE IF EXISTS `Story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Story` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `thema` longtext,
  `background_image` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `published_at` timestamp NULL DEFAULT NULL,
  `is_published` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `story_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `User` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `story_tag`
--

DROP TABLE IF EXISTS `story_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `story_tag` (
  `story_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`story_id`,`tag_id`),
  KEY `FKftpqay38ecr3xdca2t0o7f67d` (`tag_id`),
  CONSTRAINT `FKftpqay38ecr3xdca2t0o7f67d` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`),
  CONSTRAINT `FKl00g2i499fkmbau4tt69ug7s3` FOREIGN KEY (`story_id`) REFERENCES `story` (`id`),
  CONSTRAINT `story_tag_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `Story` (`id`) ON DELETE CASCADE,
  CONSTRAINT `story_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `Tag` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `UK1wdpsed5kna2y38hnbgrnhi5b` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_character`
--

DROP TABLE IF EXISTS `user_character`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_character` (
  `user_id` int NOT NULL,
  `character_id` int NOT NULL,
  `canEdit` tinyint(1) DEFAULT '0',
  `can_edit` bit(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`character_id`),
  KEY `user_character_ibfk_2` (`character_id`),
  CONSTRAINT `FKj1uovjddfp7t5yy5i0uk6pn7s` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKkhx681mmnn39cv8f3v12d92ug` FOREIGN KEY (`character_id`) REFERENCES `character` (`id`),
  CONSTRAINT `user_character_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_character_ibfk_2` FOREIGN KEY (`character_id`) REFERENCES `character` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_story`
--

DROP TABLE IF EXISTS `user_story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_story` (
  `user_id` int NOT NULL,
  `story_id` int NOT NULL,
  `canEdit` tinyint(1) DEFAULT '0',
  `can_edit` bit(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`story_id`),
  KEY `FKin97mkqh2hwkr8nxjwl3jbg49` (`story_id`), 
  CONSTRAINT `FKeihb5i43ycvk2c3qb2svqsvsb` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKin97mkqh2hwkr8nxjwl3jbg49` FOREIGN KEY (`story_id`) REFERENCES `story` (`id`),
  CONSTRAINT `user_story_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_story_ibfk_2` FOREIGN KEY (`story_id`) REFERENCES `Story` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-26 20:25:19
