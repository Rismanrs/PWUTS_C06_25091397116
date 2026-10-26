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
    gambar VARCHAR(255) DEFAULT NULL,
    ketersediaan TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_produk_admin
        FOREIGN KEY (admin_id) REFERENCES admin(id_admin),
    CONSTRAINT fk_produk_kategori
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
    CONSTRAINT fk_promo_admin
        FOREIGN KEY (admin_id) REFERENCES admin(id_admin),
    CONSTRAINT fk_promo_produk
        FOREIGN KEY (product_id) REFERENCES produk(id_produk)
) ENGINE=InnoDB;

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