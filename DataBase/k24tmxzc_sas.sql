-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 26, 2018 at 12:26 AM
-- Server version: 10.1.31-MariaDB-cll-lve
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `k24tmxzc_sas`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `email`, `password`, `username`) VALUES
(1, 'tard916@gmail.com', '1234', 'Admin'),
(2, 'kp.koon@help.edu.my', '1234', 'Koon');

-- --------------------------------------------------------

--
-- Table structure for table `jsection`
--

CREATE TABLE `jsection` (
  `JS_UniqueID` varchar(256) NOT NULL,
  `member_ID` varchar(256) NOT NULL,
  `qr_ID` varchar(256) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jsection`
--

INSERT INTO `jsection` (`JS_UniqueID`, `member_ID`, `qr_ID`) VALUES
('JS_01', 'MB-5af0949ced78d3.12303442', 'QR-5aeebfd4733c66.27296106'),
('JS_02', 'MB-5af0949ced78d3.12303442', 'QR-5af0d879c4a045.10177742'),
('JS_03', 'MB-5af0949ced78d3.12303442', 'QR-5af0e505c3b564.42351093'),
('JS_04', 'MB-5af0949ced78d3.12303442', 'QR-5aeebfd4733c66.27296106'),
('JS-5b30554d772de7.75335298', 'MB-5af0dfb8673f46.68354130', 'QR-5aeebfd4733c66.27296106 '),
('JS-5b305587c181b8.66781401', '', 'QR-5aeebfd4733c66.27296106 '),
('JS-5b308325d43c83.94037285', 'MB-5af0dfb8673f46.68354130', 'QR-5aeebfd4733c66.27296106 '),
('JS-5b308a26741c00.86730637', 'MB-5af0dfb8673f46.68354130', 'QR-5af0e505c3b564.42351093'),
('JS-5b309048bc1c68.71012142', 'MB-5af0dfb8673f46.68354130', 'QR-5af0e505c3b564.42351093'),
('JS-5b309146dce144.02929985', 'MB-5af0dfb8673f46.68354130', 'QR-5af0e505c3b564.42351093'),
('JS-5b3091b50df095.21832645', 'MB-5af0dfb8673f46.68354130', 'QR-5af0e505c3b564.42351093'),
('JS-5b3091bedc4723.93517456', '', 'QR-5af0e505c3b564.42351093');

-- --------------------------------------------------------

--
-- Table structure for table `mcq_answer`
--

CREATE TABLE `mcq_answer` (
  `mcq_ID` varchar(100) NOT NULL,
  `mcq_Answer` varchar(100) NOT NULL,
  `mcq_A` varchar(250) NOT NULL,
  `mcq_B` varchar(250) NOT NULL,
  `mcq_C` varchar(250) NOT NULL,
  `mcq_D` varchar(250) NOT NULL,
  `question_ID` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mcq_answer`
--

INSERT INTO `mcq_answer` (`mcq_ID`, `mcq_Answer`, `mcq_A`, `mcq_B`, `mcq_C`, `mcq_D`, `question_ID`) VALUES
('MCQ-5b2c6a40902ce1.93098459', 'C', 'Food', 'Cheap', 'Religion', 'Weather', 'QT-5b2c6a40902b01.84764904'),
('MCQ-5b0785d09ee5a5.40277514', 'C', 'Hdhdhx', 'Behdhx', 'Bdgdh', 'Bdbdnxh', 'QT-5b0785d09ee213.88030061'),
('MCQ-5b2c66f0b22be9.56603911', 'A', 'A', 'B', 'C', 'D', 'QT-5b2c66f0b22a17.72304986'),
('MCQ-5b062e5e7cd355.92624945', 'D', 'Europe', 'America', 'Africa', 'Asia', 'QT-5b062e5e7cd144.13745809'),
('MCQ-5b062f5d484af9.16253299', 'D', 'Europe', 'North America', 'Africa', 'Asia', 'QT-5b062f5d484907.12737627'),
('MCQ-5b0630a46c5820.03010382', 'B', 'Europe', 'Asia', 'America', 'Africa', 'QT-5b0630a46c5592.36213502'),
('MCQ-5b06322c4b8958.36247749', 'C', 'Europe', 'Africa', 'Asia', 'America', 'QT-5b06322c4b8739.03956206'),
('MCQ-5b2c6b9d93aa79.99448485', 'A', 'Ugh d hth', 'Duff thing', 'Chubb', 'Chum', 'QT-5b2c6b9d93a856.10388270'),
('MCQ-5b30899c518d41.56336422', 'D', '300000Km', '235857Km', '123857Km', '245857KM', 'QT-5b30899c518aa4.06333254'),
('MCQ-5b3089a6c846d9.00211087', 'D', '300000Km', '243857Km', '124857Km', '245857Km', 'QT-5b3089a6c844c3.97081302');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `member_ID` varchar(100) NOT NULL,
  `member_Name` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `member_Company` varchar(250) NOT NULL,
  `member_insdusrtyField` varchar(250) NOT NULL,
  `member_Email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`member_ID`, `member_Name`, `username`, `member_Company`, `member_insdusrtyField`, `member_Email`, `password`) VALUES
('MB-5af0949ced78d3.12303442', 'Thierno Abdoul Rahimi Diallo', 'Rahimi', 'HELP UNIVERSITY ', 'IT Industry ', 'tard916@gmail.com', '1234'),
('MB-5af0dfb8673f46.68354130', 'Cellou Diallo', 'Cellou', 'SAS  ', 'IT industry  ', 'Cello@sas.com', '1234'),
('MB-5b173f33ec06f3.81136939', 'Mr. Koon', 'Koon', 'HELP UNIVERSITY IT DEPARTMENT ', 'IT INDUSTRY ', 'kp.koon@help.edu.my', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `member_answer`
--

CREATE TABLE `member_answer` (
  `ma_ID` varchar(100) NOT NULL,
  `member_ID` varchar(100) NOT NULL,
  `question_ID` varchar(100) NOT NULL,
  `answer` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member_answer`
--

INSERT INTO `member_answer` (`ma_ID`, `member_ID`, `question_ID`, `answer`) VALUES
('RT-5b161509be2538.46097365', 'MB-5af0949ced78d3.12303442', 'QT-5b0630a46c5592.36213502', '4'),
('RT-5b16257d124a80.27941124', 'MB-5af0949ced78d3.12303442', 'QT-5b0785afdd8404.59255387', '3'),
('RT-5b16292837f841.09474913', 'MB-5af0949ced78d3.12303442', 'QT-5b0630a46c5592.36213502', '3'),
('MCQ-5b2879d1d1e6f4.48100143', 'MB-5af0949ced78d3.12303442', 'QR-5aeebfd4733c66.27296106', 'C'),
('MCQ-5b287a80a0bb02.37735871', 'MB-5af0949ced78d3.12303442', 'QT-5b06322c4b8739.03956206', 'C'),
('RT-5b30833a0adc31.60040741', 'MB-5af0dfb8673f46.68354130', 'QT-5b0785afdd8404.59255387', '5'),
('MCQ-5b30834dd49662.35451303', 'MB-5af0dfb8673f46.68354130', 'QT-5b06322c4b8739.03956206', 'C'),
('MCQ-5b308a321e4094.89399147', 'MB-5af0dfb8673f46.68354130', 'QT-5b30899c518aa4.06333254', 'D'),
('MCQ-5b30905447da75.84487212', 'MB-5af0dfb8673f46.68354130', 'QT-5b3089a6c844c3.97081302', 'D'),
('MCQ-5b3091be67d982.44204228', 'MB-5af0dfb8673f46.68354130', 'QT-5b3089a6c844c3.97081302', 'B');

-- --------------------------------------------------------

--
-- Table structure for table `qr_section`
--

CREATE TABLE `qr_section` (
  `qr_ID` varchar(100) NOT NULL,
  `qr_Title` varchar(100) NOT NULL,
  `qr_Description` varchar(250) NOT NULL,
  `qr_URL` varchar(150) NOT NULL,
  `qr_date` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `qr_section`
--

INSERT INTO `qr_section` (`qr_ID`, `qr_Title`, `qr_Description`, `qr_URL`, `qr_date`) VALUES
('QR-5aeebfd4733c66.27296106 ', 'Prototype one one', 'one 08/05/2018', 'http://www.224tech.com/sasPhp/findSection.php?id=QR-5aeebfd4733c66.27296106 ', ''),
('QR-5aeec714a92a37.30956598', 'try one', 'one', 'http://www.224tech.com/sasPhp/findSection.php?id=QR-5aeec714a92a37.30956598', ''),
('QR-5af0d879c4a045.10177742', 'try two', 'one', '', ''),
('QR-5af0e505c3b564.42351093', 'France', 'Paris', '', ''),
('QR-5b2b1436990e87.02876182', 'Today', ':-(hth Vishnu', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `question_ID` varchar(100) NOT NULL,
  `question_content` varchar(200) NOT NULL,
  `question_Type` varchar(50) NOT NULL,
  `qr_ID` varchar(100) NOT NULL,
  `answered` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`question_ID`, `question_content`, `question_Type`, `qr_ID`, `answered`) VALUES
('QT-5b062e5e7cd144.13745809', 'Where is Malaysia located?', 'MCQ', 'QR-5af0d879c4a045.10177742', 0),
('QT-5b062f5d484907.12737627', 'Where is Malaysia located?', 'MCQ', 'QR-5af0d879c4a045.10177742', 0),
('QT-5b0630a46c5592.36213502', 'Where is Malaysia located?', 'MCQ', 'QR-5aeec714a92a37.30956598', 0),
('QT-5b06322c4b8739.03956206', 'Where is Malaysia located?', 'MCQ', 'QR-5aeebfd4733c66.27296106 ', 1),
('QT-5b0785afdd8404.59255387', 'How must do you like my?', 'Rating', 'QR-5aeebfd4733c66.27296106 ', 1),
('QT-5b0785d09ee213.88030061', 'Gsbxhsn', 'MCQ', 'QR-5aeebfd4733c66.27296106 ', 1),
('QT-5b2c661d07da22.65900554', 'How must do you like Flutter?', 'Rating', 'QR-5aeebfd4733c66.27296106 ', 0),
('QT-5b2c6a40902b01.84764904', 'Why Malaysia?', 'MCQ', 'QR-5aeebfd4733c66.27296106', 0),
('QT-5b2c6b9d93a856.10388270', 'Fgfgh', 'MCQ', 'QR-5aeebfd4733c66.27296106 ', 1),
('QT-5b30899c518aa4.06333254', 'Quelle est la superficie de la Guinee?', 'MCQ', 'QR-5af0e505c3b564.42351093', 1),
('QT-5b3089a6c844c3.97081302', 'Quelle la superfici de la GuinÃ©e?', 'MCQ', 'QR-5af0e505c3b564.42351093', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `jsection`
--
ALTER TABLE `jsection`
  ADD PRIMARY KEY (`JS_UniqueID`);

--
-- Indexes for table `mcq_answer`
--
ALTER TABLE `mcq_answer`
  ADD PRIMARY KEY (`mcq_ID`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`member_ID`);

--
-- Indexes for table `member_answer`
--
ALTER TABLE `member_answer`
  ADD PRIMARY KEY (`ma_ID`);

--
-- Indexes for table `qr_section`
--
ALTER TABLE `qr_section`
  ADD PRIMARY KEY (`qr_ID`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`question_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
