function verificarCamposDadosProdutos(file) {
    console.log('Verificar Campos');
    let campoNome = document.querySelector("#campo-nome");
    let campoCategoria = document.querySelector("#campo-categoria");
    let campoValor = document.querySelector("#campo-valor");
    let campoUnidade = document.querySelector("#campo-unidade");
    let campoQuantidadeDisponivel = document.querySelector("#campo-quantidade-disponivel");
    let campoNomeImagem = document.querySelector("#campo-nome-imagem");
    let campoToken = document.querySelector("#campo-token");

    if (campoNome.value == ''){
        campoNome.classList.add('erro');
    }else if (campoCategoria.value == ''){
        campoCategoria.classList.add('erro');
    }else if (campoValor.value == ''){
        campoValor.classList.add('erro');
    }else if (campoUnidade.value == ''){
        campoUnidade.classList.add('erro');
    }else if (campoQuantidadeDisponivel.value == ''){
        campoQuantidadeDisponivel.classList.add('erro');
    }else{
        salvarDados(campoNome, campoCategoria, campoValor, campoUnidade, campoQuantidadeDisponivel, 
            'campoNomeImagem', 'campoToken', file);
    }
}
    
function salvarDados(nome, categoria, valor, unidade, quantidadeDisponivel, nomeImagem, token, file) {
    let divContainer = document.getElementById("modal-dados-produto-container");
    console.log(divContainer);


    const storage = firebase.storage();
    const upload = storage.ref().child("frutas").child(file.name).put(file)

    upload.on("state_changed", () =>{
        upload.snapshot.ref.getDownloadURL().then( (urlImagem) =>{        
            console.log("URL: " + urlImagem);
        })
    })
    

    let form = document.createElement("form");
    
    form.action = "/insert/salvar-produtos/"+ nome.value + "/" + categoria.value + "/" +  valor.value + "/" + 
    unidade.value + "/" + quantidadeDisponivel.value + "/" + nomeImagem.value + "/" + token.value;
    form.method = 'post';
    
    divContainer.appendChild(form);
    
    notificacaoDadosInseridos(nome, categoria);
    
    //form.submit();
}

function notificacaoDadosInseridos(nome, categoria) {
    document.getElementById("modal-dados-produto-campos").classList.add('ocultar');

    let divDadosInseridos = document.createElement("div");
    let h2 = document.createElement("h2");
    let form = document.createElement("form");
    let btnOk = document.createElement("input");

    divDadosInseridos.id = 'dados-inseridos-sucesso-content';
    divDadosInseridos.className = 'dados-inseridos-sucesso-content';

    h2.innerText = "Produto " + nome.value + " inserido com SUCESSO em " + categoria.value;

    form.action = '/add-produtos';
    form.method = 'post';

    btnOk.type = "submit";
    btnOk.className = "btn-comprar";
    btnOk.id = "btn-finalizar-inserir-dados";
    btnOk.value = "OK";
    form.appendChild(btnOk);

    divDadosInseridos.appendChild(h2);
    divDadosInseridos.appendChild(form);
    document.getElementById("modal-dados-produto").appendChild(divDadosInseridos)
}

let input = document.querySelector("input[type=file]");
input.addEventListener("change", (e)=>{
    var file = e.target.files[0]; 
    console.log(file);
    document.getElementById('btn-add-produto').addEventListener("click", () =>{
        verificarCamposDadosProdutos(file)
    })
})
