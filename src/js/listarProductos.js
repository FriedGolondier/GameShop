document.addEventListener('DOMContentLoaded', function () {
    const listaProductos = document.getElementById('listaProductos');
    const productos = JSON.parse(localStorage.getItem('productos')) || [];

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.style.maxWidth = '540px';

        card.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${producto.imagen}" class="img-fluid rounded-start" alt="${producto.nombre}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Cantidad disponible: ${producto.cantidad}</p>
                        <p class="card-text"><strong>Precio:</strong> $${producto.precio}</p>
                    </div>
                </div>
            </div>
        `;

        listaProductos.appendChild(card);
    });
});
