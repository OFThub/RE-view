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
if (isset($_POST['movie']) && is_array($_POST['movie'])) {
    $movies = $_POST['movie'];

    foreach ($movies as $movie) {
        // POST edilen verileri al
        $name = $movie['title'];
        $rating = isset($movie['rating']) && is_numeric($movie['rating']) ? $movie['rating'] : 0.0;
        $date = $movie['release_date'];

        // Veriyi eklemek için sorgu
        $query = "INSERT INTO upcoming (name, rating, release_date) VALUES ($1, $2, $3)";
        $result = pg_query_params($conn, $query, [$name, $rating, $date]);

        if (!$result) {
            die("Trend Film eklenemedi: " . pg_last_error($conn));
        }
    }

    // success.html'e yönlendir
    header("Location: ../html/explore.html");
    exit();
} else {
    // Veri gönderilmemişse hata sayfasına yönlendirme
    header("Location: ../html/error.html");
    exit();
}
?>
