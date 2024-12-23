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

// Check if 'title' is passed as a GET parameter
if (isset($_GET['title'])) {
    $title = $_GET['title'];

    // Use parameterized query to prevent SQL injection
    $query = "SELECT title, rating, review FROM movie_reviews WHERE title = $1";
    $result = pg_query_params($conn, $query, array($title));

    $reviews = [];

    if ($result) {
        while ($row = pg_fetch_assoc($result)) {
            $reviews[] = $row;
        }
    } else {
        // If the query failed, return an empty array
        $reviews = [];
    }

    // Close the database connection
    pg_close($conn);

    // Return the reviews as JSON
    echo json_encode($reviews);
} else {
    // If 'title' parameter is missing, return an error message
}
?>
