-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 21 Des 2015 pada 10.26
-- Versi Server: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `swalayan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `barang`
--

CREATE TABLE IF NOT EXISTS `barang` (
`id_barang` int(10) NOT NULL,
  `nama_barang` varchar(200) NOT NULL,
  `harga` int(11) NOT NULL,
  `stok` int(11) NOT NULL,
  `tipe` varchar(100) NOT NULL,
  `berat` int(11) NOT NULL,
  `panjang` int(11) NOT NULL,
  `lebar` int(11) NOT NULL,
  `tinggi` int(11) NOT NULL,
  `keterangan` text NOT NULL,
  `tag` varchar(400) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `barang`
--

INSERT INTO `barang` (`id_barang`, `nama_barang`, `harga`, `stok`, `tipe`, `berat`, `panjang`, `lebar`, `tinggi`, `keterangan`, `tag`) VALUES
(1, 'Ballpoint Standard', 3000, 17, 'Pena', 10, 0, 1, 1, 'Lebih jelas', 'Pena, standard'),
(2, 'Agar-agar Sachet', 1000, 195, 'Bahan Kue', 10, 0, 1, 1, 'Kenyal, lembut dan enak', 'Agar-agar, Bahan kue'),
(3, 'Autan', 10000, 100, 'Obat-obatan', 20, 0, 20, 20, 'Nyamuk minggat', 'Autan, Obat-obatan '),
(4, 'Baterai Remot TV', 6000, 99, 'Peralatan Listrik', 10, 0, 10, 10, 'tahan lama', 'Baterai Remot TV, Peralatan LIstrik'),
(5, 'Bigen', 15000, 296, 'Kosmetik', 10, 0, 10, 20, 'Pewarna Rambut', 'Bigen, Kosmetik'),
(6, 'Kapur Ajaib', 1000, 1000, 'Perlengkapan Musiman', 12, 12, 12, 12, 'Ini Kapur Ajaib', 'Kapur Ajaib, Peralatan Musiman'),
(7, 'Kecap Manis', 6000, 6, 'Sembako', 1, 0, 1, 0, 'Kecap Manis dari Lada Pilihan', 'Kecap Manis, Sembako'),
(8, 'Kopi ABC', 1000, 0, 'Minuman', 20, 10, 10, 10, 'Wuenak tenan ni kopi', 'Kopi, Minuman'),
(9, 'Makanan Hewan', 20000, 10, 'Makanan Diawetkan', 30, 10, 10, 10, 'INI UNTUK HEWAN YAA!!', 'Makanan Hewan, Makanan Diawetkan'),
(10, '2 Tang', 25000, 91, 'Minuman', 30, 10, 10, 10, 'Air Mineral', '2 Tang, Minuman'),
(11, 'Minyak Goreng Avena', 20000, 100, 'Minyak Goreng', 20, 10, 10, 10, 'Minyak Goreng Kualitas Bagus', 'Minyak Goreng Avena, Minyak Goreng'),
(12, 'Obat Batuk', 10000, 10, 'Obat-obatan', 10, 10, 10, 10, 'Meringankan Batuk Berdahak', 'Obat Batuk, Obat-obatan'),
(13, 'Permen Coklat', 1000, 96, 'Permen', 10, 10, 10, 10, 'Enak', 'Permen Coklat, Permen'),
(14, 'Rokok Aroma', 12000, 8, 'Rokok', 10, 10, 10, 10, 'Tidak Baik untuk kesehatan', 'Rokok Aroma, Rokok'),
(15, 'Sabun Bayi', 10000, 9, 'Perawatan Tubuh', 10, 10, 10, 10, 'Kulit bayi akan terasa lebih halus dan harum', 'Sabun Bayi, Perawatan Tubuh'),
(16, 'Sabun Mandi', 5000, 9, 'Perawatan Tubuh', 10, 10, 10, 10, 'Perlindungan Keluarga', 'Sabun Mandi, Perawatan Tubuh'),
(17, 'Sarden', 6000, 10, 'Sembako', 10, 10, 10, 10, 'Makanan Kaleng', 'Sarden, Sembako'),
(18, 'Susu Bebelac 1', 25000, 7, 'Susu', 10, 10, 10, 10, 'Susu untuk balita', 'Susu Bebelac 1, Susu'),
(19, 'Aqua', 2000, 200, '1', 20, 20, 20, 20, 'dari pegunungan asli', 'Minuman, mineral');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pelanggan`
--

