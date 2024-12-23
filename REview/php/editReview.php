<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Veritabanı bağlantınızı yapın
    $host = 'localhost';
    $dbname = 'RE:view';
    $user = 'postgres';
    $password = '7351';

    $conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

    if (!$conn) {
        die("Veritabanına bağlanılamadı.");
    }

    $title = $_POST['title'];
    $p_review = $_POST['p_review'];
    $p_rating = $_POST['p_rating'];
    $review = $_POST['review'];
    $rating = $_POST['rating'];

    // Bu şekilde doğrudan sorgu kullanabilirsiniz
    $query = "SELECT update_movie_review('$title', '$p_rating', '$p_review', '$rating', '$review');";
    $result = pg_query($conn, $query);

    if ($result) {
        echo "<p>Yorum düzenlendi.</p>";
    } else {
        echo "<p>Favorilere ekleme sırasında bir hata oluştu.</p>";
    }

    header('Location: ../html/explore.html');
    pg_close($conn);
}
?>
