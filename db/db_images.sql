/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_binh_luan` date NOT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(255) NOT NULL,
  `duong_dan` varchar(255) NOT NULL,
  `mo_ta` varchar(500) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `luu_anh_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_luu` date NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`luu_anh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `ho_ten` varchar(255) NOT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`, `created_at`, `updated_at`) VALUES
(1, 2, 1, '2025-02-01', 'The ocean looks amazing!', '2025-02-01', '2025-02-01'),
(2, 3, 2, '2025-02-02', 'Such a majestic mountain!', '2025-02-02', '2025-02-02'),
(3, 4, 3, '2025-02-03', 'Love the lotus flowers!', '2025-02-03', '2025-02-03'),
(4, 5, 4, '2025-02-04', 'Romantic sunset!', '2025-02-04', '2025-02-04'),
(5, 1, 5, '2025-02-05', 'City lights are stunning!', '2025-02-05', '2025-02-05'),
(6, 2, 6, '2025-02-06', 'Peaceful rice field.', '2025-02-06', '2025-02-06'),
(7, 3, 7, '2025-02-07', 'Cool waterfall!', '2025-02-07', '2025-02-07'),
(8, 4, 8, '2025-02-08', 'Beautiful starry sky!', '2025-02-08', '2025-02-08'),
(9, 5, 9, '2025-02-09', 'Vivid rainbow!', '2025-02-09', '2025-02-09'),
(10, 1, 10, '2025-02-10', 'Relaxing park view!', '2025-02-10', '2025-02-10');

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`, `created_at`, `updated_at`) VALUES
(1, 'Ocean View', 'images/ocean.jpg', 'A beautiful blue ocean', 1, '2025-01-15', '2025-02-15'),
(2, 'Mountain Peak', 'images/mountain.jpg', 'Majestic mountain scenery', 2, '2025-01-16', '2025-02-16'),
(3, 'Lotus Bloom', 'images/lotus.jpg', 'Blooming lotus flowers', 3, '2025-01-17', '2025-02-17'),
(4, 'Sunset Glow', 'images/sunset.jpg', 'Sunset over the sea', 4, '2025-01-18', '2025-02-18'),
(5, 'City Lights', 'images/city_night.jpg', 'Twinkling city lights at night', 5, '2025-01-19', '2025-02-19'),
(6, 'Rice Field', 'images/rice_field.jpg', 'Golden rice field', 1, '2025-01-20', '2025-02-20'),
(7, 'Waterfall', 'images/waterfall.jpg', 'Cool refreshing waterfall', 2, '2025-01-21', '2025-02-21'),
(8, 'Starry Sky', 'images/starry_sky.jpg', 'A sky full of stars', 3, '2025-01-22', '2025-02-22'),
(9, 'Rainbow', 'images/rainbow.jpg', 'Rainbow after the rain', 4, '2025-01-23', '2025-02-23'),
(10, 'Green Park', 'images/park.jpg', 'A lush green park', 5, '2025-01-24', '2025-02-24');

INSERT INTO `luu_anh` (`luu_anh_id`, `nguoi_dung_id`, `hinh_id`, `ngay_luu`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '2025-02-15', '2025-02-15', '2025-02-15'),
(2, 2, 3, '2025-02-16', '2025-02-16', '2025-02-16'),
(3, 3, 4, '2025-02-17', '2025-02-17', '2025-02-17'),
(4, 4, 5, '2025-02-18', '2025-02-18', '2025-02-18'),
(5, 5, 6, '2025-02-19', '2025-02-19', '2025-02-19'),
(6, 1, 7, '2025-02-20', '2025-02-20', '2025-02-20'),
(7, 2, 8, '2025-02-21', '2025-02-21', '2025-02-21'),
(8, 3, 9, '2025-02-22', '2025-02-22', '2025-02-22'),
(9, 4, 10, '2025-02-23', '2025-02-23', '2025-02-23'),
(10, 5, 1, '2025-02-24', '2025-02-24', '2025-02-24');

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `created_at`, `updated_at`) VALUES
(1, 'john.doe@gmail.com', 'John2025!', 'John Doe', 25, 'avatar1.jpg', '2025-01-01', '2025-03-01'),
(2, 'jane.smith@gmail.com', 'JaneLovesCats', 'Jane Smith', 30, 'avatar2.jpg', '2025-01-02', '2025-03-02'),
(3, 'michael.lee@gmail.com', 'Mike1234', 'Michael Lee', 22, 'avatar3.jpg', '2025-01-03', '2025-03-03'),
(4, 'emily.brown@gmail.com', 'Emily@2025', 'Emily Brown', 28, 'avatar4.jpg', '2025-01-04', '2025-03-04'),
(5, 'david.wilson@gmail.com', 'David_PW99', 'David Wilson', 35, 'avatar5.jpg', '2025-01-05', '2025-03-05');

	
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;