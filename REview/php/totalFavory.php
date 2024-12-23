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

    // Gelen film başlığını al
    $title = isset($_GET['title']) ? $_GET['title'] : null;

    if (!$title) {
        echo json_encode([
            "status" => "error",
            "message" => "Film başlığı eksik."
        ]);
        exit;
    }

    // Saklı yordamı çağır ve parametreyi bağla
    $stmt = $pdo->prepare("SELECT total_favory(:title) AS total_favory;");
    $stmt->bindParam(':title', $title, PDO::PARAM_STR);
    $stmt->execute();

    // Sonucu al
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode([
            "status" => "success",
            "total_favory" => $result['total_favory']
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Kayıt bulunamadı."
        ]);
    }
} catch (PDOException $e) {
    // Hata durumunda mesaj döndür
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
