document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.onsubmit = function (event) {
            event.preventDefault();
            const formData = new FormData(registrationForm);
            formData.append('user_id', localStorage.getItem('user_id')); // Asegúrate de que 'user_id' se guarde en localStorage cuando el usuario inicie sesión.

            fetch('http://localhost/Task5/conexion_basedatos/inscription.php', { // Asegúrate de que 'inscription.php' es la ruta correcta al archivo PHP en tu servidor.
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    console.log('Inscripción realizada con éxito.');
                    // Redirigir al usuario o mostrar mensaje de éxito
                } else {
                    console.error('Error en la inscripción:', data.message);
                    // Mostrar mensaje de error
                }
            })
            .catch(error => {
                console.error('Error en la red o del servidor:', error);
                // Mostrar mensaje de error de conexión
            });
        };
    }
});
