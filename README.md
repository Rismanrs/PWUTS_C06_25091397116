Rifam Sweets — Manajemen Promo
1. Tentang Proyek
Rifam Sweets adalah website toko roti dan kue yang dibuat untuk memenuhi tugas UTS Pemrograman Web. Pengerjaan proyek ini berfokus pada halaman admin untuk mengelola promo, mulai dari menampilkan daftar promo, menambahkan promo, mengedit, menghapus, hingga memfilter promo berdasarkan statusnya.

Website dibuat menggunakan HTML, CSS, JavaScript, jQuery, PHP, dan MySQL. Data disimpan dalam database toko_roti_uts, sedangkan XAMPP digunakan untuk menjalankan aplikasi secara lokal.

2. Fitur
- Menampilkan daftar promo yang tersimpan di database.
- Menambahkan promo baru.
- Mengedit data promo.
- Menghapus promo dengan konfirmasi.
- Memfilter promo berdasarkan status aktif dan nonaktif.
- Menampilkan ringkasan total promo, promo aktif, dan promo nonaktif jika bagian ringkasan tersedia di halaman.
- Memvalidasi input formulir menggunakan JavaScript/jQuery dan PHP sesuai implementasi.

3. Teknologi yang Digunakan
- HTML: membuat struktur halaman dan formulir.
- CSS: mengatur tampilan halaman, kartu promo, tombol, dan layout responsif.
- JavaScript: mengatur interaksi pada halaman.
- jQuery: mempermudah pengelolaan elemen dan event.
- AJAX: mengirim permintaan ke PHP tanpa memuat ulang seluruh halaman.
- PHP: memproses data dan menghubungkan aplikasi ke database.
- MySQL: menyimpan data admin, kategori, produk, dan promo.
- XAMPP: menjalankan server lokal.
- phpMyAdmin: mengelola database melalui browser.


4. Struktur Folder
PWUTS_C06_25091397116/
├── css/
│   └── style.css
├── images/
│   └── banner-roti.jpg
├── js/
│   ├── form-promo.js
│   ├── main.js
│   └── promo.js
├── form-promo.html
├── index.html
├── koneksi.php
├── promo.html
├── README.md
└── simpan-promo.php

Fungsi File
- index.html — halaman dashboard admin.
- promo.html — halaman daftar dan pengelolaan promo.
- form-promo.html — formulir untuk menambah atau mengedit promo.
- css/style.css — mengatur tampilan website.
- images/banner-roti.jpg — gambar banner.
- js/main.js — mengatur navigasi halaman sesuai implementasi.
- js/promo.js — memuat dan menampilkan data promo, filter status, ringkasan promo, serta proses hapus sesuai implementasi.
- js/form-promo.js — mengatur perilaku dan validasi formulir.
- koneksi.php — koneksi ke database MySQL.
- simpan-promo.php — memproses permintaan data promo dari halaman.
- README.md — dokumentasi proyek.

5. Database
Nama database: toko_roti_uts
Database terdiri dari empat tabel:
- admin — menyimpan data admin.
- kategori — menyimpan kategori produk, seperti Roti, Pastry, dan Kue.
- produk — menyimpan data produk, harga, deskripsi, alergen, gambar, dan ketersediaan.
- promo — menyimpan informasi promo dan statusnya.
Kolom Tabel promo
- id — ID unik promo yang dibuat otomatis.
- admin_id — ID admin yang membuat promo.
- product_id — ID produk yang terkait dengan promo.
- judul — nama promo.
- deskripsi — penjelasan promo.
- diskon — besar diskon dalam persen.
- produk — nama produk yang ditampilkan pada promo.
- tanggal_mulai — tanggal mulai promo.
- tanggal_selesai — tanggal akhir promo.
- aktif — 1 berarti aktif dan 0 berarti nonaktif.
- created_at — waktu data promo dibuat.

6. SQL Database
Membuat database dan tabel
CREATE DATABASE IF NOT EXISTS toko_roti_uts
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE toko_roti_uts;

