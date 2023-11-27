// login.js
document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email === '' || password === '') {
        var loginErrorMessage = document.getElementById('loginErrorMessage');
        loginErrorMessage.textContent = 'Por favor ingresa tu correo electrónico y contraseña.';
        loginErrorMessage.style.display = 'block';
        return;
    }

    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch('http://localhost/Task5/conexion_basedatos/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('firstTimeLogin', 'true'); // Establece la bandera para la primera vez
            window.location.href = 'inscription_form.html'; // Redirige al formulario de inscripción
        } else {
            var loginErrorMessage = document.getElementById('loginErrorMessage');
            loginErrorMessage.textContent = data.message;
            loginErrorMessage.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        var loginErrorMessage = document.getElementById('loginErrorMessage');
        loginErrorMessage.textContent = 'Error de conexión o respuesta del servidor.';
        loginErrorMessage.style.display = 'block';
    });
};
