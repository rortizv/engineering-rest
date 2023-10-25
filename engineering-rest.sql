-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-10-2023 a las 08:08:50
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `engineering-rest`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(64) NOT NULL,
  `state` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `state`, `createdAt`, `updatedAt`) VALUES
(1, 'Fulgore', 'fulgore@mail.com', '$2a$10$OerbzCogSXtBV7G.53PisebdeF2CB8FiXdnrZKVxuNmcCMp9bhSB2', 0, '2023-10-23 04:47:41', '2023-10-25 05:36:59'),
(2, 'Spinal', 'spinal@mail.com', '$2a$10$c3JJBi6FvCAP7p3TS/v/5O/pmigQG9Qmvm5SArMWA8BHNoJtfgrOu', 1, '2023-10-23 04:47:41', '2023-10-25 05:37:24'),
(3, 'Jago', 'jago@mail.com', '$2a$10$ibIaNar6nVqFY5DisKSCvOQymFS1/Y1j7Z23nmCcSguUwQ14gIgo2', 1, '2023-10-23 03:04:39', '2023-10-25 05:46:37'),
(18, 'Orchid', 'orchid@mail.com', '$2a$10$pJdFLNct4UE2sfceIQhVEOgaDkt4nVpIW./UYOECgnjA6FW3mmY7a', 1, '2023-10-25 06:05:55', '2023-10-25 06:05:55');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
