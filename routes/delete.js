const express = require("express")
const router = express.Router()
require("module-alias/register")
const client = require("@server/server")

const data = new Date()
const dia = data.getDate()
const mes = data.getMonth() + 1
const ano = data.getFullYear()
const diaAtual = ano + '-' + mes + '-' + dia

router.post('/delete-entrega/:idEntrega/:idProduto/:categoria/:quantidade', (req, res) =>{
    console.log("Entrega id = " + req.params.idEntrega + " deletada com sucesso!")
    console.log("Quantidade reposta no estoque = ", req.params.quantidade)
    
    client.query("DELETE FROM entregas WHERE id = " + req.params.idEntrega)
    client.query("SELECT quantidade_disponivel FROM " + req.params.categoria + " WHERE id = " + req.params.idProduto).then(results =>{
        const resultado = results.rows;
        client.query("UPDATE " + req.params.categoria + " SET quantidade_disponivel = " + 
                        (parseInt(resultado[0].quantidade_disponivel) + parseInt(req.params.quantidade)) + 
                    " WHERE id = " + req.params.idProduto)
    })
    res.redirect(307, '/entregas/' + diaAtual)
})

router.post('/delete-produto/:id/:rota', (req, res) =>{
    client.query("DELETE FROM " + req.params.rota + " WHERE id = " + req.params.id)
    console.log('Deletado o produto id = ' +  req.params.id + " da rota " + req.params.rota)
    res.redirect(307, '/produtos')
})


module.exports = router