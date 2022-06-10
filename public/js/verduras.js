for (let i = 0; i < dadosVerduras.length; i++){
    let id = dadosVerduras[i].id;
    let nome = dadosVerduras[i].nome;
    let nomeImagem = dadosVerduras[i].nome_imagem;
    let valor = dadosVerduras[i].valor;
    let quantidadeDisponivel = dadosVerduras[i].quantidade_disponivel;
    let token = dadosVerduras[i].token;
    let unidade = dadosVerduras[i].unidade;

    let URL_BASE = "https://firebasestorage.googleapis.com/v0/b/hortifruti-75cfd.appspot.com/o/verduras%2F" + 
    String(nomeImagem) + ".png?alt=media&token=" + String(token);

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
    div.appendChild(form);
    form.appendChild(input);

    document.getElementById("itens").appendChild(div);
}