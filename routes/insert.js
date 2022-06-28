const express = require("express")
const router = express.Router()
require("module-alias/register")
const client = require("@server/server")

router.post('/confirmarCompra/:nomeRota/:id/:produto/:quantidade/:valorTotal/:nome/:cpf/:telefone/:rua/:numero/:bairro/:cidade/:cep', (req, res) =>{
    client.query("SELECT quantidade_disponivel FROM " + req.params.nomeRota + " WHERE id =" + req.params.id).then(results =>{
        const resultado = results.rows
        quantidadeDisponivel = resultado[0].quantidade_disponivel
        inserirEntregasBD()
        atualizarQuantidadeDisponivel(quantidadeDisponivel)
    })

    function inserirEntregasBD() {
        let sql = "INSERT INTO entregas" + 
                    "(produto, quantidade, valor_total, nome, cpf, telefone, rua, numero, " +
                    "bairro, cidade, cep, produto_id, categoria)" +
                "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);"
        let values = [String(req.params.produto), req.params.quantidade, req.params.valorTotal, String(req.params.nome),
            String(req.params.cpf), String(req.params.telefone), String(req.params.rua), req.params.numero, String(req.params.bairro),
            String(req.params.cidade), String(req.params.cep), req.params.id, req.params.nomeRota]
        try {
            client.query(sql, values)
        } catch (error) {
            console.log(error);        
        }
        console.log('Entrega gravada do Banco de Dados');
    }

    function atualizarQuantidadeDisponivel(quantidadeDisponivel) {
        client.query("UPDATE " + req.params.nomeRota + " SET quantidade_disponivel =" + (quantidadeDisponivel - parseInt(req.params.quantidade)) + "WHERE id =" + req.params.id)
        console.log('Nova quantidade ' + quantidadeDisponivel + ' atualizada em ' + req.params.nomeRota);
    }

})

router.post('/salvar-produtos/:nome/:categoria/:valor/:unidade/:quantDisp/:nomeImagem/:token', (req, res) => {
    let nome = req.params.nome
    let categoria = req.params.categoria
    let valor = req.params.valor
    let unidade = req.params.unidade
    let quantDisp = req.params.quantDisp
    let nomeImagem = req.params.nomeImagem
    let token = req.params.token

    let sql = "INSERT INTO " + categoria + " (nome, nome_imagem, valor, token, unidade, quantidade_disponivel)" + 
    " VALUES ($1, $2, $3, $4, $5, $6)"
    let values = [nome, nomeImagem, valor, token, unidade, quantDisp]

    client.query(sql, values)

    console.log("Produto '" + nome + "' inserido com sucesso em " + categoria);

})

router.post('/salvar-usuarios/:nome/:cpf/:username/:senha', (req, res) =>{
    let nome = req.params.nome
    let cpf = req.params.cpf
    let username = req.params.username
    let senha = req.params.senha

    let sql = "INSERT INTO usuarios (nome, cpf, nome_usuario, senha) VALUES ($1, $2, $3, $4)"
    let values = [nome, cpf, username, senha]

    client.query(sql, values)

    console.log("Usuário '" + username + "' cadastrado");
})

module.exports = router