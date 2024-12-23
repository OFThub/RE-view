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
$review = $_POST['review']; // Boş yorum için varsayılan metin

// Favorilere ekleme işlemi
$query = "INSERT INTO favory_reviews (title, rating, review) VALUES ($1, $2, $3)";
$result = pg_query_params($conn, $query, array($title, $rating, $review));

if ($result) {
    echo "<p>Film favorilere eklendi.</p>";
} else {
    echo "<p>Favorilere ekleme sırasında bir hata oluştu.</p>";
}

header('Location: ../html/explore.html');
pg_close($conn);
?>
