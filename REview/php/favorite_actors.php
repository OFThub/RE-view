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

// POST verisini al
if (isset($_POST['name']) && isset($_POST['known_for'])) {
    $name = $_POST['name'];
    $knownFor = $_POST['known_for'];

    // Veriyi eklemek için sorgu
    $query = "INSERT INTO favory_actors (actor_name, known_for) VALUES ($1, $2)";
    $result = pg_query_params($conn, $query, [$name, $knownFor]);

    if (!$result) {
        die("Aktör eklenemedi: " . pg_last_error($conn));
    }
    echo "Actor added successfully!";
    exit();
} else {
    die("Geçersiz veri gönderimi.");
}
?>
