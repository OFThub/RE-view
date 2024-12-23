<?php
$host = 'localhost';
$dbname = 'RE:view';
$user = 'postgres';
$password = '7351';

$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Veritabanına bağlanılamadı.");
}

$email = $_POST['email'];
$input_password = $_POST['password'];

// Kullanıcıyı sorgula
$query = "SELECT user_id, name, email, password FROM users WHERE email = $1";
$result = pg_query_params($conn, $query, array($email));

if (pg_num_rows($result) > 0) {
    $user = pg_fetch_assoc($result);
    
    if ($input_password == $user['password']) {
        // Admin kontrolü için PostgreSQL fonksiyonunu çağır
        $admin_query = "SELECT is_admin($1)";
        $admin_result = pg_query_params($conn, $admin_query, array($email));
        $admin_status = pg_fetch_result($admin_result, 0, 0);  // Boolean değeri al

        if ($admin_status) {
            echo "Giriş başarılı, hoş geldiniz, Admin " . htmlspecialchars($user['name']) . "!";
        } else {
            echo "Giriş başarılı, hoş geldiniz, " . htmlspecialchars($user['name']) . "!";
        }
        
    } else {
        echo "Yanlış şifre!";
    }

} else {
    echo "Bu e-posta adresi ile kayıtlı bir kullanıcı bulunamadı.";
}

//header('Location: ../index.html'); 
pg_close($conn);
?>
