document.getElementById('registrationForm').onsubmit = function(event) {
    event.preventDefault();
    var formData = new FormData(this);

    fetch('http://localhost/Task5/conexion_basedatos/register.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            window.location.href = 'login.html';

        } else {
            var errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = data.message || 'Ocurrió un error durante el registro.';
            errorMessage.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        var errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Error de conexión o respuesta del servidor.';
        errorMessage.style.display = 'block';
    });
};
