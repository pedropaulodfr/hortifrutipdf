function iniciaModal(modalID) {
    const modal = document.getElementById(modalID);
    const divInputDados = document.getElementById('input-dados');
    divInputDados.style.display = 'block';

    const tituloModalEntrega = document.getElementById('titulo-modal-entrega');
    tituloModalEntrega.style.display = 'block';

    if (document.getElementById('compra-finalizada') != null) {
        document.getElementById('compra-finalizada').style.display = 'none';
    }

    modal.classList.add('mostrar');
    modal.addEventListener("click", (e) =>{
        if ((e.target.id == 'btn-close') || (e.target.id == modalID)) {
            modal.classList.remove('mostrar')
        }
    });
}

const btnComprar = document.getElementById('btn-comprar');
btnComprar.addEventListener("click", () => iniciaModal('content-modal-entrega'))

const btnConfirmar = document.getElementById('btn-confirmar-dados-entrega');
btnConfirmar.addEventListener("click", verificarCamposModal);

function verificarCamposModal() {
    let campoNome = document.querySelector("#input-nome").value;
    let campoCPF = document.querySelector("#input-CPF").value;
    let campoTelefone = document.querySelector("#input-telefone").value;
    let campoRua = document.querySelector("#input-rua").value;
    let campoNumero = document.querySelector("#input-numero").value;
    let campoBairro = document.querySelector("#input-bairro").value;
    let campoCidade = document.querySelector("#input-cidade").value;
    let campoCEP = document.querySelector("#input-CEP").value;

    if ((campoNome == '') || (campoCPF == '') || (campoTelefone == '') || (campoRua == '') || 
    (campoNumero == '') || (campoBairro == '') || (campoCidade == '')) {
        alert('Algum campo está vazio');
    }else{
        compraFinalizada();
    }
}

function compraFinalizada(params) {
    const divInputDados = document.getElementById('input-dados');
    divInputDados.style.display = 'none';

    const tituloModalEntrega = document.getElementById('titulo-modal-entrega');
    tituloModalEntrega.style.display = 'none';

    

    const divModalEntrega = document.getElementById("modal-entrega");
    

    if (document.getElementById('compra-finalizada') == null) {
        const divCompraFinalizada = document.createElement('div'); 
        const h1 = document.createElement('h1');
        const h2 = document.createElement('h2');
        const form = document.createElement('form');
        const btnOK = document.createElement('input');

        divCompraFinalizada.id = 'compra-finalizada';
        divCompraFinalizada.className = 'compra-finalizada';

        h1.innerText = "Tudo OK!";
        h2.innerText = "A HORTIFRUTIPDF agradece a sua preferência ;)";

        h1.className = 'compra-finalizada-text';
        h2.className = 'compra-finalizada-text';
        //<form action="" method="get"></form>
        form.action = "/";
        form.method = 'get';

        btnOK.type = 'submit';
        btnOK.className = "btn-comprar";
        btnOK.id = "btn-finalizar-compra";
        btnOK.value = "OK";
        form.appendChild(btnOK);

        divCompraFinalizada.appendChild(h1);
        divCompraFinalizada.appendChild(h2);
        divCompraFinalizada.appendChild(form);
        divModalEntrega.appendChild(divCompraFinalizada);
    }else{
        document.getElementById('compra-finalizada').style.display = 'block';
    }

}