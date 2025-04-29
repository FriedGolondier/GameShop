document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(user => user.username === username) || ['Maau', 'Bonni'].includes(username)) {
            alert('El usuario ya existe');
            return;
        }

        users.push({
            username: username,
            password: password,
            isAdmin: false
        });

        localStorage.setItem('users', JSON.stringify(users));
        sessionStorage.setItem("isLoggedIn", "true"); // ✅ Marcar sesión activa
        sessionStorage.setItem("currentUsername", username);
        sessionStorage.setItem("isAdmin", "false"); // ✅ Nuevo usuario no es admin

        alert('Registro exitoso!');
        eliminarBotonesLoginYRegistro();
        window.location.href = '/index.html'; // ✅ Redirigir ya logueado
    });
});

function eliminarBotonesLoginYRegistro() {
    const btnLogin = document.getElementById("btnLogin");
    const btnRegistro = document.getElementById("btnRegistro");

    if (btnLogin) btnLogin.remove();
    if (btnRegistro) btnRegistro.remove();
}
