-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: notes
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `allnotes`
--

DROP TABLE IF EXISTS `allnotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allnotes` (
  `id` varchar(50) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `topic` varchar(100) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allnotes`
--

LOCK TABLES `allnotes` WRITE;
/*!40000 ALTER TABLE `allnotes` DISABLE KEYS */;
INSERT INTO `allnotes` VALUES ('0b60ebe2-9b5b-41cf-82bf-17c5be7d8476','vishu','  java coding  ','  I want to learn about some java concept to make reliable software in various field. is that okey\r\n '),('1977c1ac-4ee4-4f2c-9f40-13a8a2e0a5d9','vishu',' Interview ',' Interview based on React and nodejs'),('45ca440f-e641-4d55-a98e-b403cde2f9aa','vishu','cyber security','i want to learn new things'),('5de6d18d-811e-46ad-8650-1f337c280a69','vishu','cyber security','i want to learn new things'),('6ab13751-840c-4b40-afc8-228001a23085','vishu','Interview Prep','I have to prepare for an upcoming interview.'),('dad4e31e-5d27-498f-927c-4081a02d70a9','kitty',' Stocks',' I have to invest in stock to gain more money than avg people in the world.\r\n'),('eb6869f7-edb8-4adf-ba40-fc927356a436','vishal',' web devlopment.',' I have to apply some intership for the role of web dev.');
/*!40000 ALTER TABLE `allnotes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-16 10:34:32
