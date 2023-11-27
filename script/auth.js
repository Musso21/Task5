// auth.js
document.addEventListener('DOMContentLoaded', function() {
    updateNavBar(); // Llamar a la función en la carga de la página
});
if (window.location.pathname.endsWith('inscription_form.html') && !localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}
if (localStorage.getItem('firstTimeLogin') === 'true') {
    localStorage.removeItem('firstTimeLogin'); // Elimina la bandera
    window.location.href = 'inscription_form.html'; // Redirige al formulario de inscripción
}
// Esta función actualiza la barra de navegación en función del estado de inicio de sesión
function updateNavBar() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Verificar si el usuario está logueado
    const navContainer = document.getElementById('navbarNav'); // Obtener el contenedor de la barra de navegación

    if (isLoggedIn) {
        // Usuario logueado
        navContainer.innerHTML = `
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="index.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="aboutMDHL.html">About</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="contact.html">Contact</a>
            </li>
        </ul>
            <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                    <a class="nav-link" href="inscription_form.html">Inscription</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick="logout()">Sign Out</a>
                </li>
            </ul>
        `;
    } else {
        // Usuario no logueado
        navContainer.innerHTML = `
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="aboutMDHL.html">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="contact.html">Contact</a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="registro.html">Register</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="login.html">Login</a>
                </li>
            </ul>
        </div>
        `;
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('isLoggedIn'); // Eliminar el estado de inicio de sesión
    updateNavBar(); // Actualizar la barra de navegación
    window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
}
