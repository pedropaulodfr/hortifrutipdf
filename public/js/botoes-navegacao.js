let retrocederBtn = document.getElementById("btn-retroceder");
retrocederBtn.addEventListener("click", retrocederPagina)

let deslogarBtn = document.getElementById("btn-deslogar");
deslogarBtn.addEventListener("click", deslogar)

function retrocederPagina() {
    window.history.back();
}

function imagemPerfil() {
    let linkImagemPerfil = localStorage.getItem("imagem_perfil");

    console.log(linkImagemPerfil);

    let imagemPerfil = document.getElementById("imagem-perfil");
    imagemPerfil.src = linkImagemPerfil;
}

function deslogar() {
    bloquearRetroceder()

    localStorage.clear("imagem_perfil")

    let form = document.createElement("form");

    form.action = "/admin";
    form.method = "get";
    
    document.getElementById("botoes-navegacao").appendChild(form);

    form.submit();
}

function bloquearRetroceder() {
    history.pushState(false, false, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(false, false, document.URL);
    });
    window.history.forward();
}

window.onload = imagemPerfil;


