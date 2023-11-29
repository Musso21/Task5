document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    
    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const formData = new FormData(this);
        formData.append('user_id', localStorage.getItem('user_id')); // Asegúrate de que 'user_id' se guarde en localStorage cuando el usuario inicie sesión.

        fetch('conexion_basedatos/inscription.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Inscripción realizada con éxito.');
                // Redirigir o actualizar la interfaz de usuario
            } else {
                alert('Error en la inscripción: ' + data.message);
                // Manejar el error
            }
        })
        .catch(error => {
            alert('Error en la red o del servidor: ' + error);
            // Manejar el error de red
        });
    });
});
