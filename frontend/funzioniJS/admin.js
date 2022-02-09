function cambiaVista(operazioneDaMostrare) {
    let container = document.getElementById('contenitoreOperazioni');
    if (operazioneDaMostrare == 'newCat')
        container.src = './adminHTML/nuovaCat.html';
    else if (operazioneDaMostrare == 'showCat')
        container.src = './adminHTML/mostraCat.html';
    else if (operazioneDaMostrare == 'newProd')
        container.src = './adminHTML/nuovoProd.html';
    else if (operazioneDaMostrare == 'showProd')
        container.src = './adminHTML/mostraProd.html';
}

function mostraCategorie() {
    let div = document.getElementById('listaCategorie');
    let divOps = document.getElementById('operazioni');
    div.innerHTML = '';
    divOps.innerHTML = '';

    let url = 'http://localhost:3000/getCategorie';

    fetch(url).then(response => response.json())
        .then(data => {
            console.log(data);
            let catTrovate = data.categorie;
            console.log(catTrovate);
            if (catTrovate.length > 0) {
                for (let i = 0; i < catTrovate.length; i++) {
                    div.innerHTML += '<li>' + catTrovate[i].nome;
                    divOps.innerHTML += '<li><a href="#" onclick="modificaCategoria(' + catTrovate[i].idcategorie + ')"><i class="fa fa-pencil" aria-hidden="true" ></i></a>' + '  ' + '<a href="#"onclick="cancellaCat(' + catTrovate[i].idcategorie + ')"><i class="fa fa-minus"  aria-hidden="true"></i></a></li>';
                };
                div.innerHTML += '</li>';
                divOps.innerHTML += '</li>';
            } else {
                div.innerHTML = '<h2>Nessuna categoria presente<h2/>';
            }
        }).catch(console.error);
}

function aggiungiCategoria() {
    let nuovaCat = {
        nome: document.getElementById('inputCategory').value
    }

    let response = fetch('http://localhost:3000/nuovaCat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuovaCat)
    });
    if (response.message = 'categoria inserita') {
        alert('Inserimento avvenuto con successo');
    }


};

function cancellaCat(idCategoria) {
    fetch('http://localhost:3000/cancellaCat/' + idCategoria, {
            method: 'DELETE'
        }).then(response => response.json())
        .then(data => {
            alert(data.message);
        }).catch(console.error);

    mostraCategorie();
}

function modificaCategoria(idcategoria) {
    console.log(idcategoria);
    let nuovoNome = prompt("Inserire nuovo nome:");
    if (nuovoNome == null || nuovoNome == "") {
        return;
    }
    let catDaModificare = {
        nome: nuovoNome
    }

    fetch('http://localhost:3000/modificaCat/' + idcategoria, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(catDaModificare)
        }).then(response => response.json())
        .then(data => {
            alert(data.message);
            mostraCategorie();
        }).catch(console.error);
};