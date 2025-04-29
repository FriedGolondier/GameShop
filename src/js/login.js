(function () {
    "use strict";
    let forms = document.querySelectorAll(".needs-validation");

    const predefinedUsers = [
        { username: 'Maau', password: 'milanesa', isAdmin: false },
        { username: 'Bonni', password: 'milanesa', isAdmin: true }
    ];

    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const username = document.getElementById("txtEmail").value.trim();
            const password = document.getElementById("idPassword").value.trim();

            if (username === "" || password === "") {
                alert("Por favor, completa ambos campos.");
                return;
            }

            if (!form.checkValidity()) {
                form.classList.add("was-validated");
                document.getElementById("txtEmail").focus();
                return;
            }

            const user = predefinedUsers.find(u => u.username === username && u.password === password);

            if (user) {
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("currentUsername", user.username);
                sessionStorage.setItem("isAdmin", user.isAdmin);

                window.location.href = "index.html";
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        }, false);
    });
})();

document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem("isLoggedIn") == "true") {
        agregarMenuProductosSiEsAdmin();
        eliminarBotonesLoginYRegistro();
    }

    if (document.getElementById("loginModal")) {
        let myModal = new bootstrap.Modal(document.getElementById("loginModal"), {
            backdrop: "static",
            keyboard: false,
        });
        myModal.show();
        document.getElementById("txtEmail").focus();
    }
});

function agregarMenuProductosSiEsAdmin() {
    const isAdmin = sessionStorage.getItem("isAdmin") === "true";
    if (!isAdmin) return;

    const dropdownMenu = document.querySelector('#inicioDropdown + .dropdown-menu');
    if (!dropdownMenu) return;

    const productosItem = document.createElement('li');
    const productosLink = document.createElement('a');
    productosLink.className = 'dropdown-item';
    productosLink.href = '/src/pages/productos.html';
    productosLink.textContent = 'Productos';

    productosItem.appendChild(productosLink);
    dropdownMenu.appendChild(productosItem);
}

function eliminarBotonesLoginYRegistro() {
    const btnLogin = document.getElementById("btnLogin");
    const btnRegistro = document.getElementById("btnRegistro");

    if (btnLogin) btnLogin.remove();
    if (btnRegistro) btnRegistro.remove();
}
