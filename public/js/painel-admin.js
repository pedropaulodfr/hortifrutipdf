function bloquearRetroceder() {
    history.pushState(false, false, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(false, false, document.URL);
    });
    window.history.forward();
}

//window.onload = bloquearRetroceder;