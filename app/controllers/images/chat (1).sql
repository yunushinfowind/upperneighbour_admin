-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2020 at 04:18 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `room_id`, `user_id`, `message`, `created_at`, `updated_at`) VALUES
(8, 9, 18, 'Hello how are you?', '2020-07-28 10:51:19', '2020-07-28 10:51:19'),
(9, 9, 18, 'yes', '2020-07-28 10:51:27', '2020-07-28 10:51:27'),
(10, 11, 22, 'Hello', '2020-07-29 14:16:15', '2020-07-29 14:16:15'),
(11, 11, 22, 'Hello ji', '2020-07-29 14:16:15', '2020-07-29 14:16:15'),
(12, 10, 19, 'Hello ji', '2020-07-29 14:16:15', '2020-07-29 14:16:15'),
(14, 9, 17, 'yes ji how are you?', '2020-07-30 08:25:52', '2020-07-30 08:25:52'),
(15, 9, 18, 'GM ji', '2020-07-30 13:10:41', '2020-07-30 13:10:41');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `room_id` varchar(50) DEFAULT NULL,
  `group_name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `room_id`, `group_name`, `created_at`, `updated_at`) VALUES
(9, 'xgJ8T5G5', NULL, '2020-07-28 10:42:16', '2020-07-28 10:42:16'),
(10, 'nvji3FVk', NULL, '2020-07-29 05:49:15', '2020-07-29 05:49:15'),
(11, 'EWcZBlS3', NULL, '2020-07-29 05:50:30', '2020-07-29 05:50:30');

-- --------------------------------------------------------

--
-- Table structure for table `tutorials`
--

CREATE TABLE `tutorials` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `published` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(225) DEFAULT NULL,
  `profile` varchar(30) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `profile`, `name`, `created_at`, `updated_at`) VALUES
(17, 'test@mailinator.com', '$2b$10$CMXMAdPETvGUs/jjSA1bWuhhN6GL3dqdSUrU891GBUrhKnvPw1TC2', 'download.jpg', NULL, '2020-07-27 10:47:31', '2020-07-27 10:47:31'),
(18, 'yunush@mailinator.com', '$2b$10$KeVxJkHqujINglc3DFhrge/F5iOqMOWlnQZfpKbcKmSnLtkmmY2EO', 'download.jpg', 'yunush', '2020-07-27 11:25:32', '2020-07-27 11:25:32'),
(19, NULL, NULL, 'download.jpg', NULL, '2020-07-28 10:17:04', '2020-07-28 10:17:04'),
(20, NULL, NULL, 'dfgdfg', NULL, '2020-07-28 10:17:35', '2020-07-28 10:17:35'),
(21, NULL, NULL, 'dfg', NULL, '2020-07-28 10:18:11', '2020-07-28 10:18:11'),
(22, 'testuser@mailinator.com', '$2b$10$1Pqb0y7/DgbhcnAeWrGtaeNLuYYCp2eHrAnhMYjAZDtKbI46sJSiO', 'download.jpg', 'testuser', '2020-07-29 05:11:37', '2020-07-29 05:11:37'),
(35, 'test123@mailinator.com', '$2b$10$YtHkEL60oZiEo3ClxVFEg.JAvFJ1XzeW.a0P6FJaaPP8CftXFYLxW', 'download.jpg', 'jonson', '2020-07-30 10:46:24', '2020-07-30 10:46:24'),
(36, 'test123@mailinator.com', '$2b$10$l8BVymqcvYZ91ezHQpv2KOwjBtNUbzPyF8cG3AMtv9hPo7luKuAtW', 'download.jpg', 'jonson', '2020-07-30 11:02:50', '2020-07-30 11:02:50'),
(37, 'test123@mailinator.com', '$2b$10$u3rNE6fnkUTO.AsUrvwzieqpZyHgY/pXe4Dl3cKeU7.QOQuAf3f2K', 'download.jpg', 'jonson', '2020-07-30 11:08:04', '2020-07-30 11:08:04'),
(38, 'test123@mailinator.com', '$2b$10$Yf539Yf3ci66wtnnETqWEudep9/UzJdcUrODPU5culsKOLZ2FdAoq', 'download.jpg', 'jonson', '2020-07-30 11:09:06', '2020-07-30 11:09:06'),
(39, 'test12366@mailinator.com', '$2b$10$fJrZL.vN64KE4lX6YdS1X.BtM/VLKj1shMdqvE1G3OpUFJ9vHDwEG', 'images.jpg', 'jonson', '2020-07-30 11:12:40', '2020-07-30 11:12:40'),
(40, 'jackson@mailinator.com', '$2b$10$Z3.Nlwv4SddSKONo/SYUKOCIf.iwAKJvWvRujzvFdFG8H6ztObcqe', 'download (2).jpg', 'jonson', '2020-07-30 13:01:42', '2020-07-30 13:01:42');

-- --------------------------------------------------------

--
-- Table structure for table `user_rooms`
--

CREATE TABLE `user_rooms` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_rooms`
--

INSERT INTO `user_rooms` (`id`, `user_id`, `room_id`, `created_at`, `updated_at`) VALUES
(9, 17, 9, '2020-07-28 10:42:16', '2020-07-28 10:42:16'),
(10, 18, 9, '2020-07-28 10:42:16', '2020-07-28 10:42:16'),
(11, 17, 11, '2020-07-29 05:50:30', '2020-07-29 05:50:30'),
(12, 18, 11, '2020-07-29 05:50:30', '2020-07-29 05:50:30'),
(13, 17, 10, '2020-07-29 05:50:30', '2020-07-29 05:50:30'),
(14, 19, 10, '2020-07-29 05:50:30', '2020-07-29 05:50:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tutorials`
--
ALTER TABLE `tutorials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_rooms`
--
ALTER TABLE `user_rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `room_id` (`room_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tutorials`
--
ALTER TABLE `tutorials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `user_rooms`
--
ALTER TABLE `user_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_rooms`
--
ALTER TABLE `user_rooms`
  ADD CONSTRAINT `user_rooms_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_rooms_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
