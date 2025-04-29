import botones from "./buttons.js";

document.addEventListener("DOMContentLoaded", function () {
    // Crear un elemento para el mensaje de validación
    const mensajeValidacion = document.createElement('div');
    mensajeValidacion.id = 'mensajeValidacion';
    mensajeValidacion.style.color = 'red';
    mensajeValidacion.style.fontWeight = 'bold';
    document.getElementById('formAgregarProducto').appendChild(mensajeValidacion);

    // Manejador de eventos de la tabla
    document.getElementById('tbodyProductos').addEventListener('click', function (event) {
        if (event.target.id === botones.botones.btnEditar.id) {
            const rowEditar = event.target.closest('tr');
            const cells = rowEditar.querySelectorAll('td');

            // Guardar los valores originales
            const valoresOriginales = [];
            cells.forEach((cell, index) => {
                if (index < cells.length - 1) {
                    valoresOriginales.push(cell.textContent); // Guardar el valor original de la celda
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = cell.textContent;
                    input.className = 'form-control';
                    cell.textContent = '';
                    cell.appendChild(input);
                }
            });

            // Guardar el estado de la fila para restaurarlo luego si se presiona "Cancelar"
            rowEditar.setAttribute('data-original-values', JSON.stringify(valoresOriginales));

            botones.changeButtonEvent(event,
                botones.botones.btnGuardar.id,
                botones.botones.btnGuardar.ruta,
                botones.botones.btnGuardar.title);

            const deleteButton = rowEditar.querySelector(`#${botones.botones.btnEliminar.id}`);
            botones.changeButtonsNotEvent(deleteButton,
                botones.botones.btnCancelar.id,
                botones.botones.btnCancelar.ruta,
                botones.botones.btnCancelar.title);

            return;
        }

        if (event.target.id === botones.botones.btnGuardar.id) {
            const rowSave = event.target.closest("tr");
            const inputs = rowSave.querySelectorAll("input");

            inputs.forEach((input) => {
                const valorNuevo = input.value;
                input.parentNode.textContent = valorNuevo;
            });

            botones.changeButtonEvent(event,
                botones.botones.btnEditar.id,
                botones.botones.btnEditar.ruta,
                botones.botones.btnEditar.title);

            const cancelButton = rowSave.querySelector(`#${botones.botones.btnCancelar.id}`);
            botones.changeButtonsNotEvent(cancelButton,
                botones.botones.btnEliminar.id,
                botones.botones.btnEliminar.ruta,
                botones.botones.btnEliminar.title);

            return;
        }

        if (event.target.id === botones.botones.btnEliminar.id) {
            let confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
            if (confirmacion) {
                const rowEliminar = event.target.closest("tr");
                rowEliminar.remove();
            } else {
                // Mostrar mensaje de no eliminación en la página
                mensajeValidacion.textContent = "El producto no fue eliminado.";
            }
        }

        if (event.target.id === botones.botones.btnCancelar.id) {
            const rowCancelar = event.target.closest('tr');
            const valoresOriginales = JSON.parse(rowCancelar.getAttribute('data-original-values')); // Obtener los valores originales

            const cells = rowCancelar.querySelectorAll('td');
            cells.forEach((cell, index) => {
                if (index < cells.length - 1) {
                    // Restaurar el valor original en las celdas
                    cell.textContent = valoresOriginales[index];
                }
            });

            botones.changeButtonEvent(event,
                botones.botones.btnEditar.id,
                botones.botones.btnEditar.ruta,
                botones.botones.btnEditar.title);

            const cancelButton = rowCancelar.querySelector(`#${botones.botones.btnCancelar.id}`);
            botones.changeButtonsNotEvent(cancelButton,
                botones.botones.btnEliminar.id,
                botones.botones.btnEliminar.ruta,
                botones.botones.btnEliminar.title);

            return;
        }
    });

    // Función para agregar producto a la tabla con validaciones
    function agregarProductoATabla(formData) {
        if (!formData.id || !formData.nombre || !formData.cantidad || !formData.precio || !formData.descripcion || !formData.categoria || !formData.emision) {
            mensajeValidacion.textContent = "Por favor, completa todos los campos obligatorios.";
            return;
        }

        if (parseFloat(formData.cantidad) < 0 || parseFloat(formData.precio) < 0) {
            mensajeValidacion.textContent = "La cantidad y el precio no pueden ser negativos.";
            return;
        }

        const tbody = document.getElementById("tbodyProductos");
        const newRow = document.createElement("tr");

        const datos = {
            id: formData.id,
            nombre: formData.nombre,
            cantidad: formData.cantidad,
            precio: formData.precio,
            descripcion: formData.descripcion,
            categoria: formData.categoria,
            tipoVenta: formData.tipoVenta,
            opciones: formData.opciones,
            emision: formData.emision,
        };

        for (const key in datos) {
            const cell = document.createElement("td");
            cell.textContent = datos[key];
            newRow.appendChild(cell);
        }

        const actionCell = document.createElement("td");
        const editButton = document.createElement("img");
        const deleteButton = document.createElement("img");

        botones.crearBotonesAcciones(
            actionCell,
            editButton,
            botones.botones.btnEditar.id,
            botones.botones.btnEditar.ruta,
            botones.botones.btnEditar.title
        );

        botones.crearBotonesAcciones(
            actionCell,
            deleteButton,
            botones.botones.btnEliminar.id,
            botones.botones.btnEliminar.ruta,
            botones.botones.btnEliminar.title
        );

        newRow.appendChild(actionCell);
        tbody.appendChild(newRow);

        mensajeValidacion.textContent = "";

        // Mostrar la tabla si estaba oculta
        const divTabla = document.getElementById("divListaProductos");
        divTabla.style.display = "block";
    }

    const formAgregarProducto = document.getElementById("formAgregarProducto");

    formAgregarProducto.addEventListener("submit", function (event) {
        event.preventDefault();

        const opcionesSeleccionadas = [];
        document.querySelectorAll('input[name="chkOpciones"]:checked').forEach((checkbox) => {
            opcionesSeleccionadas.push(checkbox.value);
        });

        const formData = {
            id: document.getElementById("txtIDArticulo").value,
            nombre: document.getElementById("txtNombre").value,
            cantidad: document.getElementById("rngCantidad").value,
            precio: document.getElementById("txtPrecio").value,
            descripcion: document.getElementById("txtDescripcion").value,
            categoria: document.getElementById("cboCategoria").value,
            tipoVenta: document.querySelector('input[name="rdbTipoVenta"]:checked') ? document.querySelector('input[name="rdbTipoVenta"]:checked').value : '',
            emision: document.getElementById('Emision').value,
            opciones: opcionesSeleccionadas.join(", "),
        };

        agregarProductoATabla(formData);

        formAgregarProducto.reset();

        // Actualizar visibilidad de tabla
        actualizarVisibilidadTabla();
    });

    function actualizarVisibilidadTabla() {
        const tbody = document.getElementById("tbodyProductos");
        const divTabla = document.getElementById("divListaProductos");

        if (tbody.children.length === 0) {
            divTabla.style.display = "none";
        } else {
            divTabla.style.display = "block";
        }
    }

    // Llamar una vez al cargar la página para asegurarse que esté oculta al inicio
    actualizarVisibilidadTabla();
    // Manejador de eventos para el formulario de agregar product

    formAgregarProducto.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

        // Obtener los valores del formulario
        const formData = {
            id: document.getElementById("txtIDArticulo").value,
            nombre: document.getElementById("txtNombre").value,
            cantidad: document.getElementById("rngCantidad").value,
            precio: document.getElementById("txtPrecio").value,
            descripcion: document.getElementById("txtDescripcion").value,
            categoria: document.getElementById("cboCategoria").value,
            tipoVenta: document.querySelector('input[name="rdbTipoVenta"]:checked') ? document.querySelector('input[name="rdbTipoVenta"]:checked').value : '',
            emision: document.getElementById('Emision').value,
        };

        // Llama a la función para agregar el producto a la tabla
        agregarProductoATabla(formData);

        // Opcional: limpiar el formulario después de agregar
        formAgregarProducto.reset();
    });
});
//**** Fin del código ****/