function iniciarEntregas(){
    console.log(dadosEntregas)

    if (dadosEntregas != 0) {
        for(let i = 0; i < dadosEntregas.length; i++){
            let tabela = document.getElementById('dados-entrega');
        
            let linha = document.createElement('tr');
            let dadoData = document.createElement('td');
            let dadoNome = document.createElement('td');
            let dadoCPF = document.createElement('td');
            let dadoEndereco = document.createElement('td');
            let dadoTelefone = document.createElement('td');
            let dadoProduto = document.createElement('td');
            let dadoQuantidade = document.createElement('td');
            let dadoValorTotal = document.createElement('td');
            let excluirEntrega = document.createElement('td');
            let botaoExcluir = document.createElement('i');
    
            dadoData.innerText = dadosEntregas[i].data_pedido;
            dadoNome.innerText = dadosEntregas[i].nome;
            dadoCPF.innerText = dadosEntregas[i].cpf;
            dadoEndereco.innerText = dadosEntregas[i].rua + ', ' + dadosEntregas[i].numero + ', ' + dadosEntregas[i].bairro +
                ', ' + dadosEntregas[i].cidade + ', ' + dadosEntregas[i].cep;
            dadoTelefone.innerText = dadosEntregas[i].telefone;
            dadoProduto.innerText = dadosEntregas[i].produto;
            dadoQuantidade.innerText = dadosEntregas[i].quantidade;
            dadoValorTotal.innerText = dadosEntregas[i].valor_total;

            excluirEntrega.id = 'coluna-excluir-entrega';

            botaoExcluir.className = 'bx bx-x btn-excluir';
            botaoExcluir.title = 'Excluir entrega';
            excluirEntrega.appendChild(botaoExcluir);

            botaoExcluir.addEventListener("click", () => {
                criarBotaoExcluir(i, excluirEntrega, dadosEntregas);
            })
    
            linha.appendChild(dadoData);
            linha.appendChild(dadoNome);
            linha.appendChild(dadoCPF);
            linha.appendChild(dadoEndereco);
            linha.appendChild(dadoTelefone);
            linha.appendChild(dadoProduto);
            linha.appendChild(dadoQuantidade);
            linha.appendChild(dadoValorTotal);
            linha.appendChild(excluirEntrega)
            tabela.appendChild(linha);
        }
    } else {
        let tabela = document.getElementById('dados-entrega');

        let h1 = document.createElement('h1');
        h1.innerText = 'Não há entregas para as data selecionada';

        tabela.appendChild(h1);
    }
}

function criarBotaoExcluir(i, coluna, dadosEntregas) {
    let tabela = document.getElementById('dados-entrega');
    
    let formExcluir = document.createElement('form');
    let divConfirm = document.createElement('div');
    let divText = document.createElement('div');
    let divBotoes = document.createElement('div');
    let h1 = document.createElement('h5');
    let sim = document.createElement('i');
    let nao = document.createElement('i');

    divConfirm.className = 'confirmar-exclusao-container';
    divConfirm.id = 'confirmar-exclusao-container';
    divText.className = 'confirmar-exclusao-titulo';
    divBotoes.className = 'confirmar-exclusao-botoes';

    h1.innerText = 'Confirmar exclusão';

    divText.appendChild(h1);

    sim.className = 'bx bx-check btn-sim';
    nao.className = 'bx bx-x btn-nao';

    divBotoes.appendChild(sim);
    divBotoes.appendChild(nao);

    divConfirm.appendChild(divText);
    divConfirm.appendChild(divBotoes);

    formExcluir.action = "/delete-entrega/" + dadosEntregas[i].id + "/" + dadosEntregas[i].produto_id + "/" +
        dadosEntregas[i].categoria + "/" + dadosEntregas[i].quantidade;
    formExcluir.method = 'post';
    
    coluna.appendChild(divConfirm);
    tabela.appendChild(formExcluir);

    sim.addEventListener("click", () => {formExcluir.submit()})
    nao.addEventListener("click", () => {divConfirm.classList.add('ocultar')})

}

function alterarData(){
    let seletorData = document.querySelector('#seletor-data');
    let dataSelecionada = seletorData.value;
    
    if (dataSelecionada != '') {
        let formData = document.createElement('form');
    
        formData.action = "/entregas/" + String(dataSelecionada);
        formData.method = 'post';
    
        document.getElementById('data').appendChild(formData);
        formData.submit();
        console.log('Enviado')
    } else {
        seletorData.classList.add('erro');    
    }

}

document.getElementById('btn-data').addEventListener("click", alterarData);

iniciarEntregas();