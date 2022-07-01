const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
require("module-alias/register")


const porta = process.env.PORT || 8181

// Config. handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Conexão com o Banco de Dados
const client = require("./server/server")
client.connect();

const data = new Date()
const dia = data.getDate()
const mes = data.getMonth() + 1
const ano = data.getFullYear()
const diaAtual = ano + '-' + mes + '-' + dia

// Rotas 
const insert = require("./routes/insert")
const del = require("./routes/delete")
const update = require("./routes/update")

app.use('/insert', insert)
app.use('/delete', del)
app.use('/update', update)


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

app.post('/comprar/:id/:nome/:valor/:unidade/:quantidadeDisponivel/:nomeImagem/:token/:nomeRota', (req, res) =>{
    res.render('comprar', {
        parametros: JSON.stringify(req.params)
    })
})

app.get('/admin', (req, res) =>{
    res.render("autenticacao")
})

app.post('/autenticacao/:usuario/:senha', (req, res) =>{
    let usuario = req.params.usuario
    let senha = req.params.senha
    
    client.query("SELECT * FROM usuarios").then(results =>{
        const resultado = results.rows
        let indexUsuario = resultado.findIndex(element => element.nome_usuario == usuario)
        let indexSenha = resultado.findIndex(element => element.senha == senha)
        
        try {
            var usuarioBD = resultado[indexUsuario].nome_usuario
            var senhaBD = resultado[indexUsuario].senha
            var idBD = resultado[indexUsuario].id

            console.log(idBD, usuarioBD, senhaBD);
        } catch (error) {
            res.redirect(307, '/admin')
        }
        
        if (usuario == usuarioBD && senha == senhaBD) {
            console.log('Usuário ' + usuarioBD + ' autenticado')
            res.redirect(307, '/painel-admin/' + idBD + '/'  + usuarioBD)
        } else {
            console.log('Falha de autenticação')
            res.redirect('/admin')
        }

    })
})

app.post('/painel-admin/:id/:usuario', (req, res) =>{
    let usuario  = req.params.usuario

    client.query("SELECT superuser, id FROM usuarios WHERE nome_usuario = '" + usuario + "'").then(results =>{
        const resultado = results.rows

        console.log(resultado[0]);

        if (resultado[0].superuser == 1) {
            res.render('painel-admin', {
                superUser: resultado,
                dadosID: resultado
            })
        } else {
            res.render('painel-admin', {
                dadosID: resultado
            })
        }
    })
})

app.post('/consultar/:categoria/:id', (req, res) =>{
    let categoria = req.params.categoria
    let id = req.params.id

    switch (categoria) {
        case 'entregas':
            res.redirect(307, '/entregas/' + diaAtual)
            break
        case 'produtos':
            console.log('CATEGORIA -> ' + categoria)
            res.redirect(307, '/produtos')
            break
        case 'add-produtos':
            console.log('CATEGORIA -> ' + categoria)
            res.redirect(307, '/add-produtos')
            break
        case 'listar-usuarios':
            console.log('CATEGORIA ->' + categoria);
            res.redirect(307, '/listar-usuarios')
            break
        case 'add-usuarios':
            console.log('CATEGORIA -> ' + categoria)
            res.redirect(307, '/add-usuarios')
            break
        case 'meu-perfil':
            console.log('CATEGORIA -> ' + categoria)
            res.redirect(307, '/meu-perfil/' + id)
            break
    }
})

app.post('/entregas/:diaAtual', (req, res) => {
    console.log('Mostrando tabela do dia ' + req.params.diaAtual);
    client.query("SELECT *, to_char(data_pedido, 'DD/MM/YYYY') AS data_pedido FROM entregas WHERE data_pedido = '" + req.params.diaAtual + "'").then(results =>{
        const resultado = results.rows
        res.render('entregas', {
            dadosEntregas: JSON.stringify(resultado)
        } )
    })
})

app.post('/produtos', (req, res) =>{
    client.query("SELECT * FROM frutas").then(resultsFrutas =>{
        const resultadoFrutas = resultsFrutas.rows
        client.query("SELECT * FROM verduras").then(resultsVerduras =>{
            const resultadoVerduras = resultsVerduras.rows
            client.query("SELECT * FROM legumes").then(resultsLegumes =>{
                const resultadoLegumes = resultsLegumes.rows
                res.render('produtos', {
                    dadosConsultaFrutas: resultadoFrutas,
                    dadosConsultaVerduras: resultadoVerduras,
                    dadosConsultaLegumes: resultadoLegumes
                })
            })
        })
    })
})

app.post('/add-produtos', (req, res) => {
    res.render("add-produtos")
})

app.post('/add-usuarios', (req, res) => {
    res.render('add-usuarios')
})

app.post('/listar-usuarios', (req, res) => {
    client.query("SELECT * FROM usuarios").then(resultsUsuarios =>{
        const resultadoUsuarios = resultsUsuarios.rows
        res.render('listar-usuarios', {
            dadosConsultaUsuarios: resultadoUsuarios
        })
    })
})

app.post('/meu-perfil/:id', (req, res) => {
    let id = req.params.id
    console.log("Meu perfil ->", id);
    client.query("SELECT * FROM usuarios WHERE id = " + id).then(resultsUsuario =>{
        const resultadoUsuario = resultsUsuario.rows
        res.render('meu-perfil', {
            dadosConsultaUsuario: resultadoUsuario
        })
    })
})

app.listen(porta, ()=>{
    console.log("Servidor rodando na porta http://localhost:" + porta)
})