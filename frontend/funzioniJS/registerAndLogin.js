function registrati() {
    terms = document.querySelector('#terms');
    if (terms.checked == false) {
        alert('Accettare i termini per registrarsi.');
        return;
    }
    let dati = {
        nome: document.getElementById('inputNome').value,
        cognome: document.getElementById('inputCognome').value,
        pIva: document.getElementById('inputIVA').value,
        codFiscale: document.getElementById('inputCF').value,
        nazione: document.getElementById('inputNaz').value,
        via: document.getElementById('inputVia').value,
        cap: document.getElementById('inputCAP').value,
        comune: document.getElementById('inputCom').value,
        provincia: document.getElementById('inputProv').value,
        telefono: document.getElementById('inputTel').value,
        username: document.getElementById('inputUser').value,
        email: document.getElementById('inputEmail').value,
        password: document.getElementById('inputPass').value
    }
    for (var attributo in dati) {
        if (dati[attributo] == null || dati[attributo] == undefined || dati[attributo] == '') {
            alert('Inserire valori in tutti i campi.');
            return
        }
    }
    console.log(dati);
    fetch('http://localhost:3000/registrati', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dati)
    });

    alert('Registrazione avvenuta con successo');
    /* let result = response.json();
    alert(result.message); */

};

function login() {
    let datiUtente = {
        email: document.getElementById('floatingInput').value,
        password: document.getElementById('floatingPassword').value
    }
    for (var attributo in datiUtente) {
        if (datiUtente[attributo] == null || datiUtente[attributo] == undefined || datiUtente[attributo] == '') {
            alert('Email o password non inseriti.');
            return
        }
    }
    let url = 'http://localhost:3000/login';
    url += '?';

    for (let i in datiUtente) {
        url += i + '=' + datiUtente[i] + '&';
    }
    url = url.slice(0, -1);
    let div = document.getElementById('loginResult');

    fetch(url).then(response => response.json())
        .then(data => {
            if (data.message == 'utente non trovato') {
                div.innerHTML = '<h3>Accesso non riuscito</h3>';
            } else {
                div.innerHTML = '<h3>Accesso riuscito</h3>';
                console.log(data.attributi[0]);
                let url = 'index.html?username=' + data.attributi[0].username + '&userType=' + data.attributi[0].tipoutente;
                window.location.href = url;

            }
            console.log(data);
        }).catch(console.error);
}

function cambiaEtichetta() {
    if (optionSec.value == 1) {
        document.getElementById('labelNome').innerHTML = 'Nome';
        document.getElementById('inputCognome').value = '';
        document.getElementById('inputCognome').hidden = false;
        document.getElementById('labelCognome').innerHTML = 'Cognome';
    } else if (optionSec.value == 2) {
        document.getElementById('labelNome').innerHTML = 'Ragione sociale';
        document.getElementById('labelCognome').innerHTML = '';
        document.getElementById('inputCognome').value = '/';
        document.getElementById('inputCognome').hidden = true;
    }
    console.log('cambio etichetta');
}