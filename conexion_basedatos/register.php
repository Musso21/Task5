<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE"); 

$method = $_SERVER['REQUEST_METHOD'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user";

$connection = mysqli_connect($servername, $username, $password, $dbname);
if (!$connection) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión: ' . mysqli_connect_error()]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Asegúrate de hashear la contraseña

    if (checkEmail($email)) {
        echo json_encode(['status' => 'error', 'message' => 'El correo electrónico ya ha sido registrado']);
    } else {
        registerNewUser($name, $email, $password);
    }
} else {
    header('Location: ../registro.html');
    exit();
}

function checkEmail($email) {
    global $connection;
    $query = "SELECT email FROM user WHERE email = ?";
    $stmt = mysqli_prepare($connection, $query);
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);
    return mysqli_stmt_num_rows($stmt) > 0;
}

function registerNewUser($name, $email, $password) {
    global $connection;
    
    $insertQuery = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($connection, $insertQuery);
    mysqli_stmt_bind_param($stmt, "sss", $name, $email, $password);
    
    if (mysqli_stmt_execute($stmt)) {
        // Iniciar sesión automáticamente para el usuario
        session_start();
        $_SESSION['user_name'] = $name;
        $_SESSION['user_email'] = $email;
        
        // Obtener el ID del usuario recién registrado
        $user_id = mysqli_insert_id($connection);
        $_SESSION['user_id'] = $user_id;
        
        // Preparar y enviar la respuesta
        echo json_encode(['status' => 'success', 'message' => 'Usuario registrado y logueado con éxito.']);
    } else {
        // Enviar error
        echo json_encode(['status' => 'error', 'message' => 'Error al registrar el usuario.']);
    }
    exit();
}
?>
