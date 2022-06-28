function deletarProduto(id, categoria) {
    let tabela = document.getElementById('tabela-produtos');
    
    let form = document.createElement('form');

    form.action = "/delete/delete-produto/" + id + "/" + categoria;
    form.method = "post";

    tabela.appendChild(form);
    
    form.submit();
}

function editarAtributo(atributo, id, categoria) {
    let pegarNovoValor = document.querySelector("#novo-valor-campo").value;

    let tabela = document.getElementById("tabela-produtos");
    
    let form = document.createElement("form");

    form.action = "/update/editar-produto/" + id + "/" + categoria + "/" + atributo + "/" + pegarNovoValor;
    form.method = "post";

    tabela.appendChild(form);
    form.submit();
}

function criarBotaoConfirmarExclusao(id, categoria) {
    let coluna = document.getElementById("coluna-" + categoria + "-" + categoria + "-" + id);

    let divConfirmarExclusaoContainer = document.createElement("div");
    let divConfirmarExclusaoTitulo = document.createElement("div");
    let divConfirmarExclusaoBotoes = document.createElement("div");
    let h5Titulo = document.createElement("h5");
    let btnSim = document.createElement("i");
    let btnNao = document.createElement("i");

    h5Titulo.innerText = "Confirmar Exclusão";

    divConfirmarExclusaoTitulo.className = "confirmar-exclusao-titulo";
    divConfirmarExclusaoTitulo.appendChild(h5Titulo);

    btnSim.className = "bx bx-check btn-sim";
    btnNao.className = "bx bx-x btn-nao";

    divConfirmarExclusaoBotoes.className = "confirmar-exclusao-botoes";
    divConfirmarExclusaoBotoes.appendChild(btnSim);
    divConfirmarExclusaoBotoes.appendChild(btnNao);

    divConfirmarExclusaoContainer.appendChild(divConfirmarExclusaoTitulo);
    divConfirmarExclusaoContainer.appendChild(divConfirmarExclusaoBotoes);

    divConfirmarExclusaoContainer.className = "confirmar-exclusao-container";
    coluna.appendChild(divConfirmarExclusaoContainer);

    btnSim.addEventListener("click", () => {deletarProduto(id, categoria)})
    btnNao.addEventListener("click", () => {divConfirmarExclusaoContainer.classList.add('ocultar')})
}

function criarElementosEditarAtributo(id, categoria) {
    let coluna = document.getElementById("coluna-" + categoria + "-" + categoria + "-" + id);

    let divEditarAtributoContent = document.createElement("div");
    let divEditarAtributoTitulo = document.createElement("div");
    let divEditarAtributoBotoes = document.createElement("div");
    let h5Titulo = document.createElement("h5");
    let btnNome = document.createElement("button");
    let btnImagem = document.createElement("button");
    let btnValor = document.createElement("button");
    let btnUnidade = document.createElement("button");
    let btnQuantDisp = document.createElement("button");
    let btnToken = document.createElement("button");
    let btnCancelar = document.createElement("button");

    h5Titulo.innerText = "Editar";

    divEditarAtributoTitulo.className = "editar-atributo-titulo";
    divEditarAtributoTitulo.appendChild(h5Titulo);

    btnNome.innerText = "Nome";
    btnImagem.innerText = "Imagem";
    btnValor.innerText = "Valor";
    btnUnidade.innerText = "Unidade";
    btnQuantDisp.innerText = "Quantidade disponível";
    btnToken.innerText = "Token";
    btnCancelar.innerText = "Cancelar";
    btnCancelar.id = "btn-cancelar";

    function criarCampoInserirNovoValor(atributo, id) {
        console.log(atributo, id);
        let divNovoValor = document.createElement("div");
        let campoNovoValor = document.createElement("input");
        let btnSubmitNovoValor = document.createElement("button");
        let btnSubmitNovoValorIcon = document.createElement("i");

        campoNovoValor.type = "text";
        campoNovoValor.className = "novo-valor-campo";
        campoNovoValor.id = "novo-valor-campo";
        campoNovoValor.value = document.getElementById("coluna-" + categoria + "-" + atributo + "-" + id).innerText;
        document.getElementById("coluna-" + categoria + "-" + atributo + "-" + id).innerText = '';
        btnSubmitNovoValor.className = "btn-submit-novo-valor";
        btnSubmitNovoValor.name = "";
        btnSubmitNovoValorIcon.className = "bx bxs-chevron-right";
        btnSubmitNovoValor.appendChild(btnSubmitNovoValorIcon);
        
        divNovoValor.className = "novo-valor-container";
        divNovoValor.appendChild(campoNovoValor);
        divNovoValor.appendChild(btnSubmitNovoValor);
        document.getElementById("coluna-" + categoria + "-" + atributo + "-" + id).appendChild(divNovoValor);
        
        campoNovoValor.focus();
        btnSubmitNovoValor.addEventListener("click", () => {
            editarAtributo(atributo, id, categoria)
        });
    }

    btnNome.addEventListener("click", () => {
        criarCampoInserirNovoValor("nome", id);
    });
    btnImagem.addEventListener("click", () => {
        criarCampoInserirNovoValor("nome_imagem", id);
    });
    btnValor.addEventListener("click", () => {
        criarCampoInserirNovoValor("valor", id);
    });
    btnUnidade.addEventListener("click", () => {
        criarCampoInserirNovoValor("unidade", id);
    });
    btnQuantDisp.addEventListener("click", () => {
        criarCampoInserirNovoValor("quantidade_disponivel", id);
    });
    btnToken.addEventListener("click", () => {
        criarCampoInserirNovoValor("token", id)
    });

    divEditarAtributoBotoes.className = "editar-atributo-botoes";
    divEditarAtributoBotoes.appendChild(btnNome);
    divEditarAtributoBotoes.appendChild(btnImagem);
    divEditarAtributoBotoes.appendChild(btnValor);
    divEditarAtributoBotoes.appendChild(btnUnidade);
    divEditarAtributoBotoes.appendChild(btnQuantDisp);
    divEditarAtributoBotoes.appendChild(btnToken);
    divEditarAtributoBotoes.appendChild(btnCancelar);

    divEditarAtributoContent.className = "editar-atributo-container";
    divEditarAtributoContent.id = "editar-atributo-container";
    divEditarAtributoContent.appendChild(divEditarAtributoTitulo);
    divEditarAtributoContent.appendChild(divEditarAtributoBotoes);
    coluna.appendChild(divEditarAtributoContent);

    document.getElementById("btn-cancelar").addEventListener("click", () => {
        divEditarAtributoContent.classList.add('ocultar');
        document.location.reload(true);
    })
}
