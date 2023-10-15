create database mydb;
use mydb;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 07, 2023 lúc 09:01 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `mydb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `detail_order`
--

CREATE TABLE `detail_order` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price_pr` bigint(20) unsigned NOT NULL,
  `quantity_pr` int(11) NOT NULL,
  `warranty period` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `role_id` int(11) NOT NULL,
  `create_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Cấu trúc bảng cho bảng `image`
--

CREATE TABLE `image`(
   `img_id` int(11) NOT NULL,
   `img_1` varchar(200) COLLATE utf8_unicode_ci NULL,
   `img_2` varchar(200) COLLATE utf8_unicode_ci NULL,
   `img_3` varchar(200) COLLATE utf8_unicode_ci NULL,
   `img_4` varchar(200) COLLATE utf8_unicode_ci NULL,
   `img_5` varchar(200) COLLATE utf8_unicode_ci NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products`(
	`product_id` int(11) NOT NULL,
    `category_id` int(11) NOT NULL,
    `name_pr` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
    `name_serial` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
    `ram` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
    `rom` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
    `detail` longtext COLLATE utf8_unicode_ci NOT NULL,
    `price` int(11) NOT NULL,
    `quantity_pr` int(11) NOT NULL,
    `img_id` int(11) NOT NULL,
    `guarantee period` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Cấu trúc bảng cho bảng `order`
--

CREATE TABLE `order` (
	`order_id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    `create_order_at` timestamp NULL DEFAULT NULL,
    `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	`email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	`phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
    `address` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
    `state` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
    `note` longtext COLLATE utf8_unicode_ci NOT NULL,
    `total` bigint(20) UNSIGNED NOT NULL,
    `discount` int(11),
    `delivery_fee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Cấu trúc bảng cho bảng `wishlist`
--
CREATE TABLE `wishlist`(
	`product_id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Cấu trúc bảng cho bảng `suppliers`
--

CREATE TABLE `suppliers` (
    `supplier_id` int(11) NOT NULL,
    `supplier_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`supplier_id`);

ALTER TABLE `products`
  ADD `supplier_id` int(11);
  
------------------------------------------
CREATE TABLE `discounts` (
    `discount_id` int(11) NOT NULL,
    `discount_code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `discount_amount` int(11) NOT NULL,
    `discount_date` timestamp NULL DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`discount_id`);
  
CREATE TABLE `product_category` (
    `product_id` int(11) NOT NULL,
    `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `traffic user`(
	`user_id` int(11) NOT NULL,
    `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`user_id`,`product_id`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Chỉ mục cho bảng `detail_order`
--
ALTER TABLE `detail_order`
  ADD PRIMARY KEY (`order_id`,`product_id`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Chỉ mục cho bảng `image`
--
ALTER TABLE `image`
ADD PRIMARY KEY (`img_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
ADD PRIMARY KEY (`product_id`);

--
-- Chỉ mục cho bảng `order`
--
ALTER TABLE `order`
ADD PRIMARY KEY (`order_id`);

--
-- Chỉ mục cho bảng `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`user_id`,`product_id`);
  
-- Chỉ mục cho bảng product_category
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`product_id`, `category_id`);

-- Chỉ mục cho bảng traffic user
ALTER TABLE `traffic user`
ADD PRIMARY KEY (`user_id`, `time`);
  
-- Foreign Key

ALTER TABLE `user`
add constraint `user_fk` foreign key (`role_id`) 
references `role` (`role_id`) on delete cascade on update cascade;

ALTER TABLE `products`
add constraint `products_fk1` foreign key (`img_id`) 
references `image` (`img_id`) on delete cascade on update cascade;

ALTER TABLE `cart`
ADD CONSTRAINT `cart_fk1` FOREIGN KEY (`user_id`)
REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `cart`
ADD CONSTRAINT `cart_fk2` FOREIGN KEY (`product_id`)
REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `detail_order`
ADD CONSTRAINT `do_fk1` FOREIGN KEY (`product_id`)
REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `detail_order`
ADD CONSTRAINT `do_fk2` FOREIGN KEY (`order_id`)
REFERENCES `order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `order`
ADD CONSTRAINT `order_fk1` FOREIGN KEY (`user_id`)
REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `wishlist`
ADD CONSTRAINT `wl1` FOREIGN KEY (`user_id`)
REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `wishlist`
ADD CONSTRAINT `wl_fk2` FOREIGN KEY (`product_id`)
REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `product_category`
ADD CONSTRAINT `pc_fk1` FOREIGN KEY (`category_id`) 
REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `product_category`
ADD CONSTRAINT `pc_fk2` FOREIGN KEY (`product_id`)
REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `products`
ADD CONSTRAINT `products_fk3` FOREIGN KEY (`supplier_id`) 
REFERENCES `suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `order`
ADD CONSTRAINT `order_fk3` FOREIGN KEY (`discount`) 
REFERENCES `discounts` (`discount_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `traffic user`
ADD CONSTRAINT `tu_fk1` FOREIGN KEY (`user_id`)
REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

SELECT MONTH(NOW()) AS current_month;


drop database mydb;
