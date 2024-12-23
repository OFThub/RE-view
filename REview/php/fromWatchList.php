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
$query = "SELECT name FROM watchList";
$result = pg_query($conn, $query);
$watchList = [];

if ($result) {
    while ($row = pg_fetch_assoc($result)) {
        $watchList[] = $row;
    }
}

// Veritabanı bağlantısını kapatma
pg_close($conn);

// JSON formatında verileri döndürme
echo json_encode($watchList);
?>
