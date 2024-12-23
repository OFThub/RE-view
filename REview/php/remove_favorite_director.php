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
if (isset($_POST['name'])) {
    $name = $_POST['name'];

    // Veriyi silmek için sorgu
    $query = "DELETE FROM favory_directors WHERE director_name = $1";
    $result = pg_query_params($conn, $query, [$name]);

    if (!$result) {
        die("Yönetmen favorilerden çıkarılamadı: " . pg_last_error($conn));
    }
    echo "Yönetmen başarıyla favorilerden çıkarıldı!";
    exit();
} else {
    die("Geçersiz veri gönderimi.");
}
?>
