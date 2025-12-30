-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 30, 2025 at 12:57 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `logged_in` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `user_id`, `username`, `password`, `logged_in`, `created_at`) VALUES
(1, NULL, 'sara_k', '$2y$10$TW7t3qSOMduBsaS4uiO3ZO5tteZCfsLfQKSQTwJXCrost6CMMmW9i', '2025-12-16 11:47:43', '2025-12-16 11:47:43'),
(2, NULL, 'omar_h', '$2y$10$UZQiy1HGyyQAf1mpHbE5weIAlYgt5dGqRWQ3uf2ix/jgX3eZqNEaK', '2025-12-16 11:57:17', '2025-12-16 11:57:17');

-- --------------------------------------------------------

--
-- Table structure for table `favourite`
--

CREATE TABLE `favourite` (
  `fav_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rest_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `final_order`
--

CREATE TABLE `final_order` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rest_id` int(11) DEFAULT NULL,
  `payment_method` enum('cash','card','wallet','other') NOT NULL DEFAULT 'cash',
  `promo_id` int(11) DEFAULT NULL,
  `promo_name` varchar(255) DEFAULT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `discount_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_price` decimal(12,2) NOT NULL,
  `shipping_address` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `food_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `menu_id` int(11) DEFAULT NULL,
  `food_cat_id` int(11) DEFAULT NULL,
  `image_url` varchar(1024) DEFAULT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`food_id`, `title`, `description`, `price`, `menu_id`, `food_cat_id`, `image_url`, `is_available`, `created_at`, `updated_at`) VALUES
(3, 'Margherita Pizza', 'Classic cheese pizza', 12.99, 4, 2, 'http://example.com/pizza.jpg', 1, '2025-12-25 12:37:12', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `food_category`
--

CREATE TABLE `food_category` (
  `food_cat_id` int(11) NOT NULL,
  `food_cat_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_category`
--

INSERT INTO `food_category` (`food_cat_id`, `food_cat_name`) VALUES
(2, 'drinks');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `menu_id` int(11) NOT NULL,
  `rest_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`menu_id`, `rest_id`, `name`, `created_at`) VALUES
