<?php
$host = 'localhost'; 
$dbname = 'RE:view';
$user = 'postgres';
$password = '7351';

$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Veritabanına bağlanılamadı.");
}

$review=$_POST['review'];
$title=$_POST['title'];
$rating=(int)$_POST['rating'];

$query = "INSERT INTO movie_reviews (review,title,rating) VALUES ($1, $2, $3)";
$result = pg_query_params($conn, $query, array($review,$title,$rating));

if ($result) {
    echo "Veri başarıyla kaydedildi.";
    
} else {
    echo "Veri kaydedilemedi: " . pg_last_error($conn);
}
header('Location: ../html/explore.html');
pg_close($conn);
?>