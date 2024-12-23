<?php
// Veritabanı bağlantısı
$host = 'localhost';
$dbname = 'RE:view';
$user = 'postgres';
$password = '7351';

$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Veritabanına bağlanılamadı.");
}

// Film verilerini çekme
$query = "SELECT title, rating, review FROM movie_reviews";
$result = pg_query($conn, $query);
$reviews = [];

if ($result) {
    while ($row = pg_fetch_assoc($result)) {
        $reviews[] = $row;
    }
}

// Veritabanı bağlantısını kapatma
pg_close($conn);

// JSON formatında verileri döndürme
echo json_encode($reviews);
?>
