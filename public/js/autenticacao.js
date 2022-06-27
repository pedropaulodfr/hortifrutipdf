let btnConfirmarAutenticacao = document.getElementById('btn-confirmar-autenticacao');
btnConfirmarAutenticacao.addEventListener("click", ()=>{
    verificarCamposAutenticacao();
})

document.getElementById('usuario').focus();

function verificarCamposAutenticacao(){
    let usuario = document.getElementById('usuario');
    let senha = document.getElementById('senha');

    if(usuario.value == ''){
        usuario.classList.add('erro')
    }else if (senha.value == ''){
        senha.classList.add('erro')
    }else{
        autenticacao(usuario.value, senha.value)
    }
}

function autenticacao(usuario, senha){
    console.log(usuario, senha);
    let form = document.createElement('form');
    form.action = '/autenticacao/' + usuario + '/' + senha;
    form.method = 'post';
    
    document.getElementById('autenticacao-container').appendChild(form);

    form.submit();
    //window.location.href = '/autenticacao/' + usuario + '/' + senha
}