(4, NULL, 'drinks', '2025-12-24 14:24:24');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `order_detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` enum('pending','preparing','on_the_way','delivered','cancelled') NOT NULL DEFAULT 'pending',
  `price_before` decimal(12,2) NOT NULL,
  `line_total` decimal(12,2) NOT NULL,
  `final_price` decimal(12,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promo_code`
--

CREATE TABLE `promo_code` (
  `promo_id` int(11) NOT NULL,
  `promo_name` varchar(255) NOT NULL,
  `discount_type` enum('percent','fixed') NOT NULL DEFAULT 'percent',
  `discount_value` decimal(10,2) NOT NULL DEFAULT 0.00,
  `starts_at` datetime DEFAULT NULL,
  `ends_at` datetime DEFAULT NULL,
  `usage_limit` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rest_category`
--

CREATE TABLE `rest_category` (
  `rest_cat_id` int(11) NOT NULL,
  `cat_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rest_category`
--

INSERT INTO `rest_category` (`rest_cat_id`, `cat_name`) VALUES
(3, 'Dinner'),
(2, 'Fine Dining'),
(4, 'indian'),
(1, 'Seafood');

-- --------------------------------------------------------

--
-- Table structure for table `rest_rest_category`
--

CREATE TABLE `rest_rest_category` (
  `id` int(11) NOT NULL,
  `rest_id` int(11) NOT NULL,
  `rest_cat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rest_rest_category`
--

INSERT INTO `rest_rest_category` (`id`, `rest_id`, `rest_cat_id`) VALUES
(4, 6, 3),
(18, 15, 4);

-- --------------------------------------------------------

--
-- Table structure for table `rest_table`
--

CREATE TABLE `rest_table` (
  `rest_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `opening_hours` varchar(255) DEFAULT NULL,
  `menu_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rest_table`
--

INSERT INTO `rest_table` (`rest_id`, `name`, `description`, `location`, `phone`, `opening_hours`, `menu_id`, `created_at`, `updated_at`) VALUES
(1, 'Sunset Bistro', 'A cozy place for breakfast and brunch.', '123 Main Street, Beirut', '+96170123456', '08:00 - 22:00', NULL, '2025-12-17 13:39:57', '0000-00-00 00:00:00'),
(6, 'Oceansd Delight', 'Seafoodsd restaurant with fresh daily catches.', '45 Marindsa Street, Beirut', '+961712345ds67', '11:00 - 23:00', NULL, '2025-12-25 11:01:12', '0000-00-00 00:00:00'),
(15, 'doner', 'doner house rest.', 'octa, saida', '+961432342', '11:00 - 23:00', NULL, '2025-12-25 11:22:18', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `username`, `email`, `password`, `phone`, `address`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Walid', 'Ayoub', 'walid123', 'walid@example.com', '$2y$10$RIFwSTw9SgFNMfmKN5MCB.S4eQ9HAFfeufCYm1y6cnO0kS8Q7LLB.', '1234567890', 'Beirut', 'admin', '2025-12-16 10:31:23', '0000-00-00 00:00:00'),
(3, 'Ayman', 'Haddad', 'ayman_h', 'ayman.haddad@example.com', '$2y$10$uuI1KNDfzy2dUCRpQuOVaOMYXMGKMu6qeNeLhhRNNITkgbhY5EqNK', '0987654321', 'Tripoli', 'user', '2025-12-16 11:23:57', '0000-00-00 00:00:00'),
(5, 'Sara', 'Khalil', 'sara_k', 'sara.khalil@example.com', '$2y$10$TW7t3qSOMduBsaS4uiO3ZO5tteZCfsLfQKSQTwJXCrost6CMMmW9i', '0771122334', 'Beirut', 'admin', '2025-12-16 11:47:43', '0000-00-00 00:00:00'),
(8, 'mhmd', 'ehab', 'ehan_h', 'mhmd.ehab@example.com', '$2y$10$TvyOGAbgWM1eVs12uE9uKOKSGEKF2iouuoubtxeD6dgmUV96HYNfu', '078988736', 'saida', 'user', '2025-12-25 08:56:42', '0000-00-00 00:00:00'),
(10, 'mhmd', 'ehab', 'ehab_ayoub', 'mhmd.ehabb@example.com', '$2y$10$jvpsnM/CgJdbsZoYWENem.OXEw2oTeoMZIkYka6ED4g7eKSWRguqi', '078988736', 'saida', 'user', '2025-12-25 09:18:57', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `fk_admin_user` (`user_id`);

--
-- Indexes for table `favourite`
--
ALTER TABLE `favourite`
  ADD PRIMARY KEY (`fav_id`),
  ADD UNIQUE KEY `ux_user_rest` (`user_id`,`rest_id`),
  ADD KEY `fk_fav_rest` (`rest_id`);

--
-- Indexes for table `final_order`
--
ALTER TABLE `final_order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `idx_order_user` (`user_id`),
  ADD KEY `idx_order_rest` (`rest_id`),
  ADD KEY `fk_order_promo` (`promo_id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`food_id`),
  ADD KEY `idx_food_menu` (`menu_id`),
  ADD KEY `idx_food_cat` (`food_cat_id`);

--
-- Indexes for table `food_category`
--
ALTER TABLE `food_category`
  ADD PRIMARY KEY (`food_cat_id`),
  ADD UNIQUE KEY `cat_name` (`food_cat_name`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`menu_id`),
  ADD KEY `idx_menu_rest` (`rest_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`order_detail_id`),
  ADD KEY `fk_detail_order` (`order_id`),
  ADD KEY `fk_detail_food` (`food_id`);

--
-- Indexes for table `promo_code`
--
ALTER TABLE `promo_code`
  ADD PRIMARY KEY (`promo_id`),
  ADD UNIQUE KEY `promo_name` (`promo_name`);

--
-- Indexes for table `rest_category`
--
ALTER TABLE `rest_category`
  ADD PRIMARY KEY (`rest_cat_id`),
  ADD UNIQUE KEY `cat_name` (`cat_name`);

--
-- Indexes for table `rest_rest_category`
--
ALTER TABLE `rest_rest_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ux_rest_cat` (`rest_id`,`rest_cat_id`),
  ADD KEY `fk_rrc_cat` (`rest_cat_id`);

--
-- Indexes for table `rest_table`
--
ALTER TABLE `rest_table`
  ADD PRIMARY KEY (`rest_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `favourite`
--
ALTER TABLE `favourite`
  MODIFY `fav_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `final_order`
--
ALTER TABLE `final_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `food_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `food_category`
--
ALTER TABLE `food_category`
  MODIFY `food_cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `menu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promo_code`
--
ALTER TABLE `promo_code`
  MODIFY `promo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rest_category`
--
ALTER TABLE `rest_category`
  MODIFY `rest_cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `rest_rest_category`
--
ALTER TABLE `rest_rest_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `rest_table`
--
ALTER TABLE `rest_table`
  MODIFY `rest_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `fk_admin_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `favourite`
--
ALTER TABLE `favourite`
  ADD CONSTRAINT `fk_fav_rest` FOREIGN KEY (`rest_id`) REFERENCES `rest_table` (`rest_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_fav_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `final_order`
--
ALTER TABLE `final_order`
  ADD CONSTRAINT `fk_order_promo` FOREIGN KEY (`promo_id`) REFERENCES `promo_code` (`promo_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_rest` FOREIGN KEY (`rest_id`) REFERENCES `rest_table` (`rest_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `food`
--
ALTER TABLE `food`
  ADD CONSTRAINT `fk_food_cat` FOREIGN KEY (`food_cat_id`) REFERENCES `food_category` (`food_cat_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_food_menu` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `fk_menu_rest` FOREIGN KEY (`rest_id`) REFERENCES `rest_table` (`rest_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `fk_detail_food` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detail_order` FOREIGN KEY (`order_id`) REFERENCES `final_order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rest_rest_category`
--
ALTER TABLE `rest_rest_category`
  ADD CONSTRAINT `fk_rrc_cat` FOREIGN KEY (`rest_cat_id`) REFERENCES `rest_category` (`rest_cat_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rrc_rest` FOREIGN KEY (`rest_id`) REFERENCES `rest_table` (`rest_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
