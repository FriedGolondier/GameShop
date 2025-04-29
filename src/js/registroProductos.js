document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const cantidad = document.getElementById('cantidad').value;
        const precio = document.getElementById('precio').value;
        const imagenInput = document.getElementById('imagen');

        const reader = new FileReader();

        reader.onload = function (event) {
            const imagenBase64 = event.target.result;

            let productos = JSON.parse(localStorage.getItem('productos')) || [];

            productos.push({
                nombre: nombre,
                cantidad: cantidad,
                precio: precio,
                imagen: imagenBase64
            });

            localStorage.setItem('productos', JSON.stringify(productos));
            alert('Producto añadido exitosamente!');
            window.location.href = '/index.html';
        };

        if (imagenInput.files.length > 0) {
            reader.readAsDataURL(imagenInput.files[0]);
        } else {
            alert('Por favor selecciona una imagen');
        }
    });
});
