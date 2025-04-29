const botones = {
  btnEditar: {
    id: "btnEditar",
    className: "btn-img",
    ruta: "/src/assets/icon/edit.png",
    title: "Editar",
    alt: "Editar",
  },

  btnEliminar: {
    id: "btnEliminar",
    className: "btn-img",
    ruta: "/src/assets/icon/delete.png",
    title: "Eliminar",
    alt: "Eliminar",
  },

  btnGuardar: {
    id: "btnGuardar",
    className: "btn-img",
    ruta: "/src/assets/icon/update.png",
    title: "Guardar",
    alt: "Guardar",
  },

  btnCancelar: {
    id: "btnCancelar",
    className: "btn-img",
    ruta: "/src/assets/icon/cancel.png",
    title: "Cancelar",
    alt: "Cancelar",
  },
};

function crearBotonesAcciones(celdaAcciones, nomImgButtons, id, ruta, tittle) {
  nomImgButtons.id = id;
  nomImgButtons.src = ruta;
  nomImgButtons.title = tittle;
  nomImgButtons.alt = tittle;
  celdaAcciones.appendChild(nomImgButtons);
}

function changeButtonEvent(event, nuevoID, nuevaRuta, nuevoTitulo) {
  if (event.target) {
    event.target.id = nuevoID;
    event.target.src = nuevaRuta;
    event.target.title = nuevoTitulo;
    event.target.alt = nuevoTitulo;
  }
}

function changeButtonsNotEvent(boton, nuevoId, newSrc, newTitle) {
  if (boton) {
    boton.id = nuevoId;
    boton.src = newSrc;
    boton.title = newTitle;
    boton.alt = newTitle;
  }
}

export default { botones, crearBotonesAcciones, changeButtonEvent, changeButtonsNotEvent };
