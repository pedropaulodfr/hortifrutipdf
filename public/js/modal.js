function iniciaModal(modalID) {
    const modal = document.getElementById(modalID);
    modal.classList.add('mostrar');
    modal.addEventListener("click", (e) =>{
        if ((e.target.id == 'btn-close') || (e.target.id == modalID)) {
            modal.classList.remove('mostrar')
        }
    });
}

const btnComprar = document.getElementById('btn-comprar');
btnComprar.addEventListener("click", () => iniciaModal('content-modal-entrega'))