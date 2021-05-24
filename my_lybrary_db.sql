-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 23-05-2021 a las 20:20:20
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `my_lybrary_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isbn` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `published` datetime NOT NULL,
  `publisher` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pages` int(11) NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `book`
--

INSERT INTO `book` (`id`, `title`, `isbn`, `subtitle`, `author`, `published`, `publisher`, `pages`, `description`, `website`, `category`) VALUES
(85, 'Designing Evolvable Web APIs with ASP.NET', '9781449337711', 'Harnessing the Power of the Web', 'Glenn Block, et al.', '2014-04-07 00:00:00', 'O\'Reilly Media', 538, 'Design and build Web APIs for a broad range of clients—including browsers and mobile devices—that can adapt to change over time. This practical, hands-on guide takes you through the theory and tools you need to build evolvable HTTP services with Microsoft’s ASP.NET Web API framework. In the process, you’ll learn how design and implement a real-world Web API.', 'http://chimera.labs.oreilly.com/books/1234000001708/index.html', 'Suspense'),
(91, 'You Don\'t Know JS', '9781491904244', 'ES6 & Beyond', 'Kyle Simpson', '2015-12-27 00:00:00', 'O\'Reilly Media', 278, 'No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the \"You Don’t Know JS\" series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.', 'https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20&%20beyond', 'Drama'),
(94, 'Eloquent JavaScript, Second Edition', '9781593275846', 'A Modern Introduction to Programming', 'Marijn Haverbeke', '2014-12-14 00:00:00', 'No Starch Press', 472, 'JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.', 'http://eloquentjavascript.net/', 'Classic'),
(95, 'Learning JavaScript Design Patterns', '9781449331818', 'A JavaScript and jQuery Developer\'s Guide', 'Addy Osmani', '2012-07-01 00:00:00', 'O\'Reilly Media', 254, 'With Learning JavaScript Design Patterns, you\'ll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.', 'http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/', 'Fantasy'),
(96, 'Programming JavaScript Applications', '9781491950296', 'Robust Web Architecture with Node, HTML5, and Modern JS Libraries', 'Eric Elliott', '2014-07-01 00:00:00', 'O\'Reilly Media', 254, 'Take advantage of JavaScript\'s power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that\'s easier-yes, easier-to work with as your code base grows.', 'http://chimera.labs.oreilly.com/books/1234000000262/index.html', 'Drama'),
(98, 'Speaking JavaScript', '9781449365035', 'An In-Depth Guide for Programmers', 'Axel Rauschmayer', '2014-02-01 00:00:00', 'O\'Reilly Media', 460, 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.', 'http://speakingjs.com/', 'Fantasy'),
(99, 'Understanding ECMAScript 6', '9781593277574', 'The Definitive Guide for JavaScript Developers', 'Nicholas C. Zakas', '2016-09-03 00:00:00', 'No Starch Press', 352, 'ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.', 'https://leanpub.com/understandinges6/read', 'Suspense'),
(103, 'Git Pocket Guide', '9781449325862', 'A Working Introduction', 'Richard E. Silverman', '2013-08-02 00:00:00', 'O\'Reilly Media', 234, 'This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git experience.', 'http://chimera.labs.oreilly.com/books/1230000000561/index.html', 'Classic'),
(104, 'Cursive Handwriting Workbook for Teens', '1707818444-123ed', 'Learning Cursive with Inspirational Quotes for Young Adults', 'Leslie Mars', '2018-07-01 00:00:00', 'Independently published', 130, 'Learning Cursive with Inspirational Quotes for Young Adults, 3 in 1 Cursive Tracing Book Including over 130 Pages of Exercises with Letters, Words and Sentences', 'dsdasdasd', 'Drama');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20210522110402', '2021-05-22 11:05:17', 20),
('DoctrineMigrations\\Version20210522131313', '2021-05-22 13:13:24', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `book_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`id`, `url`, `book_id`) VALUES
(24, 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/e9617d19293361.562d7f22ac57d.gif', 85),
(25, 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/e9617d19293361.562d7f22ac57d.gif', 85),
(26, 'https://p5js.org/assets/img/books/learn_javascript.jpg', 94);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
