function criarElementosEditarAtributo(id) {
    let coluna = document.getElementById("coluna-meu-perfil-" + id);

    let divEditarAtributoContent = document.createElement("div");
    let divEditarAtributoTitulo = document.createElement("div");
    let divEditarAtributoBotoes = document.createElement("div");
    let h5Titulo = document.createElement("h5");
    let btnNomeUsuario = document.createElement("button");
    let btnSenha = document.createElement("button");
    let btnCancelar = document.createElement("button");

    h5Titulo.innerText = "Editar";

    divEditarAtributoTitulo.className = "editar-atributo-titulo";
    divEditarAtributoTitulo.appendChild(h5Titulo);

    btnNomeUsuario.innerText = "Nome de Usuário";
    btnSenha.innerText = "Senha";
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

    btnNomeUsuario.addEventListener("click", () => {
        criarCampoInserirNovoValor("nome-usuario", id);
    });
    btnSenha.addEventListener("click", () => {
        criarCampoInserirNovoValor("senha", id);
    });

    divEditarAtributoBotoes.className = "editar-atributo-botoes";
    divEditarAtributoBotoes.appendChild(btnNomeUsuario);
    divEditarAtributoBotoes.appendChild(btnSenha);
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

    let tabela = document.getElementById("tabela-meu-perfil");
    
    let form = document.createElement("form");

    form.action = "/update/editar-meu-perfil/" + id + "/" + atributo + "/" + pegarNovoValor;
    form.method = "post";

    tabela.appendChild(form);
    form.submit();
}
