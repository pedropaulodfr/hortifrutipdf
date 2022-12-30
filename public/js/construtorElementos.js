for (let i = 0; i < dados.length; i++){
    let id = dados[i].id;
    let nome = dados[i].nome;
    let valor = dados[i].valor;
    let quantidadeDisponivel = dados[i].quantidade_disponivel;
    let unidade = dados[i].unidade;
    let linkImagem = dados[i].link_imagem;

    if(quantidadeDisponivel > 0){
        criarElementos(id, nome, valor, quantidadeDisponivel, unidade, linkImagem)
    }
}

function criarElementos(id, nome, valor, quantidadeDisponivel, unidade, linkImagem) {

    let div = document.createElement("div");
    let img = document.createElement("img");
    let h2 = document.createElement("h2");
    let h1 = document.createElement("h1");
    let input = document.createElement("input");
    let form = document.createElement("form");

    img.src = linkImagem;
    h2.innerHTML = nome;
    h1.innerHTML = "R$ " + String(valor).replace('.', ',') + " / " + unidade;
    form.action = `/comprar/${id}/${nome}/${valor}/${unidade}/${quantidadeDisponivel}/${nomeRota}/`
                + `${linkImagem.replaceAll("/", "kc=191").replaceAll("?", "kc=193").replaceAll("%2F", "kc=535070")}`;
    form.method = "post";
    form.id = "form-comprar";
    input.className = "btn-comprar";
    input.value = "Comprar";
    input.type = "submit";

    div.className = "amostra-itens";

    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(h1);
    div.appendChild(form);
    form.appendChild(input);

    document.getElementById("itens").appendChild(div);
}
