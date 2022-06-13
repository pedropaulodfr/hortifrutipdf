function deletarProduto(id, categoria) {
    let tabela = document.getElementById('tabela-produtos');
    
    const form = document.createElement('form');

    form.action = "/delete-produto/" + id + "/" + categoria;
    form.method = "post";

    tabela.appendChild(form);
    
    form.submit();
}

function criarBotaoConfirmarExclusao(id, categoria) {
    let coluna = document.getElementById("coluna-excluir-" + categoria + "-" + id);

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