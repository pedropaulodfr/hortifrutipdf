const express = require("express")
const router = express.Router()
require("module-alias/register")
const client = require("@server/server")

const data = new Date()
const dia = data.getDate()
const mes = data.getMonth() + 1
const ano = data.getFullYear()
const diaAtual = ano + '-' + mes + '-' + dia

router.post('/editar-produto/:id/:rota/:atributo/:novoValor', (req, res) =>{
    let id = req.params.id;
    let rota = req.params.rota;
    let atributo = req.params.atributo;
    let novoValor = req.params.novoValor;

    if (atributo == 'valor' || atributo == 'quantidade_disponivel') {
        client.query("UPDATE " + rota + " SET " + atributo + " = '" + novoValor + "' WHERE id = " + id);
        console.log("UPDATE " + rota + " SET " + atributo + " = " + novoValor + " WHERE id = " + id);
    }else{
        client.query("UPDATE " + rota + " SET " + atributo + " = '" + novoValor + "' WHERE id = " + id);
        console.log("UPDATE " + rota + " SET " + atributo + " = '" + novoValor + "' WHERE id = " + id);
    }
    
    res.redirect(307, '/produtos')
})

module.exports = router