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
    console.log('Verificar Campos');
    let campoNome = document.querySelector("#input-nome");
    let campoCPF = document.querySelector("#input-CPF");
    let campoTelefone = document.querySelector("#input-telefone");
    let campoRua = document.querySelector("#input-rua");
    let campoNumero = document.querySelector("#input-numero");
    let campoBairro = document.querySelector("#input-bairro");
    let campoCidade = document.querySelector("#input-cidade");
    let campoCEP = document.querySelector("#input-CEP");

    if (campoNome.value == ''){
        campoNome.classList.add('erro');
    }else if (campoCPF.value == ''){
        campoCPF.classList.add('erro');
    }else if (campoTelefone.value == ''){
        campoTelefone.classList.add('erro');
    }else if (campoRua.value == ''){
        campoRua.classList.add('erro');
    }else if (campoNumero.value == ''){
        campoNumero.classList.add('erro');
    }else if (campoBairro.value == ''){
        campoBairro.classList.add('erro');
    }else if (campoCidade.value == ''){
        campoCidade.classList.add('erro');
    }else{
        salvarDados(campoNome, campoCPF, campoTelefone, campoRua, campoNumero, campoBairro, campoCidade,
            campoCEP);
        compraFinalizada();
    }
}

function compraFinalizada() {
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

        form.action = '/' + parametros.nomeRota;
        form.method = 'post';

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

function salvarDados(nome, cpf, telefone, rua, numero, bairro, cidade, cep) {
    let quantidade = document.querySelector('#quantidade').value;
    let form = document.getElementById('form-confirmar-dados-entrega');

    console.log(form);

    h1.className = 'compra-finalizada-text';
    h2.className = 'compra-finalizada-text';
    form.action = "/confirmarCompra/"+ parametros.nomeRota + "/" + String(parametros.id) + "/" + 
        parametros.nome + "/" + String(quantidade) + "/" + (parametros.valor * quantidade) + "/" + 
        nome.value + "/" + cpf.value + "/" + String(telefone.value) + "/" + rua.value + "/" + 
        String(numero.value) + "/" + bairro.value + "/" + String(cidade.value).replace("/", "-") + "/" + 
        cep.value;
    form.method = 'post';
    
}