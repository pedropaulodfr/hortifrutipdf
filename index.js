const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const { send, get } = require("express/lib/response")
const porta = process.env.PORT || 8181

// Config. handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Conexão com o banco de dados
const Client = require('pg').Client
const client = new Client({
    user: "postgres",
    password: "admin",
    host: "localhost",
    port: 5432,
    database: "hortifruti"
})
client.connect()

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/frutas', (req, res) =>{
    client.query("SELECT * FROM frutas ORDER BY nome").then(results =>{
        const resultado = results.rows
        res.render('frutas', {
            dadosFrutas: JSON.stringify(resultado),
            nomeRota: JSON.stringify(req.route.path)
        })
    })
})

app.post('/verduras', (req, res) =>{
    client.query("SELECT * FROM verduras ORDER BY nome").then(results =>{
        const resultado = results.rows
        res.render('verduras', {
            dadosVerduras: JSON.stringify(resultado),
            nomeRota: JSON.stringify(req.route.path)
        })
    })
})

app.post('/legumes', (req, res) =>{
    client.query("SELECT * FROM legumes ORDER BY nome").then(results =>{
        const resultado = results.rows
        res.render('legumes', {
            dadosLegumes: JSON.stringify(resultado),
            nomeRota: JSON.stringify(req.route.path)
        })
    })
})

app.get('/comprar/:id/:nome/:valor/:unidade/:quantidadeDisponivel/:nomeImagem/:token/:nomeRota', (req, res) =>{
    res.render('comprar', {
        parametros: JSON.stringify(req.params)
    })
})

app.post('/confirmarCompra/:nomeRota/:id/:produto/:quantidade/:valorTotal/:nome/:cpf/:telefone/:rua/:numero/:bairro/:cidade/:cep', (req, res) =>{
    console.log(req.params)
    client.query("SELECT quantidade_disponivel FROM " + req.params.nomeRota + " WHERE id =" + req.params.id).then(results =>{
        const resultado = results.rows
        quantidadeDisponivel = resultado[0].quantidade_disponivel
        inserirEntregasBD()
        atualizarQuantidadeDisponivel(quantidadeDisponivel)
    })

    function inserirEntregasBD() {
        let sql = "INSERT INTO entregas (produto, quantidade, valor_total, nome, cpf, telefone, rua, numero, bairro, cidade, cep) VALUES" +
        "($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);";
        let values = [String(req.params.produto), req.params.quantidade, req.params.valorTotal, String(req.params.nome),
            String(req.params.cpf), String(req.params.telefone), String(req.params.rua), req.params.numero,String(req.params.bairro),
            String(req.params.cidade), String(req.params.cep)]
        try {
            client.query(sql, values)
        } catch (error) {
            console.log(error);        
        }
        console.log('Dados inseridos com sucesso');
    }

    function atualizarQuantidadeDisponivel(quantidadeDisponivel) {
        console.log(quantidadeDisponivel);
        client.query("UPDATE " + req.params.nomeRota + " SET quantidade_disponivel =" + (quantidadeDisponivel - parseInt(req.params.quantidade)) + "WHERE id =" + req.params.id)
        console.log('Quantidade atualizada');
    }

})

app.get('/admin', (req, res) =>{
    res.render("autenticacao")
})

app.post('/autenticacao/:usuario/:senha', (req, res) =>{
    console.log(req.params);
    let usuario = req.params.usuario
    let senha = req.params.senha

    const data = new Date()
    const dia = data.getDate()
    const mes = data.getMonth() + 1
    const ano = data.getFullYear()
    const diaAtual = ano + '-' + mes + '-' + dia
    
    client.query("SELECT * FROM usuarios").then(results =>{
        const resultado = results.rows
        let indexUsuario = resultado.findIndex(element => element.nome_usuario == usuario)
        let indexSenha = resultado.findIndex(element => element.senha == senha)
        
        try {
            var usuarioBD = resultado[indexUsuario].nome_usuario
            var senhaBD = resultado[indexUsuario].senha
        } catch (error) {
            console.log(error);
            res.redirect('/admin')
        }
        
        console.log(usuarioBD, senhaBD);
        
        if (usuario == usuarioBD && senha == senhaBD) {
            console.log('Usuário Autenticado')
            res.redirect(307, '/painel-admin/' + diaAtual)
        } else {
            console.log('Falha de Autenticação')
            res.redirect('/admin')
        }

    })
})

app.post('/painel-admin/:diaAtual', (req, res) => {
    console.log(req.params.diaAtual);
    client.query("SELECT *, to_char(data_pedido, 'DD/MM/YYYY') AS data_pedido FROM entregas WHERE data_pedido = '" + req.params.diaAtual + "'").then(results =>{
        const resultado = results.rows
        res.render('painel-admin', {
            dadosEntregas: JSON.stringify(resultado)
        } )
    })
})

app.listen(porta, ()=>{
    console.log("Servidor rodando na porta http://localhost:" + porta);
})