<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_POST['user_id'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $address = $_POST['address'];
    $city = $_POST['city'];
    $zip = $_POST['zip'];
    $birthdate = $_POST['birthdate'];
    $gender = $_POST['gender'];
    $grade = $_POST['grade'];
    $school = $_POST['school'];
    $position = isset($_POST['position']) ? implode(", ", $_POST['position']) : ''; // Assuming position is an array of checked values
    $uniformSize = $_POST['uniformSize'];
    $agreement = isset($_POST['agreement']) ? 1 : 0; // Assuming agreement is a checkbox

    $sql = "INSERT INTO inscriptions (user_id, first_name, last_name, address, city, zip, birthdate, gender, grade, school, position, uniform_size, agreement) VALUES ('$user_id', '$firstName', '$lastName', '$address', '$city', '$zip', '$birthdate', '$gender', '$grade', '$school', '$position', '$uniformSize', '$agreement')";

    if ($connection->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $connection->error;
    }
}

$connection->close();
?>
