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

// Kullanıcıdan gelen veriler
$title = $_POST['title'];
$rating = $_POST['rating'];
$review = $_POST['review'];

// Favorilerden çıkarma işlemi
$query = "DELETE FROM favory_reviews WHERE title = $1 AND rating = $2 AND review=$3";
$result = pg_query_params($conn, $query, array($title, $rating, $review));  

if ($result) {
    echo "<p>Film favorilerden çıkarıldı.</p>";
} else {
    echo "<p>Favorilerden çıkarma sırasında bir hata oluştu.</p>";
}

header('Location: ../html/explore.html');
pg_close($conn);
?>
