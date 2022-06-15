let retrocederBtn = document.getElementById("btn-retroceder");
retrocederBtn.addEventListener("click", retrocederPagina)

let deslogarBtn = document.getElementById("btn-deslogar");
deslogarBtn.addEventListener("click", deslogar)

function retrocederPagina() {
    window.history.back();
}

function deslogar() {
    bloquearRetroceder()
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

window.onload = bloquearRetroceder;


