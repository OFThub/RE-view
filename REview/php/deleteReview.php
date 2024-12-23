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
    $review = $_POST['review'];
    $rating = $_POST['rating'];
    echo $title . $review . $rating;

    // Parametreli sorgu kullanarak DELETE işlemi
    $query = "DELETE FROM movie_reviews WHERE title = $1 AND review = $2 AND rating = $3;";

    // Sorguyu hazırlayın
    $result = pg_prepare($conn, "delete_review_query", $query);

    // Parametreleri geçin
    $result_execute = pg_execute($conn, "delete_review_query", array($title, $review, $rating));

    if ($result_execute) {
        echo "<p>Yorum silindi.</p>";
    } else {
        echo "<p>Favorilere ekleme sırasında bir hata oluştu.</p>";
    }
    header("Location: ../html/explore.html");
    // Veritabanı bağlantısını kapatın
    pg_close($conn);
}
?>
