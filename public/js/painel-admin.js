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
    
            dadoData.innerText = dadosEntregas[i].data_pedido;
            dadoNome.innerText = dadosEntregas[i].nome;
            dadoCPF.innerText = dadosEntregas[i].cpf;
            dadoEndereco.innerText = dadosEntregas[i].rua + ', ' + dadosEntregas[i].numero + ', ' + dadosEntregas[i].bairro +
                ', ' + dadosEntregas[i].cidade + ', ' + dadosEntregas[i].cep;
            dadoTelefone.innerText = dadosEntregas[i].telefone;
            dadoProduto.innerText = dadosEntregas[i].produto;
            dadoQuantidade.innerText = dadosEntregas[i].quantidade;
            dadoValorTotal.innerText = dadosEntregas[i].valor_total;
    
            linha.appendChild(dadoData);
            linha.appendChild(dadoNome);
            linha.appendChild(dadoCPF);
            linha.appendChild(dadoEndereco);
            linha.appendChild(dadoTelefone);
            linha.appendChild(dadoProduto);
            linha.appendChild(dadoQuantidade);
            linha.appendChild(dadoValorTotal);
            tabela.appendChild(linha);
        }
    } else {
        let tabela = document.getElementById('dados-entrega');

        let h1 = document.createElement('h1');
        h1.innerText = 'Não há entregas para as data selecionada';


        tabela.appendChild(h1);
    }
}

function alterarData(){
    let seletorData = document.querySelector('#seletor-data');
    let dataSelecionada = seletorData.value;
    
    if (dataSelecionada != '') {
        let formData = document.createElement('form');
    
        formData.action = "/painel-admin/" + String(dataSelecionada);
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