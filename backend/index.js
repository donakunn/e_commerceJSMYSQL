//npm : repository di node.js
const express = require('express'); //import libreria express
const bodyparser = require('body-parser'); //import libreria body-parser
const cors = require('cors'); //import libreria cors
const mysql = require('mysql2'); //import libreria mysql

const app = express(); //creo istanza server

app.use(cors()); //imposto al server la lib cors 
app.use(bodyparser.json()); //imposto al server la lib bodyparser
//nello specifico configuro json per modellare i dati nel body.

app.listen(3000, () => { //imposto il server in ascolto sulla
    console.log('Server avviato correttamente.') //porta 3000
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ecommerce',
    port: 3306
});

app.post('/registrati', (req, res) => { //riceve i dati in un json nel body        let nome = req.body.nome;           //cerca nel body un json con campo cognome
    console.log('registrazione in corso');
    let nome = req.body.nome;
    let cognome = req.body.cognome;
    let email = req.body.email;
    let password = req.body.password;
    let partitaiva = req.body.partitaiva;
    let nazione = req.body.nazione;
    let indirizzo = req.body.via + '/' + req.body.comune + '/' + req.body.cap + '/' + req.body.provincia;
    let telefono = req.body.telefono;
    let username = req.body.username;
    let codFiscale = req.body.codFiscale;

    let qry = `insert into utenti (nome,cognome,email,password, partitaiva, nazione, indirizzo, telefono, username,codfiscale) 
        values('${nome}','${cognome}','${email}','${password}','${partitaiva}','${nazione}','${indirizzo}','${telefono}','${username}','${codFiscale}')`;
    db.query(qry, (err, result) => {
        res.send({
            mes: 'utente inserito'
        });
    })
});

app.get('/login', (req, res) => {
    console.log('richiesta login');
    let email = req.query.email;
    let password = req.query.password;
    let qry = `SELECT * FROM ecommerce.utenti where (email = '${email}' AND password='${password}')`;
    db.query(qry, (err, result) => {
        if (result.length > 0) {
            res.send({
                message: 'utente trovato',
                attributi: result
            })
        } else {
            res.send({
                message: 'utente non trovato',
            })
        }
    })
});

app.post('/nuovaCat', (req, res) => {
    console.log('aggiunta categoria in corso');
    let nome = req.body.nome;
    let qry = `insert into categorie (nome) values('${nome}')`;
    db.query(qry, (err, result) => {
        res.send({
            mes: 'categoria inserita'
        });
    })
});

app.delete('/cancellaCat/:id', (req, res) => {
    let idcategoria = req.params.id;
    console.log('cancello categoria con id: ' + idcategoria);
    let qry = `delete from categorie  where idcategorie = ${idcategoria}`;
    db.query(qry, (err, result) => {
        if (result.affectedRows > 0) {
            res.send({
                message: 'dati cancellati correttamente.'
            });
        } else {
            res.send({
                message: 'Impossibile cancellare la categoria selezionata.'
            });
        }
    })
});

app.get('/getCategorie', (req, res) => {
    console.log('lettura categorie');
    let qry = `select * from categorie`;
    db.query(qry, (err, result) => {
        if (result.length > 0) {
            res.send({
                message: 'categorie trovate',
                categorie: result
            })
        } else {
            res.status = 400;
            res.send({
                message: 'nessuna categoria presente'
            })
        }
    })
});

app.put('/modificaCat/:id', (req, res) => {

    let idCategoria = req.params.id;

    let nome = req.body.nome;

    let qry = `update categorie set nome = '${nome}' on idcategorie = ${idCategoria}`;
    db.query(qry, (err, result) => {
        res.send({
            message: 'dati modificati correttamente.'
        });
    })
});

app.get('/getProdotti/:id', (req, res) => {
    console.log('lettura prodotti');
    let idCategoria = req.params.id;
    let qry = `select * from prodotti where categoria = ${idCategoria}`;

    db.query(qry, (err, result) => {
        if (result.length > 0) {
            res.send({
                message: 'prodotti trovati',
                prodotti: result
            })
        } else {
            res.status = 400;
            res.send({
                message: 'nessun prodotto trovato'
            })
        }
    })
});