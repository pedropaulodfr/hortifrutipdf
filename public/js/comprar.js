let URL_BASE = "https://firebasestorage.googleapis.com/v0/b/hortifruti-75cfd.appspot.com/o/" + 
String(parametros.nomeRota) + "%2F" + String(parametros.nomeImagem) + ".png?alt=media&token=" + 
String(parametros.token);

console.log(parametros.id);

let divInfoProduto = document.getElementById("info-produto");
let divImg = document.getElementById("img-produto");
let campoValorTotal = document.getElementById("campo-valor-total");
campoValorTotal.innerText = "R$ " + String(parametros.valor).replace(".", ",");

let img = document.createElement("img");
let h1 = document.createElement("h1");
let h2 = document.createElement("h2");
let h3 = document.createElement("h3");
let divValor = document.createElement("div");
let divConfirmarQuantidade = document.createElement("div");
let inputQuantidade = document.createElement("input");

img.src = URL_BASE;
h1.innerText = parametros.nome;
h2.innerText = "R$ " + String(parametros.valor).replace(".", ",") + " / " + parametros.unidade;

divValor.className = "valor-produto";
divValor.id = "valor-produto";
divValor.appendChild(h2);

divConfirmarQuantidade.id = "confirmar-quantidade";
divConfirmarQuantidade.className = "confirmar-quantidade";

h3.innerText = "Quantidade";

inputQuantidade.type = "number";
inputQuantidade.id = "quantidade";
inputQuantidade.className = "quantidade";
inputQuantidade.max = parametros.quantidadeDisponivel;
inputQuantidade.value = 1;

inputQuantidade.addEventListener("click", () =>{
    let quantidade = document.querySelector("#quantidade").value;
    let valorTotal = parametros.valor * quantidade

    if (quantidade > parametros.quantidadeDisponivel) {
        //inputQuantidade.value = parametros.quantidadeDisponivel;
    }else{
        campoValorTotal.innerText = "R$ " + String(valorTotal.toFixed(2)).replace(".", ",");
    }

});

divConfirmarQuantidade.appendChild(h3);
divConfirmarQuantidade.appendChild(inputQuantidade);

divImg.appendChild(img);
divInfoProduto.appendChild(h1);
divInfoProduto.appendChild(divValor);
divInfoProduto.appendChild(divConfirmarQuantidade);