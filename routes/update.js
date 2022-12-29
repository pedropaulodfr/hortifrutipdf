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
    }else if(atributo == 'link_imagem'){
        client.query("UPDATE " + rota + " SET " + atributo + " = '" + novoValor.replace(/kc=191/g, '/').replace(/kc=193/g, '?').replace(/kc=535070/g, '%2F') + "' WHERE id = " + id);
        console.log("UPDATE " + rota + " SET " + atributo + " = " + novoValor + " WHERE id = " + id);
    }else{
        client.query("UPDATE " + rota + " SET " + atributo + " = '" + novoValor + "' WHERE id = " + id);
        console.log("UPDATE " + rota + " SET " + atributo + " = '" + novoValor + "' WHERE id = " + id);
    }
    
    res.redirect(307, '/produtos')
})


router.post('/editar-usuario/:id/:atributo/:novoValor', (req, res) => {
    let id = req.params.id
    let atributo = req.params.atributo
    let novoValor = req.params.novoValor

    if (atributo == "nome-usuario") {
        atributo = "nome_usuario"
    }

    client.query("UPDATE usuarios SET " + atributo + " = '" + novoValor + "' WHERE id = " + id)
    console.log("Atributo " + atributo + " do id " + id + " alterado com sucesso para " + novoValor)

    res.redirect(307, '/listar-usuarios')
})

router.post('/editar-meu-perfil/:id/:atributo/:novoValor', (req, res) => {
    let id = req.params.id
    let atributo = req.params.atributo
    let novoValor = req.params.novoValor

    if (atributo == "nome-usuario") {
        atributo = "nome_usuario"
    }
    
    if (atributo == "imagem_perfil") {
        client.query("UPDATE usuarios SET " + atributo + " = '" + novoValor.replace(/kc=191/g, '/').replace(/kc=193/g, '?').replace(/kc=535070/g, '%2F') + "' WHERE id = " + id)
        console.log("Atributo " + atributo + " do id " + id + " alterado com sucesso para " + novoValor.replace(/kc=191/g, '/').replace(/kc=193/g, '?').replace(/kc=535070/g, '%2F'))
        
    }else{
        client.query("UPDATE usuarios SET " + atributo + " = '" + novoValor + "' WHERE id = " + id)
        console.log("Atributo " + atributo + " do id " + id + " alterado com sucesso para " + novoValor)
    }


    res.redirect(307, '/meu-perfil/' + id)
})

module.exports = router