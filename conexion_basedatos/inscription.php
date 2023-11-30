<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user";

// Crear conexión
$connection = new mysqli($servername, $username, $password, $dbname);

// Chequear conexión
if ($connection->connect_error) {
    echo json_encode(['status' => 'error', 'message' => "Connection failed: " . $connection->connect_error]);
    exit;
}
$user_id = $_POST['user_id'] ?? null;
// Valida que el user_id existe
if ($user_id) {
    $userExists = $connection->query("SELECT id FROM user WHERE id = $user_id")->num_rows > 0;
    if (!$userExists) {
        echo json_encode(['status' => 'error', 'message' => 'El usuario no existe.']);
        exit;
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'No se proporcionó user_id.']);
    exit;
}
$response = ['status' => 'error', 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recoger las variables del formulario
    $user_id = $_POST['user_id'] ?? null; // Obtén el user_id del array POST.
    $firstName = $_POST['firstName'] ?? '';
    $lastName = $_POST['lastName'] ?? '';
    $address = $_POST['address'] ?? '';
    $city = $_POST['city'] ?? '';
    $zip = $_POST['zip'] ?? '';
    $birthdate = $_POST['birthdate'] ?? '';
    $gender = $_POST['gender'] ?? '';
    $grade = $_POST['grade'] ?? '';
    $school = $_POST['school'] ?? '';
    $positions = isset($_POST['position']) ? $_POST['position'] : []; // position es un array de valores
    $position = implode(', ', $positions); // Convertir el array a string separado por comas
    $uniformSize = $_POST['uniformSize'] ?? '';
    $agreement = isset($_POST['agreement']) ? 1 : 0;

    // Preparar la consulta SQL
    $sql = "INSERT INTO inscriptions (user_id, first_name, last_name, address, city, zip, birthdate, gender, grade, school, position, uniform_size, agreement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $connection->prepare($sql);
    
    if ($stmt) {
        // Vincular parámetros a la consulta preparada
        $stmt->bind_param("isssssssssssi", $user_id, $firstName, $lastName, $address, $city, $zip, $birthdate, $gender, $grade, $school, $position, $uniformSize, $agreement);
        
        // Ejecutar la consulta preparada
        if ($stmt->execute()) {
            $response['status'] = 'success';
            $response['message'] = 'Inscripción realizada con éxito.';
        } else {
            $response['message'] = 'Error al realizar la inscripción: ' . $stmt->error;
        }
        
        $stmt->close();
    } else {
        $response['message'] = 'Error al preparar la consulta: ' . $connection->error;
    }
} else {
    $response['message'] = 'Método no soportado.';
}

$connection->close();
echo json_encode($response);
?>
