-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: users_login
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blog_added`
--

DROP TABLE IF EXISTS `blog_added`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_added` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `note` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `content` longtext,
  `featuredImage` text,
  `socialLinks` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_added`
--

LOCK TABLES `blog_added` WRITE;
/*!40000 ALTER TABLE `blog_added` DISABLE KEYS */;
INSERT INTO `blog_added` VALUES (2,'React.js','React documentation mentions Next.js among \"Recommended Toolchains\" advising it to developers when \"building a server-rendered website with Node.js\".[6] Where traditional React apps can only render their content in the client-side browser, Next.js extends this functionality to include applications rendered on the server-side.','technology','<div style=\"text-align: left;\"><b style=\"font-size: 16pt;\"><span style=\"color: rgb(32, 33, 34); font-family: sans-serif; font-size: 16px;\">Next.js is a&nbsp;</span><a href=\"https://en.wikipedia.org/wiki/React_(web_framework)\" class=\"mw-redirect\" title=\"React (web framework)\" style=\"text-decoration: none; color: rgb(51, 102, 204); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 2px; overflow-wrap: break-word; font-family: sans-serif; font-size: 16px;\">React</a><span style=\"color: rgb(32, 33, 34); font-family: sans-serif; font-size: 16px;\">&nbsp;framework that enables several extra features, including&nbsp;</span><a href=\"https://en.wikipedia.org/wiki/Server-side_rendering\" class=\"mw-redirect\" title=\"Server-side rendering\" style=\"text-decoration: none; color: rgb(51, 102, 204); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 2px; overflow-wrap: break-word; font-family: sans-serif; font-size: 16px;\">server-side rendering</a><span style=\"color: rgb(32, 33, 34); font-family: sans-serif; font-size: 16px;\">&nbsp;and&nbsp;</span><a href=\"https://en.wikipedia.org/wiki/Static_rendering\" class=\"mw-redirect\" title=\"Static rendering\" style=\"text-decoration: none; color: rgb(51, 102, 204); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 2px; overflow-wrap: break-word; font-family: sans-serif; font-size: 16px;\">static rendering</a><span style=\"color: rgb(32, 33, 34); font-family: sans-serif; font-size: 16px;\">.</span><sup id=\"cite_ref-compareStatic_9-0\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; text-wrap-mode: nowrap; font-size: 12.8px; color: rgb(32, 33, 34); font-family: sans-serif;\"><a href=\"https://en.wikipedia.org/wiki/Next.js#cite_note-compareStatic-9\" style=\"text-decoration: none; color: rgb(51, 102, 204); background: none; border-radius: 2px; overflow-wrap: break-word;\"><span class=\"cite-bracket\" style=\"pointer-events: none;\">[</span>9<span class=\"cite-bracket\" style=\"pointer-events: none;\">]</span></a></sup><span style=\"color: rgb(32, 33, 34); font-family: sans-serif; font-size: 16px;\">&nbsp;React is a&nbsp;</span><a href=\"https://en.wikipedia.org/wiki/JavaScript_library\" title=\"JavaScript library\" style=\"text-decoration: none; color: rgb(51, 102, 204); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 2px; overflow-wrap: break-word; font-family: sans-serif; font-size: 16px;\">JavaScript library</a><span style=\"color: rgb(32, 33, 34); font-family: sans-serif; font-size: 16px;\">&nbsp;that is traditionally used to build web applications rendered in the client\'s browser with JavaScript.</span><sup id=\"cite_ref-thakkar1_10-0\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; text-wrap-mode: nowrap; font-size: 12.8px; color: rgb(32, 33, 34); font-family: sans-serif;\"><a href=\"https://en.wikipedia.org/wiki/Next.js#cite_note-thakkar1-10\" style=\"text-decoration: none; color: rgb(51, 102, 204); background: none; border-radius: 2px; overflow-wrap: break-word;\"><span class=\"cite-bracket\" style=\"pointer-events: none;\">[</span>10<span class=\"cite-bracket\" style=\"pointer-events: none;\">]</span></a></sup><span style=\"color: rgb(32, 33, 34); font-family: sans-serif; font-size: 16px;\">&nbsp;Developers recognize several problems with this strategy however, such as not catering to users who do not have access to JavaScript or have disabled it, potential security issues, significantly extended page loading times, and harm to the site\'s overall&nbsp;</span><a href=\"https://en.wikipedia.org/wiki/Search_engine_optimization\" title=\"Search engine optimization\" style=\"text-decoration: none; color: rgb(51, 102, 204); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 2px; overflow-wrap: break-word; font-family: sans-serif; font-size: 16px;\">search engine optimization</a><span style=\"color: rgb(32, 33, 34); font-family: sans-serif; font-size: 16px;\">.</span><sup id=\"cite_ref-thakkar1_10-1\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; text-wrap-mode: nowrap; font-size: 12.8px; color: rgb(32, 33, 34); font-family: sans-serif;\"><a href=\"https://en.wikipedia.org/wiki/Next.js#cite_note-thakkar1-10\" style=\"text-decoration: none; color: rgb(51, 102, 204); background: none; border-radius: 2px; overflow-wrap: break-word;\"><span class=\"cite-bracket\" style=\"pointer-events: none;\">[</span>10<span class=\"cite-bracket\" style=\"pointer-events: none;\">]</span></a></sup><span style=\"color: rgb(32, 33, 34); font-family: sans-serif; font-size: 16px;\">&nbsp;Frameworks such as Next.js sidestep these problems by allowing some or all of the website to be rendered on the server-side before being sent to the client.</span><sup id=\"cite_ref-thakkar1_10-2\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; text-wrap-mode: nowrap; font-size: 12.8px; color: rgb(32, 33, 34); font-family: sans-serif;\"><a href=\"https://en.wikipedia.org/wiki/Next.js#cite_note-thakkar1-10\" style=\"text-decoration: none; color: rgb(51, 102, 204); background: none; border-radius: 2px; overflow-wrap: break-word;\"><span class=\"cite-bracket\" style=\"pointer-events: none;\">[</span>10<span class=\"cite-bracket\" style=\"pointer-events: none;\">]</span></a></sup><sup id=\"cite_ref-thakkar2_11-0\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; text-wrap-mode: nowrap; font-size: 12.8px; color: rgb(32, 33, 34); font-family: sans-serif;\"><a href=\"https://en.wikipedia.org/wiki/Next.js#cite_note-thakkar2-11\" style=\"text-decoration: none; color: rgb(51, 102, 204); background: none; border-radius: 2px; overflow-wrap: break-word;\"><span class=\"cite-bracket\" style=\"pointer-events: none;\">[</span>11<span class=\"cite-bracket\" style=\"pointer-events: none;\">]</span></a></sup><span style=\"color: rgb(32, 33, 34); font-family: sans-serif; font-size: 16px;\">&nbsp;Next.js is one of the most popular frameworks for React.</span><sup id=\"cite_ref-12\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; text-wrap-mode: nowrap; font-size: 12.8px; color: rgb(32, 33, 34); font-family: sans-serif;\"><a href=\"https://en.wikipedia.org/wiki/Next.js#cite_note-12\" style=\"text-decoration: none; color: rgb(51, 102, 204); background: none; border-radius: 2px; overflow-wrap: break-word;\"><span class=\"cite-bracket\" style=\"pointer-events: none;\">[</span>12<span class=\"cite-bracket\" style=\"pointer-events: none;\">]</span></a></sup><span style=\"color: rgb(32, 33, 34); font-family: sans-serif; font-size: 16px;\">&nbsp;It is one of several recommended \"toolchains\" available when starting a new app, all of which provide a layer of abstraction to aid in common tasks.</span><sup id=\"cite_ref-SmashingStyle_13-0\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; text-wrap-mode: nowrap; font-size: 12.8px; color: rgb(32, 33, 34); font-family: sans-serif;\"><a href=\"https://en.wikipedia.org/wiki/Next.js#cite_note-SmashingStyle-13\" style=\"text-decoration: none; color: rgb(51, 102, 204); background: none; border-radius: 2px; overflow-wrap: break-word;\"><span class=\"cite-bracket\" style=\"pointer-events: none;\">[</span>13<span class=\"cite-bracket\" style=\"pointer-events: none;\">]</span></a></sup><span style=\"color: rgb(32, 33, 34); font-family: sans-serif; font-size: 16px;\">&nbsp;Next.js requires&nbsp;</span><a href=\"https://en.wikipedia.org/wiki/Node.js\" title=\"Node.js\" style=\"text-decoration: none; color: rgb(51, 102, 204); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 2px; overflow-wrap: break-word; font-family: sans-serif; font-size: 16px;\">Node.js</a><span style=\"color: rgb(32, 33, 34); font-family: sans-serif; font-size: 16px;\">&nbsp;and can be initialized using&nbsp;</span><a href=\"https://en.wikipedia.org/wiki/Npm\" title=\"Npm\" style=\"text-decoration: none; color: rgb(51, 102, 204); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-radius: 2px; overflow-wrap: break-word; font-family: sans-serif; font-size: 16px;\">npm</a><span style=\"color: rgb(32, 33, 34); font-family: sans-serif; font-size: 16px;\">.</span></b></div>','https://i.ibb.co.com/BVNyD51g/chairman-birthday.png','{\"twitter\": \"https://abu-yeahia-portfolio.netlify.app/\", \"facebook\": \"https://www.facebook.com/muhibbullah.shiddique\", \"linkedin\": \"https://www.facebook.com/muhibbullah.shiddique\", \"instagram\": \"https://www.facebook.com/muhibbullah.shiddique\"}','2025-04-22 12:02:40'),(4,'madness','qwd','technology','wefweqf','https://i.ibb.co/MkhkFR8t/sourcesss.png','{\"twitter\": \"https://www.facebook.com/muhibbullah.shiddique\", \"facebook\": \"https://www.facebook.com/muhibbullah.shiddique\", \"linkedin\": \"https://www.facebook.com/muhibbullah.shiddique\", \"instagram\": \"https://www.facebook.com/muhibbullah.shiddique\"}','2025-04-22 12:21:32'),(6,'next.jss','Webby (disambiguation)\nWWW (disambiguation)\nAll pages with titles containing webs\nAll pages with titles containing web\nAll pages with titles beginning with web','technology','This page was last edited on 19 April 2025, at 06:10 (UTC).organization.ukiuyilkuiluil Creative Commons Attribution-ShareAlike 4.0 License; additional terms may apply. By using this site, you agree to the Terms of Use and Privacy Policy. Wikipedia® is a registered trademark of the Wikimedia Foundation, Inc., a non-profit ','https://i.ibb.co/5hw60vQ8/blogimg5.webp','{\"twitter\": \"facebook.com/muhibbullah.shiddique\", \"facebook\": \"facebook.com/muhibbullah.shiddique\", \"linkedin\": \"facebook.com/muhibbullah.shiddique\", \"instagram\": \"facebook.com/muhibbullah.shiddique\"}','2025-04-22 12:30:41'),(10,'React (software)','React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library[5][6] that aims to make building user interfaces based on components more \"seamless\".[5','technology','React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library[5][6] that aims to make building user interfaces based on components more \"seamless\".[5] It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.[7][8][9]React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js and Remix[a]. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.[11][12] A key advantage of React is that it only re-renders those parts of the page that have changed, avoiding unnecessary re-rendering of unchanged DOM elements.','https://i.ibb.co/Rp0B683d/cheaphost.png','{\"twitter\": \"https://www.facebook.com/muhibbullah.shiddique\", \"facebook\": \"https://www.facebook.com/muhibbullah.shiddique\", \"linkedin\": \"https://www.facebook.com/muhibbullah.shiddique\", \"instagram\": \"https://www.facebook.com/muhibbullah.shiddique\"}','2025-04-23 05:44:33'),(19,'The Love-Hate Relationship With Next.js','More and more developers and companies are questioning whether Next.js is really the best choice for their projects. Some are even ditching it altogether.','technology','Join one of the biggest communities for web developers! The Full Stack Forge covers everything from HTML to React, Node.js to Laravel — coding tips, performance hacks, interview prep, and more. Level up your full stack skills and stay ahead in web development!. Join one of the biggest communities for web developers! The Full Stack Forge covers everything from HTML to React, Node.js to Laravel — coding tips, performance hacks, interview prep, and more. Level up your full stack skills and stay ahead in web development!Join one of the biggest communities for web developers! The Full Stack Forge covers everything from HTML to React, Node.js to Laravel — coding tips, performance hacks, interview prep, and more. Level up your full stack skills and stay ahead in web development!','https://i.ibb.co/3y4SNV0G/1-J5c0z-QPCQn-Xqwdu1-6-Ztw.gif','{\"twitter\": \"https://www.facebook.com/muhibbullah.shiddique\", \"facebook\": \"https://www.facebook.com/muhibbullah.shiddique\", \"linkedin\": \"https://www.facebook.com/muhibbullah.shiddique\", \"instagram\": \"https://www.facebook.com/muhibbullah.shiddique\"}','2025-04-24 08:55:25'),(20,'Web','WEB, a literate programming system created by Donald Knuth\nGNOME Web, a Web browser\nWeb.com, a web-design company\nWebs (web hosting), a Web hosting and website building service\nWeb hosting service','health','Web (comics), an MLJ comicbook character (created 1942)Web (novel), by John Wyndham (1979)The Web (series), a science fiction series (1997–1999)World English Bible, a public-domain Bible translation (2000)Charlotte\'s Web, a children\'s novel by E. B. White (1952)','https://i.ibb.co/3y4SNV0G/1-J5c0z-QPCQn-Xqwdu1-6-Ztw.gif','{\"twitter\": \"https://www.facebook.com/muhibbullah.shiddique\", \"facebook\": \"https://www.facebook.com/muhibbullah.shiddique\", \"linkedin\": \"https://www.facebook.com/muhibbullah.shiddique\", \"instagram\": \"https://www.facebook.com/muhibbullah.shiddique\"}','2025-04-24 08:59:57'),(21,'Web','WEB, a literate programming system created by Donald Knuth\nGNOME Web, a Web browser\nWeb.com, a web-design company\nWebs (web hosting), a Web hosting and website building service\nWeb hosting service','health','Web (comics), an  novel by E. B. White (1952)','https://i.ibb.co/3y4SNV0G/1-J5c0z-QPCQn-Xqwdu1-6-Ztw.gif','{\"twitter\": \"https://www.facebook.com/muhibbullah.shiddique\", \"facebook\": \"https://www.facebook.com/muhibbullah.shiddique\", \"linkedin\": \"https://www.facebook.com/muhibbullah.shiddique\", \"instagram\": \"https://www.facebook.com/muhibbullah.shiddique\"}','2025-04-24 09:00:04');
/*!40000 ALTER TABLE `blog_added` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_title` varchar(255) DEFAULT NULL,
  `batch_number` varchar(50) DEFAULT NULL,
  `seats_left` varchar(50) DEFAULT NULL,
  `time_left` varchar(50) DEFAULT NULL,
  `star_rating` varchar(50) DEFAULT NULL,
  `course_cost` varchar(100) DEFAULT NULL,
  `course_outline_title` varchar(255) DEFAULT NULL,
  `course_outline_description` text,
  `uploaded_video` varchar(255) DEFAULT NULL,
  `instructor_image` varchar(255) DEFAULT NULL,
  `uploaded_gif` varchar(255) DEFAULT NULL,
  `Course_Benifits` varchar(255) DEFAULT NULL,
  `Course_Projects` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (6,'shofik','124','124214','2025-04-06T08:16','4','1234124','sdfvef','aefgerg','C:\\fakepath\\WhatsApp Video 2025-01-30 at 09.22.14_45d08fdc.mp4','https://i.ibb.co.com/1Y2DkF9w/Whats-App-Image-2025-04-07-at-14-22-59-e557ea7b.jpg','C:\\fakepath\\8i75.gif','[\"werg\"]','[\"erger\"]'),(14,'mal3','345243428798','23456232357656','2025-05-02T01:36','3','','tdhndftdndfbefr','dfhnjfghdgsbrgb','C:\\fakepath\\WhatsApp Video 2025-01-30 at 09.22.14_45d08fdc.mp4','https://i.ibb.co.com/1Y2DkF9w/Whats-App-Image-2025-04-07-at-14-22-59-e557ea7b.jpg','C:\\fakepath\\8i75.gif','[\"gfhntghmdfgbbg\"]','[\"rdetgdfggb\"]'),(15,'mal3','345243428798','23456232357656','2025-05-02T01:36','3','','tdhndftdndfbefr','dfhnjfghdgsbrgb','C:\\fakepath\\WhatsApp Video 2025-01-30 at 09.22.14_45d08fdc.mp4','https://i.ibb.co.com/1Y2DkF9w/Whats-App-Image-2025-04-07-at-14-22-59-e557ea7b.jpg','C:\\fakepath\\8i75.gif','[\"gfhntghmdfgbbg\"]','[\"rdetgdfggb\"]'),(16,'mal3','345243428798','23456232357656','2025-05-02T01:36','3','','tdhndftdndfbefr','dfhnjfghdgsbrgb','C:\\fakepath\\WhatsApp Video 2025-01-30 at 09.22.14_45d08fdc.mp4','https://i.ibb.co.com/1Y2DkF9w/Whats-App-Image-2025-04-07-at-14-22-59-e557ea7b.jpg','C:\\fakepath\\8i75.gif','[\"gfhntghmdfgbbg\"]','[\"rdetgdfggb\"]'),(17,'mal3','345243428798','23456232357656','2025-05-02T01:36','3','','tdhndftdndfbefr','dfhnjfghdgsbrgb','C:\\fakepath\\WhatsApp Video 2025-01-30 at 09.22.14_45d08fdc.mp4','https://i.ibb.co.com/1Y2DkF9w/Whats-App-Image-2025-04-07-at-14-22-59-e557ea7b.jpg','C:\\fakepath\\8i75.gif','[\"gfhntghmdfgbbg\"]','[\"rdetgdfggb\"]'),(20,'mal5','345243428798','23456232357656','2025-05-02T01:36','3','','tdhndftdndfbefr','dfhnjfghdgsbrgb','C:\\fakepath\\WhatsApp Video 2025-01-30 at 09.22.14_45d08fdc.mp4','https://i.ibb.co.com/1Y2DkF9w/Whats-App-Image-2025-04-07-at-14-22-59-e557ea7b.jpg','C:\\fakepath\\8i75.gif','[\"gfhntghmdfgbbg\"]','[\"rdetgdfggb\"]'),(21,'mal5','345243428798','23456232357656','2025-05-02T01:36','3','','tdhndftdndfbefr','dfhnjfghdgsbrgb','C:\\fakepath\\WhatsApp Video 2025-01-30 at 09.22.14_45d08fdc.mp4','https://i.ibb.co.com/1Y2DkF9w/Whats-App-Image-2025-04-07-at-14-22-59-e557ea7b.jpg','C:\\fakepath\\8i75.gif','[\"gfhntghmdfgbbg\"]','[\"rdetgdfggb\"]'),(31,'dfghgd','235','235','2025-04-12T18:34','5','25','sefgh','srgh','','https://i.ibb.co/xq7MPfLG/8i75.gif','https://i.ibb.co/xq7MPfLG/8i75.gif','[\"dgh\"]','[\"dgh\"]'),(37,'Web Developments','01','20','2025-04-01T01:46','5','12000','Web why need to learn!','Welcome to WebTech-Best Website Design & Development Company in Bangladesh with a team of 50+ dedicated experts! We are providing top-notch solutions, from domain registration and hosting to custom websites, eCommerce, and software development. We empower businesses with comprehensive digital marketing, graphic design, and advanced SEO/SEM services that give you a distinct competitive edge online. Let WebTech be your partner in building a solid and successful digital footprint. Know more about us.','C:\\fakepath\\Sticker (1).mp4','https://i.ibb.co/Ldf7zhkW/ju.png','','[\"1) shall learn own skill\",\"2) shall learn web developments\",\"3) shall develop job placements\"]','[\"https://abu-yeahia-portfolio.netlify.app/\",\"https://abu-yeahia-portfolio.netlify.app/\"]'),(38,'Graphics Design ','02','123','2025-04-09T02:01','5','12004','1) well done to do this','1) well done to do this','C:\\fakepath\\video1258205884.mp4','https://i.ibb.co/N6D7rWt2/1-J5c0z-QPCQn-Xqwdu1-6-Ztw.gif','https://i.ibb.co/N6D7rWt2/1-J5c0z-QPCQn-Xqwdu1-6-Ztw.gif','[\"1) well done to do this\",\"2) well done to do this\",\"3) well done to do this\"]','[\"https://abu-yeahia-portfolio.netlify.app/\",\"https://abu-yeahia-portfolio.netlify.app/\",\"https://abu-yeahia-portfolio.netlify.app/\"]'),(39,'Digital Marketing','12','26','2025-04-24T05:26','5','134','1) this is best','1) this is best','C:\\fakepath\\Sticker (1).mp4','https://i.ibb.co/Nd4V1sXW/1745654165612.gif','https://i.ibb.co/Nd4V1sXW/1745654165612.gif','[\"1) this is best\",\"2) this is best\",\"3) this is best\"]','[\"1) this is best\",\"2) this is best\",\"3) this is best\"]'),(40,'dfv','13','1234','2025-05-10T04:17','5','23532','ertgerg','eherh','C:\\fakepath\\Sticker (1).mp4','https://i.ibb.co/KzLWSrCq/rg.webp','https://i.ibb.co/S4XDRBZ2/1-J5c0z-QPCQn-Xqwdu1-6-Ztw.gif','[\"1) am  2) efui 3) ein\"]','[\"1) am \"]');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `edit_profile`
