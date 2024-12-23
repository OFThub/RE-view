<?php
// Veritabanı bağlantı bilgileri
$host = "localhost";
$dbname = "RE:view";
$user = "postgres";
$password = "7351";

try {
    // PostgreSQL'e bağlan
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);

    // Hata modunu ayarla
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Saklı yordamı çağır
    $stmt = $pdo->query("SELECT count_users();");

    // Sonucu al
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Kullanıcı sayısını JSON formatında döndür
    echo json_encode([
        "status" => "success",
        "user_count" => $result['count_users']
    ]);
} catch (PDOException $e) {
    // Hata durumunda mesaj döndür
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
