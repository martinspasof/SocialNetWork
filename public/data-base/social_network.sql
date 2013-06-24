-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Време на генериране: 
-- Версия на сървъра: 5.1.50-community
-- Версия на PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- БД: `social_network`
--

-- --------------------------------------------------------

--
-- Структура на таблица `games`
--

CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `info` varchar(255) NOT NULL,
  `srcPic` varchar(255) NOT NULL,
  `gameLink` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Ссхема на данните от таблица `games`
--

INSERT INTO `games` (`id`, `name`, `info`, `srcPic`, `gameLink`, `category`) VALUES
(1, 'Snake', 'Eat the food and try not to eat your tail', 'snake.jpg', 'snake.js', 'arcade'),
(2, 'SnowTiger', 'Cool game.', 'testPic.jpg', 'snake.js', 'test');

-- --------------------------------------------------------

--
-- Структура на таблица `photographs`
--

CREATE TABLE IF NOT EXISTS `photographs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `size` int(32) NOT NULL,
  `caption` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Ссхема на данните от таблица `photographs`
--

INSERT INTO `photographs` (`id`, `filename`, `type`, `size`, `caption`) VALUES
(1, 'wall.jpg', 'image/jpeg', 607118, 'Wall'),
(2, 'flowers.jpg', 'image/jpeg', 664947, 'Flowers'),
(3, 'buddhas.jpg', 'image/jpeg', 456234, 'Buddhas'),
(4, 'roof.jpg', 'image/jpeg', 524574, 'Roof');

-- --------------------------------------------------------

--
-- Структура на таблица `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `picture` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(40) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Ссхема на данните от таблица `users`
--

INSERT INTO `users` (`id`, `picture`, `username`, `password`, `first_name`, `last_name`) VALUES
(1, 'default.jpg', 'stringbitking', 'olimpa', 'Victor', 'Tsenkov'),
(2, 'roof.jpg', 'ivancho', 'ivancho', 'ivan', 'ivanov');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
