<?php
session_start(); // Oturum başlat

// Veritabanı bağlantısı
$host = 'localhost';
$dbname = 'RE:view';
$user = 'postgres';
$password = '7351';

$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Veritabanına bağlanılamadı: " . pg_last_error());
}

// POST verisini kontrol et
if (isset($_POST['name']) && isset($_POST['movie_title'])) {
    $name = $_POST['name'];
    $movieTitle = $_POST['movie_title'];

    // Veriyi eklemek için sorgu
    $query = "INSERT INTO directors (name, movie) VALUES ($1, $2)";
    $result = pg_query_params($conn, $query, [$name, $movieTitle]);

    if (!$result) {
        die("Yönetmen eklenemedi: " . pg_last_error($conn));
    }
    exit();
} else {
    die("Geçersiz veri gönderimi.");
}
?>
