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
├── js/
│   ├── form-promo.js
│   ├── main.js
│   └── promo.js
├── images/
│   └── banner-roti.jpg
├── index.html
├── promo.html
├── form-promo.html
├── koneksi.php
├── simpan-promo.php
├── database.sql
└── README.md

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

6. Cara Menjalankan Website
1. Buka XAMPP, lalu jalankan Apache dan MySQL.
2. Letakkan folder proyek PWUTS_C06_25091397116 di direktori htdocs.
3. Buka http://localhost/phpmyadmin.
4. Pilih menu Import, lalu pilih file database.sql dari folder proyek.
5. Jalankan proses import dan pastikan database toko_roti_uts berhasil dibuat.
6. Periksa konfigurasi koneksi database pada koneksi.php.
7. Buka aplikasi melalui http://localhost/PWUTS_C06_25091397116/index.html .


7. Cara Menggunakan Fitur Promo
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

8. Cara Kerja Halaman
- promo.html menyediakan area untuk daftar promo dan kontrol filter.
- js/promo.js meminta data promo dari simpan-promo.php menggunakan AJAX/jQuery, lalu menampilkan data sebagai kartu.
- form-promo.html menyediakan formulir tambah dan edit.
- js/form-promo.js menangani interaksi dan validasi formulir sesuai kode yang diterapkan.
- koneksi.php menyediakan koneksi database.
- simpan-promo.php memproses permintaan dari halaman dan berkomunikasi dengan database.
- js/main.js mengatur navigasi halaman sesuai implementasi proyek.

9. Validasi Data
- Nama promo dan deskripsi harus diisi.
- Diskon harus berada pada rentang 1–100.
- Nama produk dan tanggal promo harus diisi.
- Tanggal selesai sebaiknya tidak lebih awal daripada tanggal mulai.
- Status promo menggunakan 1 untuk aktif dan 0 untuk nonaktif.
- Validasi perlu dilakukan di sisi browser dan di PHP agar data yang tidak sesuai tidak tersimpan.