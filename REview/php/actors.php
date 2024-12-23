<?php
session_start(); // Oturum başlat

// Veritabanı bağlantısı
$host = 'localhost';
$dbname = 'RE:view';
$user = 'postgres';
$password = '7351';

$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Veritabanına bağlanılamadı.");
}

// POST edilen veriyi kontrol et
if (isset($_POST['actor']) && is_array($_POST['actor'])) {
    $actors = $_POST['actor'];

    foreach ($actors as $actor) {
        $name = $actor['name'];
        $knownFor = $actor['known_for'];

        // Veriyi eklemek için sorgu
        $query = "INSERT INTO actors (name, known_for) VALUES ($1, $2)";
        $result = pg_query_params($conn, $query, [$name, $knownFor]);

        if (!$result) {
            die("Aktör eklenemedi: " . pg_last_error($conn));
        }
    }

    // actor.html'e yönlendir
    header("Location: ../html/actor.html");
    exit();
} else {
    // Veri gönderilmemişse hata sayfasına yönlendirme
    header("Location: ../html/error.html");
    exit();
}
?>
