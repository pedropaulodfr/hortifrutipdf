function verificarCamposDadosUsuarios() {
    console.log('Verificar Campos Usuarios');
    let campoNome = document.querySelector("#campo-nome");
    let campoCPF = document.querySelector("#campo-cpf");
    let campoNomeUsuario = document.querySelector("#campo-nome-usuario");
    let campoSenha = document.querySelector("#campo-senha");

    if (campoNome.value == ''){
        campoNome.classList.add('erro');
    }else if (campoCPF.value == ''){
        campoCPF.classList.add('erro');
    }else if (campoNomeUsuario.value == ''){
        campoNomeUsuario.classList.add('erro');
    }else if (campoSenha.value == ''){
        campoSenha.classList.add('erro');
    }else{
        salvarDados(campoNome, campoCPF, campoNomeUsuario, campoSenha);
    }
}

function salvarDados(nome, cpf, nome_usuario, senha) {
    let divContainer = document.getElementById("modal-dados-usuarios-container");
    console.log(divContainer);
    
    let form = document.createElement("form");
    
    form.action = "/insert/salvar-usuarios/"+ nome.value + "/" + cpf.value + "/" +  
    nome_usuario.value + "/" + senha.value;
    form.method = 'post';
    
    divContainer.appendChild(form);
    
    notificacaoDadosInseridos(nome_usuario);
    
    form.submit();
}

function notificacaoDadosInseridos(nome_usuario) {
    document.getElementById("modal-dados-usuarios-campos").classList.add('ocultar');
    document.getElementById("modal-dados-usuarios-titulo").classList.add('ocultar');

    let divDadosInseridos = document.createElement("div");
    let h2 = document.createElement("h2");
    let form = document.createElement("form");
    let btnOk = document.createElement("input");

    divDadosInseridos.id = 'dados-inseridos-sucesso-content';
    divDadosInseridos.className = 'dados-inseridos-sucesso-content';

    h2.innerText = "Usuário " + nome_usuario.value + " cadastrado com sucesso!";

    form.action = '/add-usuarios';
    form.method = 'post';

    btnOk.type = "submit";
    btnOk.className = "btn-comprar";
    btnOk.id = "btn-finalizar-inserir-dados";
    btnOk.value = "OK";
    form.appendChild(btnOk);

    divDadosInseridos.appendChild(h2);
    divDadosInseridos.appendChild(form);
    document.getElementById("modal-dados-usuarios").appendChild(divDadosInseridos)
}