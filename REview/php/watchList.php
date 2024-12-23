<?php
$host = 'localhost';
$dbname = 'RE:view';
$user = 'postgres'; 
$password = '7351';

$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Veritabanına bağlanılamadı.");
}

$title=$_POST['title'];

$query = "INSERT INTO watchList (name) VALUES ($1)";
$result = pg_query_params($conn, $query, array($title));

if ($result) {
    echo "Veri başarıyla kaydedildi.";
} else {
    echo "Veri kaydedilemedi: " . pg_last_error($conn);
}





header('Location: ../html/explore.html');
pg_close($conn);
?>