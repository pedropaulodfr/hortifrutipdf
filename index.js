const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
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

app.get('/comprar/:nome/:valor/:unidade/:nomeImagem/:token/:nomeRota', (req, res) =>{
    res.render('comprar', {
        parametros: JSON.stringify(req.params)
    })
})

app.listen(porta, ()=>{
    console.log("Servidor rodando na porta http://localhost:" + porta);
})