CREATE TABLE IF NOT EXISTS admin (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nama VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS kategori (
    id_kategori INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS produk (
    id_produk INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    category_id INT NOT NULL,
    nama VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    alergen TEXT,
    harga DECIMAL(12,2) NOT NULL DEFAULT 0,
    gambar VARCHAR(255),
    ketersediaan TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admin(id_admin),
    FOREIGN KEY (category_id) REFERENCES kategori(id_kategori)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS promo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    product_id INT NOT NULL,
    judul VARCHAR(100) NOT NULL,
    deskripsi TEXT NOT NULL,
    diskon INT NOT NULL,
    produk VARCHAR(100) NOT NULL,
    tanggal_mulai DATE NOT NULL,
    tanggal_selesai DATE NOT NULL,
    aktif TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admin(id_admin),
    FOREIGN KEY (product_id) REFERENCES produk(id_produk)
) ENGINE=InnoDB;


Menambahkan data awal
USE toko_roti_uts;

INSERT INTO admin (username, password, nama)
VALUES ('admin', 'admin123', 'Admin Rifam Sweets');

INSERT INTO kategori (nama) VALUES
('Roti'),
('Pastry'),
('Kue');

INSERT INTO produk
(admin_id, category_id, nama, deskripsi, alergen, harga, gambar, ketersediaan)
VALUES
(1, 1, 'Roti Cokelat', 'Roti lembut dengan isian cokelat', 'Gluten, susu', 12000, NULL, 1),
(1, 2, 'Croissant', 'Pastry renyah berlapis', 'Gluten, susu', 18000, NULL, 1),
(1, 3, 'Muffin Cokelat', 'Muffin cokelat untuk teman minum teh', 'Gluten, telur, susu', 15000, NULL, 1),
(1, 2, 'Croissant Butter', 'Croissant dengan rasa butter', 'Gluten, susu', 18000, NULL, 1),
(1, 1, 'Roti Manis Isi 3', 'Paket tiga roti manis', 'Gluten, susu', 30000, NULL, 1),
(1, 3, 'Strawberry Tart', 'Tart dengan topping stroberi', 'Gluten, telur, susu', 25000, NULL, 1);

INSERT INTO promo
(admin_id, product_id, judul, deskripsi, diskon, produk, tanggal_mulai, tanggal_selesai, aktif)
VALUES
(1, 4, 'Promo Pembukaan', 'Diskon spesial pembukaan Rifam Sweets', 20, 'Croissant Butter', '2026-10-01', '2026-11-30', 1),
(1, 1, 'Sweet Weekend', 'Nikmati promo roti pilihan', 15, 'Roti Cokelat', '2026-10-24', '2026-11-30', 1),
(1, 5, 'Paket Hemat', 'Harga spesial paket roti manis', 10, 'Roti Manis Isi 3', '2026-10-01', '2026-12-15', 1),
(1, 6, 'Promo Spesial', 'Promo yang sudah berakhir', 30, 'Strawberry Tart', '2026-08-01', '2026-08-31', 0);

7. Cara Menjalankan Website
- Buka XAMPP, lalu jalankan Apache dan MySQL.
- Simpan folder proyek PWUTS_C06_25091397116 di dalam folder htdocs.
- Buka http://localhost/phpmyadmin.
- Pilih tab SQL, lalu jalankan SQL pembuatan database dan tabel di atas.
- Jalankan SQL data awal satu kali jika ingin menggunakan data contoh.
- Buka koneksi.php, lalu pastikan nama database, username, dan password sesuai dengan konfigurasi MySQL lokal.
- Buka website melalui alamat berikut:
   http://localhost/PWUTS_C06_25091397116/index.html
- Masuk ke menu Kelola Promo untuk melihat dan mengelola data.

8. Cara Menggunakan Fitur Promo

Menambahkan promo
1. Buka menu Kelola Promo.
2. Klik Buat Promo.
3. Isi nama promo dan deskripsi.
4. Masukkan persentase diskon.
5. Isi nama produk.
6. Pilih tanggal mulai dan tanggal selesai.
7. Pilih status promo.
8. Klik Simpan Promo.

Mengedit promo
1. Pilih promo yang ingin diubah.
2. Klik Edit.
3. Periksa data yang muncul pada formulir.
4. Ubah data yang diperlukan.
5. Simpan perubahan.

Menghapus promo
1. Klik Hapus pada promo yang dipilih.
2. Baca pesan konfirmasi.
3. Pilih OK jika yakin ingin menghapus.
4. Daftar promo akan dimuat ulang setelah proses berhasil.

Memfilter promo
Pilih Semua Status, Aktif, atau Nonaktif pada pilihan filter. Daftar akan menampilkan promo sesuai status yang dipilih.

9. Cara Kerja Halaman
- promo.html menyediakan area untuk daftar promo dan kontrol filter.
- js/promo.js meminta data promo dari simpan-promo.php menggunakan AJAX/jQuery, lalu menampilkan data sebagai kartu.
- form-promo.html menyediakan formulir tambah dan edit.
- js/form-promo.js menangani interaksi dan validasi formulir sesuai kode yang diterapkan.
- koneksi.php menyediakan koneksi database.
- simpan-promo.php memproses permintaan dari halaman dan berkomunikasi dengan database.
- js/main.js mengatur navigasi halaman sesuai implementasi proyek.

10. Validasi Data
- Nama promo dan deskripsi harus diisi.
- Diskon harus berada pada rentang 1–100.
- Nama produk dan tanggal promo harus diisi.
- Tanggal selesai sebaiknya tidak lebih awal daripada tanggal mulai.
- Status promo menggunakan 1 untuk aktif dan 0 untuk nonaktif.
- Validasi perlu dilakukan di sisi browser dan di PHP agar data yang tidak sesuai tidak tersimpan.