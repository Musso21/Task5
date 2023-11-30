document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(registrationForm);
        const userId = localStorage.getItem('user_id');
        if (userId) {
            formData.append('user_id', userId);
        } else {
            alert('No user session started.');
            return;
        }

        fetch('conexion_basedatos/inscription.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Registration recorded successfully.');
                location.reload(); // Recarga la página después de mostrar la alerta
            } else {
                console.error('Registration error:', data.message);
                alert('Registration error: ' + data.message); // Muestra un mensaje de error si algo va mal
            }
        })
        .catch(error => {
            console.error('Network or server error:', error);
            alert('Network or server error: ' + error); // Muestra un mensaje de error de red
        });
    });
});
