<?php
require_once "koneksi.php";

header("Content-Type: text/html; charset=UTF-8");

// DETAIL PROMO UNTUK EDIT
if ($_SERVER["REQUEST_METHOD"] === "GET" && ($_GET["aksi"] ?? "") === "detail") {
    header("Content-Type: application/json; charset=UTF-8");
    $id = filter_input(INPUT_GET, "id", FILTER_VALIDATE_INT);

    if (!$id || $id < 1) {
        http_response_code(400);
        echo json_encode(["pesan" => "ID promo tidak valid."]);
        exit;
    }

    $stmt = mysqli_prepare($conn,
        "SELECT p.id, p.judul, p.deskripsi, p.diskon,
                p.product_id, pr.nama AS produk,
                p.tanggal_mulai, p.tanggal_selesai, p.aktif
         FROM promo p
         JOIN produk pr ON p.product_id = pr.id_produk
         WHERE p.id = ?"
    );
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $promo = mysqli_fetch_assoc($result);

    if (!$promo) {
        http_response_code(404);
        echo json_encode(["pesan" => "Promo tidak ditemukan."]);
    } else {
        echo json_encode($promo);
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
    exit;
}

// DAFTAR PROMO
if ($_SERVER["REQUEST_METHOD"] === "GET" && ($_GET["aksi"] ?? "") === "daftar") {
    header("Content-Type: application/json; charset=UTF-8");

    $sql = "SELECT p.id, p.judul, p.deskripsi, p.diskon,
                   p.product_id, pr.nama AS produk,
                   p.tanggal_mulai, p.tanggal_selesai, p.aktif
            FROM promo p
            JOIN produk pr ON p.product_id = pr.id_produk
            ORDER BY p.id DESC";

    $result = mysqli_query($conn, $sql);
    $data = [];

    if (!$result) {
        http_response_code(500);
        echo json_encode(["pesan" => "Gagal mengambil data promo."]);
        exit;
    }

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    echo json_encode($data);
    mysqli_close($conn);
    exit;
}

// TAMBAH DAN EDIT PROMO
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.html");
    exit;
}

$judul = trim($_POST["judul"] ?? "");
$deskripsi = trim($_POST["deskripsi"] ?? "");
$diskon = $_POST["diskon"] ?? "";
$produk = trim($_POST["produk"] ?? "");
$mulai = $_POST["tanggal_mulai"] ?? "";
$selesai = $_POST["tanggal_selesai"] ?? "";
$aktif = $_POST["aktif"] ?? "1";
$idInput = $_POST["id"] ?? "";

if ($judul === "" || $deskripsi === "" || $produk === "") {
    die("Semua informasi wajib diisi.");
}

if (!is_numeric($diskon) || $diskon < 1 || $diskon > 100 || (float)$diskon != (int)$diskon) {
    die("Diskon harus bilangan bulat antara 1 sampai 100%.");
}
$diskon = (int)$diskon;

$tanggalMulai = DateTime::createFromFormat("!Y-m-d", $mulai);
$tanggalSelesai = DateTime::createFromFormat("!Y-m-d", $selesai);

if (!$tanggalMulai || $tanggalMulai->format("Y-m-d") !== $mulai ||
    !$tanggalSelesai || $tanggalSelesai->format("Y-m-d") !== $selesai ||
    $selesai < $mulai) {
    die("Periksa kembali tanggal promo.");
}

if (!in_array($aktif, ["0", "1"], true)) {
    die("Status promo tidak valid.");
}
$aktif = (int)$aktif;

// Cari produk berdasarkan nama yang dipilih/diisi
$stmt = mysqli_prepare($conn, "SELECT id_produk FROM produk WHERE nama = ? LIMIT 1");
mysqli_stmt_bind_param($stmt, "s", $produk);
mysqli_stmt_execute($stmt);
$resultProduk = mysqli_stmt_get_result($stmt);
$dataProduk = mysqli_fetch_assoc($resultProduk);
mysqli_stmt_close($stmt);

if (!$dataProduk) {
    die("Produk tidak ditemukan. Gunakan nama produk yang sudah terdaftar di database.");
}
$productId = (int)$dataProduk["id_produk"];

// Admin sementara: ID 1
$adminId = 1;
$id = null;

if ($idInput !== "") {
    $id = filter_var($idInput, FILTER_VALIDATE_INT);
    if ($id === false || $id < 1) {
        die("ID promo tidak valid.");
    }
}

if ($id !== null) {
    $sql = "UPDATE promo
            SET judul = ?, deskripsi = ?, diskon = ?, produk = ?,
                product_id = ?, admin_id = ?, tanggal_mulai = ?,
                tanggal_selesai = ?, aktif = ?
            WHERE id = ?";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ssisiissii",
        $judul, $deskripsi, $diskon, $produk,
        $productId, $adminId, $mulai, $selesai, $aktif, $id
    );
} else {
    $sql = "INSERT INTO promo
            (judul, deskripsi, diskon, produk, product_id, admin_id,
             tanggal_mulai, tanggal_selesai, aktif)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ssisiissi",
        $judul, $deskripsi, $diskon, $produk,
        $productId, $adminId, $mulai, $selesai, $aktif
    );
}

if (mysqli_stmt_execute($stmt)) {
    echo $id !== null ? "<h2>Promo berhasil diperbarui!</h2>" : "<h2>Promo berhasil disimpan!</h2>";
    echo "<p>Nama promo: " . htmlspecialchars($judul) . "</p>";
    echo "<p>Produk: " . htmlspecialchars($produk) . "</p>";
    echo '<a href="index.html">Kembali ke Dashboard</a>';
} else {
    echo "Gagal menyimpan promo: " . htmlspecialchars(mysqli_stmt_error($stmt));
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
