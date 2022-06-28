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


// Conexão com o Banco de Dados
const client = require("./server/server")
client.connect();

const data = new Date()
const dia = data.getDate()
const mes = data.getMonth() + 1
const ano = data.getFullYear()
const diaAtual = ano + '-' + mes + '-' + dia

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

app.post('/confirmarCompra/:nomeRota/:id/:produto/:quantidade/:valorTotal/:nome/:cpf/:telefone/:rua/:numero/:bairro/:cidade/:cep', (req, res) =>{
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

app.post('/delete-entrega/:idEntrega/:idProduto/:categoria/:quantidade', (req, res) =>{
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
        } catch (error) {
            console.log(error);
            res.redirect('/admin')
        }
        
        if (usuario == usuarioBD && senha == senhaBD) {
            console.log('Usuário ' + usuarioBD + ' autenticado')
            res.redirect(307, '/painel-admin/' + usuarioBD)
        } else {
            console.log('Falha de autenticação')
            res.redirect('/admin')
        }

    })
})

app.post('/painel-admin/:usuario', (req, res) =>{
    client.query("SELECT superuser FROM usuarios WHERE nome_usuario = '" + req.params.usuario + "'").then(results =>{
        const resultado = results.rows

        if (resultado[0].superuser == 1) {
            res.render('painel-admin', {
                superUser: resultado
            })
        } else {
            res.render('painel-admin')
        }
    })
})

app.post('/consultar/:categoria', (req, res) =>{
    let categoria = req.params.categoria

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
        case 'add-usuarios':
            console.log('CATEGORIA -> ' + categoria)
            res.redirect(307, '/add-usuarios')
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
                //console.log(resultadoFrutas, resultadoVerduras, resultadoLegumes)
                res.render('produtos', {
                    dadosConsultaFrutas: resultadoFrutas,
                    dadosConsultaVerduras: resultadoVerduras,
                    dadosConsultaLegumes: resultadoLegumes
                })
            })
        })
    })
})

app.post('/delete-produto/:id/:rota', (req, res) =>{
    client.query("DELETE FROM " + req.params.rota + " WHERE id = " + req.params.id)
    console.log('Deletado o produto id = ' +  req.params.id + " da rota " + req.params.rota)
    res.redirect(307, '/produtos')
})

app.post('/editar-produto/:id/:rota/:atributo/:novoValor', (req, res) =>{
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

app.post('/add-produtos', (req, res) => {
    res.render("add-produtos")
})

app.post('/salvar-produtos/:nome/:categoria/:valor/:unidade/:quantDisp/:nomeImagem/:token', (req, res) => {
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

app.post('/add-usuarios', (req, res) =>{
    res.render('add-usuarios')
})

app.post('/salvar-usuarios/:nome/:cpf/:username/:senha', (req, res) =>{
    let nome = req.params.nome
    let cpf = req.params.cpf
    let username = req.params.username
    let senha = req.params.senha

    let sql = "INSERT INTO usuarios VALUES ($1, $2, $3, $4)"
    let values = [nome, cpf, username, senha]

    client.query(sql, values)

    console.log("Usuário '" + username + "' cadastrado");
})

app.listen(porta, ()=>{
    console.log("Servidor rodando na porta http://localhost:" + porta)
})