--

DROP TABLE IF EXISTS `edit_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `edit_profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `maritalStatus` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text,
  `permanentAddress` text,
  `facebook` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `aboutMyself` text,
  `uploadedImage` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edit_profile`
--

LOCK TABLES `edit_profile` WRITE;
/*!40000 ALTER TABLE `edit_profile` DISABLE KEYS */;
INSERT INTO `edit_profile` VALUES (41,'sohag','married','sohag234@gmail.com','01742540234','Hose no: 27/1, Vill: Goalkhali navy colony road GPO: 9000, Khalishpur Khulna','goalkhali','https://www.facebook.com/tinkuboy.galib/','https://www.linkedin.com/in/abu-yeahia-b290931b9/','erg','https://i.ibb.co/x8Sgj2Nv/baijid.webp'),(42,'Midul Islam','married','midul123@gmail.com','01742540234','Hose no: 27/1, Vill: Goalkhali navy colony road GPO: 9000, Khalishpur Khulna','goalkhali','https://www.facebook.com/tinkuboy.galib/','https://www.linkedin.com/in/abu-yeahia-b290931b9/','I hate ','https://i.ibb.co/vx8hS1vW/midul-2.png'),(43,'siam','unmarried','siam123@gmail.com','01742540234','Hose no: 27/1, Vill: Goalkhali navy colony road GPO: 9000, Khalishpur Khulna','goalkhali','https://www.facebook.com/tinkuboy.galib/','https://www.linkedin.com/in/abu-yeahia-b290931b9/','Welcome to WebTech-Best Website Design & Development Company in Bangladesh with a team of 50+ dedicated experts! We are providing top-notch solutions, from domain registration and hosting to custom websites, eCommerce, and software development. We empower businesses with comprehensive digital marketing, graphic design, and advanced SEO/SEM','https://i.ibb.co/Rpm1j6xs/siam-vai.jpg'),(44,'Muhib','married','Muhib123@gmail.com','01742540234','Hose no: 27/1, Vill: Goalkhali navy colony road GPO: 9000, Khalishpur Khulna','goalkhali','https://www.facebook.com/tinkuboy.galib/','https://www.linkedin.com/in/abu-yeahia-b290931b9/','we ','https://i.ibb.co/DH687vs0/intern-4.jpg'),(45,'Rafiq','married','rafiq1231@gmail.com','01742540234','Hose no: 27/1, Vill: Goalkhali navy colony road GPO: 9000, Khalishpur Khulna','goalkhali','https://www.facebook.com/tinkuboy.galib/','https://www.linkedin.com/in/abu-yeahia-b290931b9/','we are fab','https://i.ibb.co/x8Sgj2Nv/baijid.webp'),(46,'marks','married','marks123@gmail.com','01742540234','Hose no: 27/1, Vill: Goalkhali navy colony road GPO: 9000, Khalishpur Khulna','goalkhali','https://www.facebook.com/tinkuboy.galib/','https://www.linkedin.com/in/abu-yeahia-b290931b9/','egthn','https://i.ibb.co/WWSCR4yW/1746287317826.jpg'),(47,'mailka','married','ml123@gmail.com','01742540234','Hose no: 27/1, Vill: Goalkhali navy colony road GPO: 9000, Khalishpur Khulna','goalkhali','https://www.facebook.com/tinkuboy.galib/','https://www.linkedin.com/in/abu-yeahia-b290931b9/','uol;','https://i.ibb.co/RTD7VNwr/intern-10.png');
/*!40000 ALTER TABLE `edit_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_gallery`
--

DROP TABLE IF EXISTS `event_gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_gallery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gallery_image` varchar(255) NOT NULL,
  `event_text` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_gallery`
