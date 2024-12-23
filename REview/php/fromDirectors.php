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
$query = "SELECT director_name, directed_movie FROM favory_directors";
$result = pg_query($conn, $query);
$directors = [];

if ($result) {
    while ($row = pg_fetch_assoc($result)) {
        $directors[] = $row;
    }
}

// Veritabanı bağlantısını kapatma
pg_close($conn);

// JSON formatında verileri döndürme
echo json_encode($directors);
?>
