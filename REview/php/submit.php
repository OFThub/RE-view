<?php
$host = 'localhost'; 
$dbname = 'RE:view'; 
$user = 'postgres';
$password = '7351'; 

$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Veritabanına bağlanılamadı.");
}

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

$query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) ";
$result = pg_query_params($conn, $query, array($name, $email, $password));

if ($result) {
    echo "Kayıt başarılı ". htmlspecialchars($name) . "!";
} else {
    echo "Kullanıcı eklenirken hata oluştu: ";
}

//header('Location: ../index.html');
pg_close($conn);
?>