--

LOCK TABLES `event_gallery` WRITE;
/*!40000 ALTER TABLE `event_gallery` DISABLE KEYS */;
INSERT INTO `event_gallery` VALUES (4,'https://i.ibb.co/LDb5xrtc/enployee-functions.png','','2025-04-10 04:14:34'),(5,'https://i.ibb.co/ZzhSKc83/Whats-App-Image-2025-02-28-at-12-16-54-a5e1d94b.jpg','','2025-04-10 04:14:36'),(6,'https://i.ibb.co/qLpqCHv8/Whats-App-Image-2025-04-07-at-14-22-59-e557ea7b.jpg','','2025-04-12 00:21:23'),(7,'https://i.ibb.co/pvZjdPD9/Whats-App-Image-2025-01-01-at-17-20-37-cb29c41c.jpg','','2025-04-12 01:58:39'),(8,'https://i.ibb.co/dJ4mt9XC/wallpaperflare-com-wallpaper-1.jpg','','2025-04-12 02:07:02'),(9,'https://i.ibb.co/qLpqCHv8/Whats-App-Image-2025-04-07-at-14-22-59-e557ea7b.jpg','best moment','2025-04-12 03:07:40'),(10,'https://i.ibb.co/qLpqCHv8/Whats-App-Image-2025-04-07-at-14-22-59-e557ea7b.jpg','best moment yap','2025-04-12 03:10:21'),(11,'https://i.ibb.co/TqdSWn8v/normal-day-collieague.png','best moment again','2025-04-12 03:10:24'),(12,'https://i.ibb.co/6qDqhHc/welcome-to-careerbuilder-2.jpg','great','2025-04-12 04:32:13'),(13,'https://i.ibb.co/RwM0Ybg/osbg.png','madness yes it is','2025-04-12 04:36:49'),(15,'https://i.ibb.co/Z6QM0H6b/funtions-2.png','nice','2025-04-12 05:16:22'),(16,'https://i.ibb.co/qLpqCHv8/Whats-App-Image-2025-04-07-at-14-22-59-e557ea7b.jpg','fgn ','2025-04-12 05:20:11'),(17,'https://i.ibb.co/ks27VZCg/gen-z-t-shirt-brand-new-design-premium-t-shirt-for-generation-z-code-gz02-2024-08-12-03-34-08-3603.png','','2025-04-12 05:24:57'),(20,'https://i.ibb.co/spf60vgR/bokchoe.png','vai bondhu','2025-04-12 05:26:38'),(21,'https://i.ibb.co/Y7GrBbXM/wallpaperflare-com-wallpaper.jpg','it was best moments and i am glad to see you','2025-04-12 05:30:37'),(22,'https://i.ibb.co/zT633qp4/clotex-beautiful-designed-cotton-canvas-tote-bag-with-zipper-c-t-05-2024-09-02-06-09-31-5710.jpg','bagss vai','2025-04-12 05:30:39'),(23,'https://i.ibb.co/N2FfGmMn/funtions.png','tagg team!','2025-04-12 05:50:32'),(24,'https://i.ibb.co/dJ4mt9XC/wallpaperflare-com-wallpaper-1.jpg','nice','2025-04-12 06:08:04'),(27,'https://i.ibb.co/qLpqCHv8/Whats-App-Image-2025-04-07-at-14-22-59-e557ea7b.jpg','','2025-04-12 06:17:26'),(32,'https://i.ibb.co/MxNMnsN9/programming-hero.png','my certificate abu yeahia','2025-04-13 01:53:45'),(33,'https://i.ibb.co/KjdqTSTS/1-J5c0z-QPCQn-Xqwdu1-6-Ztw.gif','hi','2025-04-26 05:26:32'),(34,'https://i.ibb.co/rGTVVSGJ/sdfgikh.png','','2025-04-26 05:26:33'),(35,'https://i.ibb.co/fY3q57Tv/download.png','','2025-04-26 05:26:34'),(36,'https://i.ibb.co/RTcm6Z8f/sourcesss.png','','2025-04-26 05:26:35');
/*!40000 ALTER TABLE `event_gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq_add_data`
--

DROP TABLE IF EXISTS `faq_add_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq_add_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `sub_title` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq_add_data`
--

LOCK TABLES `faq_add_data` WRITE;
/*!40000 ALTER TABLE `faq_add_data` DISABLE KEYS */;
INSERT INTO `faq_add_data` VALUES (1,'Galibs','sdf','sdf'),(3,'dgh','dsgh','sdght'),(4,'gth','dsgh','dghs'),(8,'sfg','rgh','rgh'),(9,'reyu','eruy','eryu'),(11,'Abu Yeahia Galib','Abu Yeahia Galib','egrt  Abu Yeahia Galib'),(12,'masum','erg','ewtg'),(13,'sarogaci','dfghwef','dfghwf'),(16,'ergt','erg','erg'),(17,'erg','efg','wettg'),(18,'erg','erg','ewrt'),(19,'madness','sdf','sdfg'),(20,'internship','ety','rth'),(23,'internship two','two','dfgh'),(24,'internship pdf','erwger','erge');
/*!40000 ALTER TABLE `faq_add_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `university_data`
--

DROP TABLE IF EXISTS `university_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `university_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `university_name` varchar(255) DEFAULT NULL,
  `University_logo` varchar(500) DEFAULT NULL,
  `undergraduate_course` text,
  `undergraduate_credits` int DEFAULT NULL,
  `postgraduate_course` text,
  `postgraduate_credits` int DEFAULT NULL,
  `university_cost` decimal(10,2) DEFAULT NULL,
  `diploma_course_name` text,
  `diploma_course_cost` decimal(10,2) DEFAULT NULL,
  `university_link` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university_data`
--

LOCK TABLES `university_data` WRITE;
/*!40000 ALTER TABLE `university_data` DISABLE KEYS */;
INSERT INTO `university_data` VALUES (2,'galib','https://i.ibb.co/svqZKtbt/cheaphost.png','hkl',356,'rtyh',345,3456.00,'rthr',34563.00,'https://abu-yeahia-portfolio.netlify.app/','2025-04-19 09:38:04'),(3,'xfgh','https://i.ibb.co/vCBtTPc4/sourcesss.png','fgh',2345,'euirgh',14,114.00,'fesg',234.00,'https://abu-yeahia-portfolio.netlify.app/','2025-04-19 10:02:15'),(5,'Galibss','https://i.ibb.co/Vck0zgPt/md-with-family-only.png','fgh',234523,'euirgh',14,114.00,'fesg',234.00,'https://abu-yeahia-portfolio.netlify.app/','2025-04-19 10:02:59'),(6,'galib','https://i.ibb.co/N6D7rWt2/1-J5c0z-QPCQn-Xqwdu1-6-Ztw.gif','fgh',2345,'euirgh',14,114.00,'fesg',234.00,'https://abu-yeahia-portfolio.netlify.app/','2025-04-19 10:04:18'),(9,'adasd','https://i.ibb.co/YTJxWyLL/download.png','sdf',13,'wef',134,3441.00,'wgfw',131.00,'https://abu-yeahia-portfolio.netlify.app/','2025-04-19 10:08:23'),(11,'ami galib','https://i.ibb.co/N6D7rWt2/1-J5c0z-QPCQn-Xqwdu1-6-Ztw.gif','rth',345,'ewgt',23452,252.00,'rgh',25.00,'https://abu-yeahia-portfolio.netlify.app/','2025-04-19 10:10:28'),(13,'saifullah siddique maltus','https://i.ibb.co/7JnDrY48/rg.webp','good',345134,'he is honest',2345224,252.00,'madness',25.00,'https://abu-yeahia-portfolio.netlify.app/','2025-04-19 10:15:49'),(20,'dfg','https://i.ibb.co/HLGzchcZ/barzak.png','gthj',356,'rgh',365,256.00,'rgh',346.00,'https://careers-builder.vercel.app/','2025-04-19 11:57:13'),(21,'North Western University','https://i.ibb.co/nVxthff/venture-capital.png','rghr',3445,'rgh',35,23532.00,'bhrgh',34532.00,'https://careers-builder.vercel.app/','2025-04-19 12:03:16'),(23,'rtgh','https://i.ibb.co/vCBtTPc4/sourcesss.png','ukuk',3546,'rghry',356,354634.00,'rgthrty',456.00,'https://abu-yeahia-portfolio.netlify.app/','2025-04-19 12:14:51'),(24,'rtgh','https://i.ibb.co/v6tMJWLf/students-focus-on-class.png','ukuk',3546,'rghry',356,354634.00,'rgthrty',456.00,'https://abu-yeahia-portfolio.netlify.app/','2025-04-19 12:16:20'),(31,'dghf','https://i.ibb.co/yF4Hrrnf/rg.webp','fghf',134,'efrg',34,234.00,'efg',34.00,'https://abu-yeahia-portfolio.netlify.app/','2025-04-21 05:45:49'),(33,'sg','https://i.ibb.co/d0h4hkC0/cheaphost.png','sdry',345,'det',345,345.00,'edgt',35.00,'https://abu-yeahia-portfolio.netlify.app/','2025-04-21 08:14:07'),(35,'Galibss','https://i.ibb.co/fdPPpH4m/dofnf.png','gjhhfg',2423,'dgert',34534,354.00,'ergh',34534.00,'https://abu-yeahia-portfolio.netlify.app/','2025-04-21 08:20:58'),(36,'North Western University','https://i.ibb.co/Zpr4Njkv/DALL-E-2025-01-05-17-45-40-A-crest-design-with-a-professional-and-elegant-style-featuring-the-text-H.webp','Computer science and technology (CSE)',165,'Masters in science (MSC)',65,340578.00,'Tripoli',235425.00,'https://nwu.ac.bd/','2025-04-28 08:07:34');
/*!40000 ALTER TABLE `university_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_managements`
--

DROP TABLE IF EXISTS `user_managements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_managements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `photo` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_managements`
--

LOCK TABLES `user_managements` WRITE;
/*!40000 ALTER TABLE `user_managements` DISABLE KEYS */;
INSERT INTO `user_managements` VALUES (4,'galib','galib123@gmail.com','$2b$10$P87pWa.D2dmYXo6y.1MWweD42kHm.k2Y9ksoCc5.k5SMuHO3XBOua','2025-01-21 07:51:33','https://i.postimg.cc/NMRDFQsg/baijid.png','Admin'),(5,'Abu Yeahia','abu24@gmail.com','$2b$10$9OxQVJyQZge/aX9tfJbYJeokxFWcvIUUWPuCIjuBVQtLoOEAOLnJS','2025-01-21 08:33:06','https://i.postimg.cc/c4ng6pKf/gilbert.png',''),(9,'Abdul Alim','alim24@gmail.com','$2b$10$wCuaIqojdvokZvMhK7pukuRKzpIIDTo9F80Yy85UiBJu4C8v8Pe9G','2025-01-25 12:05:42','https://i.postimg.cc/wxPRqqB6/roks.png',''),(11,'masuma','masuma24@gmail.com','$2b$10$KL6mAuM8FX27/YXevU4ZfO5q3ouEKSViqdvLpe1i7SmgQq0Yk8YG2','2025-02-05 13:10:25','https://i.postimg.cc/c4ng6pKf/gilbert.png','Admin'),(13,'Galib','abugalib23@gmail.com','$2b$10$4zCSaY6p/kJ7DrA8FatMhOkKXyQ05Z7PBBgzlKab1dEEI9vwPoWZm','2025-02-06 06:15:43','https://i.postimg.cc/NjW3kbWJ/mri.png','Admin'),(15,'rokibul islam rokib','rokib1234@gmail.com','$2b$10$gcBNWn8b6MpPBlWvURBAt.3Q9311d/jRcjKOIYPElE3hrzrXUHJNi','2025-02-09 13:20:12','https://i.postimg.cc/NjW3kbWJ/mri.png',''),(16,'shohag','shohag24@gmail.com','$2b$10$L.lE7owyO1L7UtljU7wFkO/Ts2KLuttOhfu4kpz91VEIJPJzAXah2','2025-02-10 06:14:48','https://i.postimg.cc/NjW3kbWJ/mri.png','Admin'),(17,'Afnan','afnan24@gmail.com','$2b$10$f81E9HsuO5pf1k3XtCad../Wt5sLqTh5O4KPtSmLG05aT1GfVCVte','2025-02-12 07:45:22','https://i.postimg.cc/NjW3kbWJ/mri.png','Admin'),(18,'Himel Uddin','himel@gmail.com','$2b$10$YV08WkjOxriJ6PJc22GZJezwfcSlftd2QAWPjLud6fB3OVvd2udi6','2025-02-12 08:22:14',NULL,NULL),(19,'mehdi','mehdi23@gmail.com','$2b$10$5OiZZO2S/sTMSte0FW3VBOZOLXxZnH9jhS.uSKzwAoEvdFSi.Zsg2','2025-02-12 12:06:07','https://i.postimg.cc/NjW3kbWJ/mri.png','Admin'),(20,'Rfique','rafique23@gmail.com','$2b$10$3LX8pgIqu1bcdll0/7Uhxe0t.Cxi47wxjgl0aA6wJ5lS9kNhoq2zy','2025-02-15 05:26:20',NULL,NULL),(21,'madam','md24@gmail.com','$2b$10$QJESlE5mPSwUFbwoLddPn.I0vJIT7y7QylMkN5fu8FqTql7g0cpZi','2025-04-06 08:58:40',NULL,NULL),(22,'serg','galib2455@gmail.com','$2b$10$88TQZj4fuwJNvxsGyX0NJe3fS2GJqcG5ovQ4iUlVTPNrXsDFNUAT2','2025-04-20 04:31:28',NULL,NULL),(23,'malabus','malabus@gmail.com','$2b$10$NtlJw.HrQCk6gohOAs.YTumlSMJynRGg.th.NJuQIjDusmA4YcC2G','2025-04-22 09:00:57',NULL,NULL),(24,'careerbuilderwrfrf','galib2467@gmail.com','$2b$10$P/1vl6aCebTOKpLP8M9DYeMfokZqgX5k5.gqG9SlnD1bAVD3YHukm','2025-04-27 05:16:50',NULL,NULL),(25,'yusuf','yusuf234@gmail.com','$2b$10$p0zs6g.wu8J6LyiELxh2E.i.fv9jnlxEMfIPD1Q5htGMhc5WbfNjC','2025-05-07 07:13:26',NULL,NULL),(26,'Mokbul Alom','mokbul123@gmail.com','$2b$10$n8xIrGarH/X5s8qzoSUdi.nYJZJZCS7JqTrvddFrjrV39a2zxosnO','2025-05-08 12:43:25',NULL,NULL),(27,'Rahim','rahim123@gmail.com','$2b$10$cqNJmdvFvTU98Lza/TeH1e/G8mg5IMWbOsadYceS16GLYuPpb6IHG','2025-05-10 06:13:58',NULL,NULL),(28,'ASHMIN','ashmin123@gmail.com','$2b$10$zOMkSZU/qMU.WhbVVeNTweDl.81Y/EmL5s9TaXdYxRl.13CH8VNeW','2025-05-10 06:57:52',NULL,NULL),(29,'Alamin','alamin123@gmail.com','$2b$10$HbhDwDF8mlNfbc/n4KFZ6uhhdOKMSXWC/dvZJ5cVl6i8HHGl64Kr6','2025-05-10 07:32:17',NULL,NULL),(30,'baliush','baliush12@gmail.com','$2b$10$7qvGWOt8FB3K.NkQT4jTK.7yePyEeImPFS3UdsgKVgZeJ0kI1o5RC','2025-05-10 07:44:33',NULL,NULL),(31,'madness','mades123@gmail.com','$2b$10$cNMIyXiYGjDhBpqKt6OCb.5mnzRkHb8gF49thLmBmM77I/RnGyUCi','2025-05-10 07:59:20',NULL,NULL),(32,'mother','mohal123@gmail.com','$2b$10$lAEvDaQMvVw80N0N86roluiMgPDBEJEuguKPLqvxNDsd2dl892jJi','2025-05-10 12:11:58',NULL,NULL),(33,'Karim','karim123@gmail.com','$2b$10$5siM3ehQhNFweYT1zdYzuebUOx0eOvzToLzy8s7OvsmZdEZqWZPpa','2025-05-10 12:20:35',NULL,NULL),(34,'matari','matari123@gmail.com','$2b$10$XDybocTJj5w2P8HMUjs91un0PJCLsGNsjEkLRv3OtoFaglyvlIYsO','2025-05-10 13:28:25',NULL,NULL),(35,'sohag','sohag234@gmail.com','$2b$10$XI.BK3WNXQTDoTP9kaQbA.5YaHmN9YP0z4xZxrvMQiqFBbeAz.rpG','2025-05-12 05:02:40',NULL,NULL),(36,'Midul Islam','midul123@gmail.com','$2b$10$DDowL./duKlCbV6wVCH2Pec5o4mwZtxLV0hnmbVJ4.wDsiOEVjtVi','2025-05-12 06:39:31',NULL,NULL),(37,'Siam','siam123@gmail.com','$2b$10$WpGNh5ZZuFMJ1BMDCa2Qh.SRDEG5lA9DqLOV36tviyJyS0463qjyW','2025-05-12 07:00:54',NULL,NULL),(38,'Muhib','Muhib123@gmail.com','$2b$10$XclNPDHeCNesqS4L.UFQNe8EBUMdFjmQUaKY2dZaJmsteUX/AWEzW','2025-05-12 07:15:12',NULL,NULL),(39,'Rafik','rafiq1231@gmail.com','$2b$10$49c84zYNm3sRo426FUt.W.1EskTNG/TBg9boKTsbTHdoXyFTQsYCa','2025-05-12 07:44:54',NULL,NULL),(40,'mark','marks123@gmail.com','$2b$10$C7pBqK0m1Ol2ldwP5G0uBOlpLlH.r.IMO8l8h.Umbl52ilG.ego6e','2025-05-12 09:10:42',NULL,NULL),(41,'mailkaaa','ml123@gmail.com','$2b$10$evwTTbRACHyOFuquv80omO7SiImEXIy5ELVGirTca.Czx.9YkaGAG','2025-05-12 09:19:58',NULL,NULL);
/*!40000 ALTER TABLE `user_managements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'users_login'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-12 15:46:00
