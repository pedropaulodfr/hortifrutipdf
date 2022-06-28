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

    autoPreenchimento();
}

function autoPreenchimento() {
    document.getElementById("input-nome").value = localStorage.getItem("nome");
    document.getElementById("input-CPF").value = localStorage.getItem("CPF");
    document.getElementById("input-telefone").value = localStorage.getItem("telefone");
    document.getElementById("input-rua").value = localStorage.getItem("rua");
    document.getElementById("input-bairro").value = localStorage.getItem("bairro");
    document.getElementById("input-numero").value = localStorage.getItem("numero");
    document.getElementById("input-cidade").value = localStorage.getItem("cidade");
    document.getElementById("input-CEP").value = localStorage.getItem("CEP");
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
    let form = document.createElement('form');

    console.log(form);

    localStorage.setItem("nome", nome.value);
    localStorage.setItem("CPF", cpf.value);
    localStorage.setItem("telefone", telefone.value);
    localStorage.setItem("rua", rua.value);
    localStorage.setItem("numero", numero.value);
    localStorage.setItem("bairro", bairro.value);
    localStorage.setItem("cidade", cidade.value);
    localStorage.setItem("CEP", cep.value);

    h1.className = 'compra-finalizada-text';
    h2.className = 'compra-finalizada-text';
    form.action = "/insert/confirmarCompra/"+ parametros.nomeRota + "/" + String(parametros.id) + "/" + 
        parametros.nome + "/" + String(quantidade) + "/" + (parametros.valor * quantidade) + "/" + 
        nome.value + "/" + cpf.value + "/" + String(telefone.value) + "/" + rua.value + "/" + 
        String(numero.value) + "/" + bairro.value + "/" + String(cidade.value).replace("/", "-") + "/" + 
        cep.value;
    form.method = 'post';
    form.id = "form-confirmar-dados-entrega";
    form.className = "form-confirmar-dados-entrega";

    document.getElementById("input-dados").appendChild(form);

    form.submit();
}