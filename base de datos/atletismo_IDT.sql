-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 03-04-2018 a las 18:09:48
-- Versión del servidor: 10.1.31-MariaDB
-- Versión de PHP: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `atletismo_IDT`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atleta`
--

CREATE TABLE `atleta` (
  `id` int(11) NOT NULL,
  `primer_nombre` varchar(30) NOT NULL,
  `segundo_nombre` varchar(30) NOT NULL,
  `primer_apellido` varchar(30) NOT NULL,
  `segundo_apellido` varchar(30) NOT NULL,
  `cedula` int(11) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `id_club` int(11) NOT NULL,
  `sexo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `atleta`
--

INSERT INTO `atleta` (`id`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `cedula`, `fecha_nacimiento`, `id_club`, `sexo`) VALUES
(1, 'afsho', 'ohafoihfda', 'ohfaoishf', 'oihfaoihfle', 156541, '1996-03-14', 1, 'Femenino'),
(2, 'asfonjhoi', 'ohfaoishf', 'ohlfsahflh', 'hlashfoia', 4684, '1980-11-21', 2, 'Femenino'),
(3, 'fwqhpi', 'nlksahnviosnnwoh23r', 'ncoano', 'afas', 733465, '1975-12-02', 3, 'Masculino'),
(4, 'ofdshoi', 'pfpahsfgp', 'phfasihfp', 'phfpiasn', 54123, '1985-10-20', 4, 'Masculino'),
(5, 'asojpi', 'cashjnp', 'opvnpio', 'mcijqaip', 123465, '1977-03-01', 1, 'Femenino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL,
  `edad_min` int(11) NOT NULL,
  `edad_max` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `descripcion`, `edad_min`, `edad_max`) VALUES
(3, 'hhh', 'aaaaa', 31, 36),
(7, 'we', 'sdfaf', 90, 91),
(13, 'bbb', 'fasfas', 10, 15),
(15, 'gdfg', 'gsdggdfgdf', 2, 5),
(17, 'dfgdsg', 'rwqrwe', 7, 8),
(20, 'vxz', 'dfasd', 6, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `club`
--

CREATE TABLE `club` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `club`
--

INSERT INTO `club` (`id`, `nombre`, `descripcion`) VALUES
(1, 'jt', 'safas23hgfhf'),
(2, 'jtyjr', 'jtrrt'),
(3, 'asfohjo', 'ihaspifdfd'),
(4, 'gvxik', 'nasllfg'),
(5, 'rwqer', 'rewqrqw');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `competencia`
--

CREATE TABLE `competencia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `lugar` varchar(255) NOT NULL,
  `finalizado` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `competencia`
--

INSERT INTO `competencia` (`id`, `nombre`, `fecha`, `hora`, `lugar`, `finalizado`) VALUES
(1, 'dfas', '2018-05-03', '01:01:00', 'rrwqe', 0),
(2, 'dfas', '2018-05-03', '01:01:00', 'rrwqe', 0),
(4, 'fdas', '2018-04-18', '01:01:00', 'fdasfa', 0),
(13, 'dsfa', '2018-04-12', '01:01:00', 'a', 0),
(14, 'hnfgh', '2018-04-26', '01:01:00', 'gagf', 0),
(16, 'utyurt', '2018-04-10', '01:01:00', 'erwtwer', 0),
(17, 'bbbbbbbb', '2018-05-04', '01:01:00', 'beytrtewtwe', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `competencia_atleta`
--

CREATE TABLE `competencia_atleta` (
  `id` int(11) NOT NULL,
  `id_atleta` int(11) NOT NULL,
  `id_competencia` int(11) NOT NULL,
  `tiempo` double NOT NULL DEFAULT '9999999',
  `numero_atleta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `competencia_atleta`
--

INSERT INTO `competencia_atleta` (`id`, `id_atleta`, `id_competencia`, `tiempo`, `numero_atleta`) VALUES
(13, 1, 13, 9999999, 83),
(14, 2, 13, 9999999, 54),
(15, 4, 13, 9999999, 500),
(16, 1, 14, 9999999, 71),
(17, 2, 14, 9999999, 272),
(18, 3, 14, 9999999, 11),
(22, 3, 16, 9999999, 477),
(23, 4, 16, 9999999, 400),
(32, 2, 17, 9999999, 259),
(33, 3, 17, 9999999, 364),
(34, 4, 17, 9999999, 494);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `atleta`
--
ALTER TABLE `atleta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula_unique` (`cedula`),
  ADD KEY `foreing_id_club` (`id_club`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `club`
--
ALTER TABLE `club`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uique_nombre` (`nombre`);

--
-- Indices de la tabla `competencia`
--
ALTER TABLE `competencia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `competencia_atleta`
--
ALTER TABLE `competencia_atleta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreing_id_atleta` (`id_atleta`),
  ADD KEY `foreing_id_competencia` (`id_competencia`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `atleta`
--
ALTER TABLE `atleta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `club`
--
ALTER TABLE `club`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `competencia`
--
ALTER TABLE `competencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `competencia_atleta`
--
ALTER TABLE `competencia_atleta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `atleta`
--
ALTER TABLE `atleta`
  ADD CONSTRAINT `foreing_id_club` FOREIGN KEY (`id_club`) REFERENCES `club` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `competencia_atleta`
--
ALTER TABLE `competencia_atleta`
  ADD CONSTRAINT `foreing_id_atleta` FOREIGN KEY (`id_atleta`) REFERENCES `atleta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `foreing_id_competencia` FOREIGN KEY (`id_competencia`) REFERENCES `competencia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