CREATE TABLE IF NOT EXISTS `pelanggan` (
`id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `alamat` text NOT NULL,
  `kecamatan` varchar(100) NOT NULL,
  `no_telepon` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `pelanggan`
--

INSERT INTO `pelanggan` (`id`, `username`, `password`, `nama`, `alamat`, `kecamatan`, `no_telepon`) VALUES
(1, 'zikri', 'zikri', 'Zikri Khairan', 'Padang', 'Kuranji', '085274144428'),
(2, 'suci', 'suci', 'Suci Ramadhani Putri', 'Padang', 'Pauh', '0888888888'),
(3, 'coti', 'coti', 'Desyolawati', 'Padang', 'Kuranji', '09090909090'),
(4, 'tegar', 't', 't', '', 't', 't'),
(6, 'tegare', '14111997', 'tegar', 'tegar', 'kuranji', '1'),
(8, 'tegara', '14111997', 'tegar', 'tegar', 'kuranji', '1'),
(9, 'tegares', '14111997', 'tegar', 'tegar', 'kuranji', '1'),
(10, 'ishaq', 'ishaq', 'Ishaq Fachrozi', 'Dimana sajaboleeh', 'Padang Timur', '082018081802'),
(12, 'tegaress', '14111997', 'tegar', 'tegar', 'kuranji', '1');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembayaran`
--

CREATE TABLE IF NOT EXISTS `pembayaran` (
`id` int(11) NOT NULL,
  `id_transaksi` int(11) NOT NULL,
  `total_belanja` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `alamat` varchar(500) NOT NULL,
  `no_hp` varchar(15) NOT NULL,
  `kota` varchar(64) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `pembayaran`
--

INSERT INTO `pembayaran` (`id`, `id_transaksi`, `total_belanja`, `nama`, `alamat`, `no_hp`, `kota`) VALUES
(1, 4, 26000, '', '0', '0', '0'),
(2, 4, 26000, '', '0', '0', '0'),
(3, 4, 26000, '', '0', '0', '0'),
(4, 4, 26000, '', '0', '0', '0'),
(5, 5, 26000, '', '0', '0', '0'),
(6, 12, 9000, '', '0', '0', '0'),
(7, 12, 9000, '', '0', '0', '0'),
(8, 12, 9000, '', '0', '0', '0'),
(9, 12, 9000, '', '0', '0', '0'),
(10, 12, 9000, '', '0', '0', '0'),
(11, 12, 9000, '', '0', '0', '0'),
(12, 12, 9000, '', '0', '0', '0'),
(13, 12, 9000, '', '0', '0', '0'),
(14, 12, 9000, '', '0', '0', '0'),
(15, 12, 9000, '', '0', '0', '0'),
(16, 12, 9000, '', '0', '0', '0'),
(17, 14, 10, '', '0', '0', '0'),
(18, 19, 12000, '', '0', '0', '0'),
(19, 20, 15000, '', '0', '0', '0'),
(20, 21, 3000, '', '0', '0', '0'),
(21, 21, 3000, '', '0', '0', '0'),
(22, 21, 3000, '', '0', '0', '0'),
(23, 21, 3000, '', '0', '0', '0'),
(24, 22, 3000, '', '0', '0', '0'),
(25, 23, 3000, '', '0', '0', '0'),
(26, 24, 3000, '', '0', '0', '0'),
(27, 25, 3000, '', '0', '0', '0'),
(28, 26, 3000, '', '0', '0', '0'),
(29, 27, 1000, '', '0', '0', '0'),
(30, 28, 1000, '', '0', '0', '0'),
(31, 36, 26000, '', '0', '0', '0'),
(32, 41, 24000, 'Suci Ramadhani Putri', 'Padang', '0888888888', 'Padang Utara'),
(33, 47, 10000, 'Zikri Khairan', 'Padang', '085274144428', 'Padang Utara'),
(34, 48, 3000, 'Zikri Khairan', 'Padang', '085274144428', 'Padang Timur');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE IF NOT EXISTS `transaksi` (
`no` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `id_pelanggan` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `waktu_pesanan` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `waktu_diterima` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`no`, `id`, `id_pelanggan`, `id_barang`, `jumlah`, `waktu_pesanan`, `status`, `waktu_diterima`) VALUES
(1, 1, 1, 5, 1, '2015-12-19 14:23:17', 1, '2015-12-21 02:48:29'),
(2, 1, 1, 5, 1, '2015-12-19 14:23:17', 1, '2015-12-21 02:48:29'),
(3, 1, 1, 5, 1, '2015-12-19 14:23:17', 1, '2015-12-21 02:48:29'),
(4, 1, 1, 5, 1, '2015-12-19 14:23:17', 1, '2015-12-21 02:48:29'),
(5, 1, 1, 5, 1, '2015-12-19 14:23:17', 1, '2015-12-21 02:48:29'),
(6, 1, 1, 5, 1, '2015-12-19 14:23:17', 1, '2015-12-21 02:48:29'),
(7, 2, 1, 5, 1, '2015-12-19 14:25:34', 1, '2015-12-21 02:48:55'),
(8, 2, 1, 5, 1, '2015-12-19 14:25:34', 1, '2015-12-21 02:48:55'),
(9, 2, 1, 5, 1, '2015-12-19 14:25:34', 1, '2015-12-21 02:48:55'),
(10, 3, 1, 3, 1, '2015-12-19 18:35:47', 0, NULL),
(11, 4, 1, 4, 1, '2015-12-19 18:46:03', 1, '2015-12-21 02:49:04'),
(12, 5, 1, 4, 1, '2015-12-19 18:47:27', 0, NULL),
(13, 6, 1, 4, 1, '2015-12-19 19:10:40', 1, '2015-12-21 12:24:43'),
(14, 7, 1, 2, 1, '2015-12-20 22:53:05', 0, NULL),
(15, 7, 1, 1, 1, '2015-12-20 22:53:05', 0, NULL),
(16, 8, 1, 5, 1, '2015-12-20 22:56:55', 0, NULL),
(17, 9, 1, 1, 1, '2015-12-20 23:07:59', 0, NULL),
(18, 9, 1, 1, 1, '2015-12-20 23:07:59', 0, NULL),
(19, 10, 1, 1, 1, '2015-12-20 23:09:06', 0, NULL),
(20, 11, 1, 1, 1, '2015-12-20 23:09:23', 0, NULL),
(21, 11, 1, 5, 1, '2015-12-20 23:09:23', 0, NULL),
(22, 11, 1, 5, 1, '2015-12-20 23:09:23', 0, NULL),
(23, 11, 1, 5, 1, '2015-12-20 23:09:23', 0, NULL),
(24, 11, 1, 2, 1, '2015-12-20 23:09:23', 0, NULL),
(25, 11, 1, 2, 1, '2015-12-20 23:09:23', 0, NULL),
(26, 11, 1, 1, 1, '2015-12-20 23:09:23', 0, NULL),
(27, 12, 1, 1, 1, '2015-12-20 23:12:17', 0, NULL),
(28, 12, 1, 5, 1, '2015-12-20 23:12:17', 0, NULL),
(29, 12, 1, 5, 1, '2015-12-20 23:12:17', 0, NULL),
(30, 12, 1, 1, 1, '2015-12-20 23:12:20', 0, NULL),
(31, 12, 1, 5, 1, '2015-12-20 23:12:20', 0, NULL),
(32, 12, 1, 5, 1, '2015-12-20 23:12:20', 0, NULL),
(33, 12, 1, 1, 1, '2015-12-20 23:12:50', 0, NULL),
(34, 12, 1, 5, 1, '2015-12-20 23:12:50', 0, NULL),
(35, 12, 1, 5, 1, '2015-12-20 23:12:50', 0, NULL),
(36, 12, 1, 1, 1, '2015-12-20 23:12:50', 0, NULL),
(37, 12, 1, 5, 1, '2015-12-20 23:12:50', 0, NULL),
(38, 12, 1, 5, 1, '2015-12-20 23:12:50', 0, NULL),
(39, 12, 1, 1, 1, '2015-12-20 23:12:50', 0, NULL),
(40, 12, 1, 5, 1, '2015-12-20 23:12:50', 0, NULL),
(41, 12, 1, 5, 1, '2015-12-20 23:12:50', 0, NULL),
(42, 12, 1, 1, 1, '2015-12-20 23:12:50', 0, NULL),
(43, 12, 1, 5, 1, '2015-12-20 23:12:50', 0, NULL),
(44, 12, 1, 5, 1, '2015-12-20 23:12:50', 0, NULL),
(45, 12, 1, 1, 1, '2015-12-20 23:12:50', 0, NULL),
(46, 12, 1, 5, 1, '2015-12-20 23:12:50', 0, NULL),
(47, 12, 1, 1, 1, '2015-12-20 23:12:50', 0, NULL),
(48, 12, 1, 5, 1, '2015-12-20 23:12:50', 0, NULL),
(49, 12, 1, 5, 1, '2015-12-20 23:12:50', 0, NULL),
(50, 12, 1, 1, 1, '2015-12-20 23:12:50', 0, NULL),
(51, 12, 1, 5, 1, '2015-12-20 23:12:50', 0, NULL),
(52, 12, 1, 5, 1, '2015-12-20 23:12:50', 0, NULL),
(53, 12, 1, 5, 1, '2015-12-20 23:12:50', 0, NULL),
(54, 12, 1, 1, 1, '2015-12-20 23:12:51', 0, NULL),
(55, 12, 1, 5, 1, '2015-12-20 23:12:51', 0, NULL),
(56, 12, 1, 5, 1, '2015-12-20 23:12:51', 0, NULL),
(57, 12, 1, 1, 1, '2015-12-20 23:12:52', 0, NULL),
(58, 12, 1, 5, 1, '2015-12-20 23:12:52', 0, NULL),
(59, 12, 1, 5, 1, '2015-12-20 23:12:52', 0, NULL),
(60, 13, 1, 1, 1, '2015-12-21 03:06:28', 0, NULL),
(61, 13, 1, 1, 1, '2015-12-21 03:12:23', 0, NULL),
(62, 13, 1, 1, 1, '2015-12-21 03:12:23', 0, NULL),
(63, 13, 1, 1, 1, '2015-12-21 03:12:23', 0, NULL),
(64, 14, 1, 1, 1, '2015-12-21 03:13:07', 0, NULL),
(65, 14, 1, 1, 1, '2015-12-21 03:13:07', 0, NULL),
(66, 14, 1, 1, 1, '2015-12-21 03:13:07', 0, NULL),
(67, 14, 1, 1, 1, '2015-12-21 03:13:07', 0, NULL),
(68, 14, 1, 1, 1, '2015-12-21 03:13:07', 0, NULL),
(69, 14, 1, 1, 1, '2015-12-21 03:13:07', 0, NULL),
(70, 14, 1, 1, 1, '2015-12-21 03:13:07', 0, NULL),
(71, 15, 1, 1, 1, '2015-12-21 03:15:17', 0, NULL),
(72, 15, 1, 1, 1, '2015-12-21 03:15:17', 0, NULL),
(73, 15, 1, 1, 1, '2015-12-21 03:15:17', 0, NULL),
(74, 16, 1, 1, 1, '2015-12-21 03:18:03', 0, NULL),
(75, 17, 1, 1, 1, '2015-12-21 03:19:32', 0, NULL),
(76, 18, 1, 1, 1, '2015-12-21 03:23:06', 0, NULL),
(77, 18, 1, 1, 1, '2015-12-21 03:23:06', 0, NULL),
(78, 19, 1, 1, 1, '2015-12-21 03:28:34', 0, NULL),
(79, 19, 1, 1, 1, '2015-12-21 03:28:34', 0, NULL),
(80, 19, 1, 1, 1, '2015-12-21 03:28:34', 0, NULL),
(81, 19, 1, 1, 1, '2015-12-21 03:28:34', 0, NULL),
(82, 19, 1, 1, 1, '2015-12-21 03:28:42', 0, NULL),
(83, 19, 1, 1, 1, '2015-12-21 03:28:42', 0, NULL),
(84, 19, 1, 1, 1, '2015-12-21 03:28:42', 0, NULL),
(85, 19, 1, 1, 1, '2015-12-21 03:28:42', 0, NULL),
(86, 20, 1, 1, 1, '2015-12-21 03:29:35', 0, NULL),
(87, 20, 1, 1, 1, '2015-12-21 03:29:35', 0, NULL),
(88, 20, 1, 1, 1, '2015-12-21 03:29:35', 0, NULL),
(89, 20, 1, 1, 1, '2015-12-21 03:29:35', 0, NULL),
(90, 20, 1, 1, 1, '2015-12-21 03:29:35', 0, NULL),
(91, 20, 1, 1, 1, '2015-12-21 03:29:40', 0, NULL),
(92, 20, 1, 1, 1, '2015-12-21 03:29:40', 0, NULL),
(93, 20, 1, 1, 1, '2015-12-21 03:29:40', 0, NULL),
(94, 20, 1, 1, 1, '2015-12-21 03:29:40', 0, NULL),
(95, 20, 1, 1, 1, '2015-12-21 03:29:40', 0, NULL),
(96, 21, 1, 1, 1, '2015-12-21 03:31:27', 0, NULL),
(97, 21, 1, 1, 1, '2015-12-21 03:31:31', 0, NULL),
(98, 21, 1, 1, 1, '2015-12-21 03:31:35', 0, NULL),
(99, 22, 1, 5, 1, '2015-12-21 03:33:08', 0, NULL),
(100, 22, 1, 5, 1, '2015-12-21 03:33:10', 0, NULL),
(101, 23, 1, 5, 1, '2015-12-21 03:34:37', 0, NULL),
(102, 23, 1, 5, 1, '2015-12-21 03:34:38', 0, NULL),
(103, 24, 1, 5, 1, '2015-12-21 03:35:14', 0, NULL),
(104, 24, 1, 5, 1, '2015-12-21 03:35:14', 0, NULL),
(105, 25, 1, 5, 1, '2015-12-21 03:35:37', 0, NULL),
(106, 25, 1, 5, 1, '2015-12-21 03:35:39', 0, NULL),
(107, 26, 1, 5, 1, '2015-12-21 03:37:45', 0, NULL),
(108, 26, 1, 5, 1, '2015-12-21 03:37:50', 0, NULL),
(109, 27, 1, 2, 1, '2015-12-21 03:38:50', 0, NULL),
(110, 27, 1, 2, 1, '2015-12-21 03:38:52', 0, NULL),
(111, 28, 1, 2, 1, '2015-12-21 03:41:37', 0, NULL),
(112, 28, 1, 2, 1, '2015-12-21 03:41:39', 0, NULL),
(113, 29, 1, 5, 1, '2015-12-21 03:43:20', 0, NULL),
(114, 29, 1, 5, 1, '2015-12-21 03:43:28', 0, NULL),
(115, 29, 1, 5, 1, '2015-12-21 03:43:29', 0, NULL),
(116, 29, 1, 5, 1, '2015-12-21 03:43:30', 0, NULL),
(117, 29, 1, 5, 1, '2015-12-21 03:43:30', 0, NULL),
(118, 29, 1, 5, 1, '2015-12-21 03:43:30', 0, NULL),
(119, 29, 1, 5, 1, '2015-12-21 03:43:31', 0, NULL),
(120, 29, 1, 5, 1, '2015-12-21 03:43:32', 0, NULL),
(121, 30, 1, 5, 1, '2015-12-21 03:50:02', 0, NULL),
(122, 31, 1, 5, 1, '2015-12-21 03:52:56', 0, NULL),
(123, 31, 1, 5, 1, '2015-12-21 03:52:56', 0, NULL),
(124, 32, 1, 5, 1, '2015-12-21 03:54:08', 0, NULL),
(125, 33, 1, 5, 1, '2015-12-21 03:56:47', 0, NULL),
(126, 34, 1, 5, 1, '2015-12-21 03:58:42', 0, NULL),
(127, 35, 1, 5, 1, '2015-12-21 04:01:59', 0, NULL),
(128, 36, 1, 4, 1, '2015-12-21 04:06:42', 0, NULL),
(129, 37, 1, 2, 1, '2015-12-21 09:25:01', 0, NULL),
(130, 37, 1, 2, 1, '2015-12-21 09:25:01', 0, NULL),
(131, 38, 1, 2, 1, '2015-12-21 09:26:21', 0, NULL),
(132, 38, 1, 2, 1, '2015-12-21 09:26:21', 0, NULL),
(133, 39, 1, 5, 1, '2015-12-21 09:26:39', 0, NULL),
(134, 39, 1, 5, 1, '2015-12-21 09:26:39', 0, NULL),
(135, 39, 1, 5, 1, '2015-12-21 09:26:39', 0, NULL),
(136, 39, 1, 5, 1, '2015-12-21 09:26:39', 0, NULL),
(137, 39, 1, 5, 1, '2015-12-21 09:26:39', 0, NULL),
(138, 39, 1, 5, 1, '2015-12-21 09:26:39', 0, NULL),
(139, 39, 1, 5, 1, '2015-12-21 09:26:40', 0, NULL),
(140, 40, 1, 6, 1, '2015-12-21 09:27:09', 0, NULL),
(141, 40, 1, 6, 1, '2015-12-21 09:27:09', 0, NULL),
(142, 40, 1, 2, 1, '2015-12-21 09:27:09', 0, NULL),
(143, 40, 1, 6, 1, '2015-12-21 09:27:09', 0, NULL),
(144, 40, 1, 2, 1, '2015-12-21 09:27:09', 0, NULL),
(145, 40, 1, 2, 1, '2015-12-21 09:27:09', 0, NULL),
(146, 41, 2, 5, 1, '2015-12-21 09:53:55', 0, NULL),
(147, 41, 2, 4, 1, '2015-12-21 09:53:55', 0, NULL),
(148, 41, 2, 1, 1, '2015-12-21 09:53:55', 0, NULL),
(149, 42, 1, 10, 1, '2015-12-21 10:29:35', 0, NULL),
(150, 42, 1, 8, 1, '2015-12-21 10:29:35', 0, NULL),
(151, 42, 1, 8, 1, '2015-12-21 10:29:38', 0, NULL),
(152, 42, 1, 10, 1, '2015-12-21 10:29:38', 0, NULL),
(153, 43, 1, 8, 1, '2015-12-21 10:30:30', 0, NULL),
(154, 44, 1, 10, 1, '2015-12-21 10:33:33', 0, NULL),
(155, 45, 1, 10, 1, '2015-12-21 10:34:06', 0, NULL),
(156, 45, 1, 10, 1, '2015-12-21 10:34:13', 0, NULL),
(157, 46, 10, 8, 1, '2015-12-21 10:40:09', 0, NULL),
(158, 46, 10, 8, 1, '2015-12-21 10:40:15', 0, NULL),
(159, 47, 1, 3, 1, '2015-12-21 10:40:56', 0, NULL),
(160, 47, 1, 3, 1, '2015-12-21 10:41:24', 0, NULL),
(161, 48, 1, 1, 1, '2015-12-21 10:42:47', 0, NULL),
(162, 47, 10, 8, 1, '2015-12-21 10:42:53', 0, NULL),
(163, 47, 10, 10, 1, '2015-12-21 10:42:53', 0, NULL),
(164, 48, 1, 1, 1, '2015-12-21 10:42:53', 0, NULL),
(165, 47, 10, 8, 1, '2015-12-21 10:43:08', 0, NULL),
(166, 47, 10, 10, 1, '2015-12-21 10:43:08', 0, NULL),
(167, 49, 1, 2, 1, '2015-12-21 10:44:13', 0, NULL),
(168, 49, 1, 2, 1, '2015-12-21 10:44:16', 0, NULL),
(169, 50, 1, 10, 1, '2015-12-21 10:45:57', 0, NULL),
(170, 50, 1, 10, 1, '2015-12-21 10:46:02', 0, NULL),
(171, 51, 1, 1, 1, '2015-12-21 10:48:03', 0, NULL),
(172, 51, 1, 1, 1, '2015-12-21 10:48:05', 0, NULL),
(173, 52, 1, 1, 1, '2015-12-21 12:23:13', 0, NULL),
(174, 52, 1, 1, 1, '2015-12-21 12:23:14', 0, NULL),
(175, 53, 1, 8, 1, '2015-12-21 13:54:35', 0, NULL),
(176, 53, 1, 2, 1, '2015-12-21 13:54:35', 0, NULL),
(177, 53, 1, 18, 1, '2015-12-21 13:54:35', 0, NULL),
(178, 53, 1, 2, 1, '2015-12-21 13:54:40', 0, NULL),
(179, 53, 1, 18, 1, '2015-12-21 13:54:40', 0, NULL),
(180, 53, 1, 8, 1, '2015-12-21 13:54:40', 0, NULL),
(181, 54, 1, 7, 1, '2015-12-21 14:11:34', 0, NULL),
(182, 54, 1, 7, 1, '2015-12-21 14:11:34', 0, NULL),
(183, 54, 1, 7, 1, '2015-12-21 14:11:35', 0, NULL),
(184, 54, 1, 7, 1, '2015-12-21 14:11:35', 0, NULL),
(185, 55, 2, 15, 1, '2015-12-21 16:12:50', 0, NULL),
(186, 55, 2, 16, 1, '2015-12-21 16:12:50', 0, NULL),
(187, 55, 2, 15, 1, '2015-12-21 16:12:51', 0, NULL),
(188, 55, 2, 16, 1, '2015-12-21 16:12:51', 0, NULL),
(189, 56, 1, 14, 1, '2015-12-21 16:19:45', 1, '2015-12-21 16:25:28'),
(190, 56, 1, 13, 2, '2015-12-21 16:19:45', 1, '2015-12-21 16:25:28'),
(191, 56, 1, 14, 1, '2015-12-21 16:19:51', 1, '2015-12-21 16:25:28'),
(192, 56, 1, 13, 2, '2015-12-21 16:19:51', 1, '2015-12-21 16:25:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
 ADD PRIMARY KEY (`id_barang`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `pembayaran`
--
ALTER TABLE `pembayaran`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
 ADD PRIMARY KEY (`no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
MODIFY `id_barang` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `pembayaran`
--
ALTER TABLE `pembayaran`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
MODIFY `no` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=193;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
