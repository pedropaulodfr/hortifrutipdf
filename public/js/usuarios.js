function criarBotaoConfirmarExclusao(id) {
    let coluna = document.getElementById("coluna-usuarios-" + id);

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

    btnSim.addEventListener("click", () => {deletarProduto(id)})
    btnNao.addEventListener("click", () => {divConfirmarExclusaoContainer.classList.add('ocultar')})
}

function deletarProduto(id) {
    let tabela = document.getElementById('tabela-usuarios');
    
    let form = document.createElement('form');

    form.action = "/delete/delete-usuario/" + id;
    form.method = "post";

    tabela.appendChild(form);
    
    form.submit();
}

function criarElementosEditarAtributo(id) {
    let coluna = document.getElementById("coluna-usuarios-" + id);

    let divEditarAtributoContent = document.createElement("div");
    let divEditarAtributoTitulo = document.createElement("div");
    let divEditarAtributoBotoes = document.createElement("div");
    let h5Titulo = document.createElement("h5");
    let btnNome = document.createElement("button");
    let btnCPF = document.createElement("button");
    let btnNomeUsuario = document.createElement("button");
    let btnSenha = document.createElement("button");
    let btnSuperUsuario = document.createElement("button");
    let btnCancelar = document.createElement("button");

    h5Titulo.innerText = "Editar";

    divEditarAtributoTitulo.className = "editar-atributo-titulo";
    divEditarAtributoTitulo.appendChild(h5Titulo);

    btnNome.innerText = "Nome";
    btnCPF.innerText = "CPF";
    btnNomeUsuario.innerText = "Nome de Usuário";
    btnSenha.innerText = "Senha";
    btnSuperUsuario.innerText = "Super Usuário";
    btnCancelar.innerText = "Cancelar";
    btnCancelar.id = "btn-cancelar";

    function criarCampoInserirNovoValor(atributo, id) {
        console.log(atributo, id);
        let divNovoValor = document.createElement("div");
        let campoNovoValor = document.createElement("input");
        let btnSubmitNovoValor = document.createElement("button");
        let btnSubmitNovoValorIcon = document.createElement("i");

        if (atributo == 'superuser') {
            campoNovoValor.type = "number";
            campoNovoValor.min = 0;
            campoNovoValor.max = 1;
        } else {
            campoNovoValor.type = "text";
        }

        campoNovoValor.className = "novo-valor-campo";
        campoNovoValor.id = "novo-valor-campo";
        campoNovoValor.value = document.getElementById("coluna-" + atributo + "-" + id).innerText;
        document.getElementById("coluna-" + atributo + "-" + id).innerText = '';
        btnSubmitNovoValor.className = "btn-submit-novo-valor";
        btnSubmitNovoValor.name = "";
        btnSubmitNovoValorIcon.className = "bx bxs-chevron-right";
        btnSubmitNovoValor.appendChild(btnSubmitNovoValorIcon);
        
        divNovoValor.className = "novo-valor-container";
        divNovoValor.appendChild(campoNovoValor);
        divNovoValor.appendChild(btnSubmitNovoValor);
        document.getElementById("coluna-" + atributo + "-" + id).appendChild(divNovoValor);
        
        campoNovoValor.focus();
        btnSubmitNovoValor.addEventListener("click", () => {
            editarAtributo(atributo, id)
        });
    }

    btnNome.addEventListener("click", () => {
        criarCampoInserirNovoValor("nome", id);
    });
    btnCPF.addEventListener("click", () => {
        criarCampoInserirNovoValor("cpf", id);
    });
    btnNomeUsuario.addEventListener("click", () => {
        criarCampoInserirNovoValor("nome-usuario", id);
    });
    btnSenha.addEventListener("click", () => {
        criarCampoInserirNovoValor("senha", id);
    });
    btnSuperUsuario.addEventListener("click", () => {
        criarCampoInserirNovoValor("superuser", id);
    });

    divEditarAtributoBotoes.className = "editar-atributo-botoes";
    divEditarAtributoBotoes.appendChild(btnNome);
    divEditarAtributoBotoes.appendChild(btnCPF);
    divEditarAtributoBotoes.appendChild(btnNomeUsuario);
    divEditarAtributoBotoes.appendChild(btnSenha);
    divEditarAtributoBotoes.appendChild(btnSuperUsuario);
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

function editarAtributo(atributo, id) {
    let pegarNovoValor = document.querySelector("#novo-valor-campo").value;

    let tabela = document.getElementById("tabela-usuarios");
    
    let form = document.createElement("form");

    form.action = "/update/editar-usuario/" + id + "/" + atributo + "/" + pegarNovoValor;
    form.method = "post";

    tabela.appendChild(form);
    form.submit();
}
