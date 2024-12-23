<?php
$host = 'localhost';
$dbname = 'RE:view';
$user = 'postgres'; 
$password = '7351';

$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Veritabanına bağlanılamadı.");
}

$title = $_POST['title'];

// Film favorilerden çıkarılacaksa, tabloya göre ilgili kaydı siliyoruz.
$query = "DELETE FROM favorites WHERE title = $1";

$result = pg_query_params($conn, $query, array($title));

if ($result) {
    echo "Film favorilerden çıkarıldı.";
} else {
    echo "Favorilerden çıkarılamadı: " . pg_last_error($conn);
}

header('Location: ../html/explore.html'); 
pg_close($conn);
?>
