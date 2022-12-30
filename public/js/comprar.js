let divInfoProduto = document.getElementById("info-produto");
let divImg = document.getElementById("img-produto");
let campoValorTotal = document.getElementById("campo-valor-total");
campoValorTotal.innerText = `R$ ${String(parametros.valor).replace(".", ",")}`

let img = document.createElement("img");
let h1 = document.createElement("h1");
let h2 = document.createElement("h2");
let h3 = document.createElement("h3");
let divValor = document.createElement("div");
let divConfirmarQuantidade = document.createElement("div");
let inputQuantidade = document.createElement("input");

img.src = parametros.linkImagem.replace(/kc=191/g, '/').replace(/kc=193/g, '?').replace(/kc=535070/g, '%2F');
h1.innerText = parametros.nome;
h2.innerText = `R$ ${String(parametros.valor).replace(".", ",")}/${parametros.unidade}`;

divValor.className = "valor-produto";
divValor.id = "valor-produto";
divValor.appendChild(h2);

divConfirmarQuantidade.id = "confirmar-quantidade";
divConfirmarQuantidade.className = "confirmar-quantidade";

h3.innerText = "Quantidade";

inputQuantidade.type = "number";
inputQuantidade.id = "quantidade";
inputQuantidade.className = "quantidade";
inputQuantidade.min = 0;
inputQuantidade.max = parametros.quantidadeDisponivel;
inputQuantidade.value = 1;

inputQuantidade.addEventListener("click", () =>{
    let quantidade = document.querySelector("#quantidade").value;
    let valorTotal = parametros.valor * quantidade

    if (parseInt(quantidade) > parametros.quantidadeDisponivel) {
        inputQuantidade.value = parametros.quantidadeDisponivel;
    }else if (parseInt(quantidade) <= 0){
        inputQuantidade.value = 0;
        campoValorTotal.innerText = `R$ ${String(parametros.valor).replace(".", ",")}`;
        campoValorTotal.classList.add('riscado');
    }
    else{
        campoValorTotal.innerText = `R$ ${String(valorTotal.toFixed(2)).replace(".", ",")}`;
        campoValorTotal.classList.remove('riscado');
    }

});

divConfirmarQuantidade.appendChild(h3);
divConfirmarQuantidade.appendChild(inputQuantidade);

divImg.appendChild(img);
divInfoProduto.appendChild(h1);
divInfoProduto.appendChild(divValor);
divInfoProduto.appendChild(divConfirmarQuantidade);
