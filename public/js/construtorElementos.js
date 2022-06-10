for (let i = 0; i < dados.length; i++){
    let id = dados[i].id;
    let nome = dados[i].nome;
    let nomeImagem = dados[i].nome_imagem;
    let valor = dados[i].valor;
    let quantidadeDisponivel = dados[i].quantidade_disponivel;
    let token = dados[i].token;
    let unidade = dados[i].unidade;

    if(quantidadeDisponivel > 0){
        criarElementos(id, nome, nomeImagem, valor, quantidadeDisponivel, token, unidade)
    }
}

function criarElementos(id, nome, nomeImagem, valor, quantidadeDisponivel, token, unidade) {
    let URL_BASE = "https://firebasestorage.googleapis.com/v0/b/hortifruti-75cfd.appspot.com/o/" + 
    String(nomeRota) + "%2F" + String(nomeImagem) + ".png?alt=media&token=" + 
    String(token);


    let div = document.createElement("div");
    let img = document.createElement("img");
    let h2 = document.createElement("h2");
    let h1 = document.createElement("h1");
    let input = document.createElement("input");
    let form = document.createElement("form");

    img.src = URL_BASE;
    h2.innerHTML = nome;
    h1.innerHTML = "R$ " + String(valor).replace('.', ',') + " / " + unidade;
    form.action = "/comprar/" + id + "/" + nome + "/" + valor + "/" + unidade + "/" + quantidadeDisponivel + "/" + nomeImagem + "/" + token + "/" + nomeRota;
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
