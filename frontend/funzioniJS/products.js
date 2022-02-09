function stampaProdotti(idCategoria) {
    let container = document.getElementById("productContainer");

    let url = 'http://localhost:3000/getProdotti/' + idCategoria;

    fetch(url).then(response => response.json())
        .then(data => {
            console.log(data);
            let prodTrovati = data.prodotti;
            console.log(prodTrovati);
            let newProductDiv;
            if (prodTrovati.length > 0) {
                for (let i = 0; i < prodTrovati.length; i++) {
                    newProductDiv = document.createElement('div');
                    newProductDiv.innerHTML = `<div id="product-1" class="single-product">
    <div class="part-1">
        <ul>
            <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
            <li><a href="#"><i class="fa fa-heart"></i></a></li>
            <li><a href="#"><i class="fa fa-plus"></i></a></li>
            <li><a href="#"><i class="fa fa-expand"></i></a></li>
        </ul>
    </div>
    <div class="part-2">
        <h3 class="product-title">${prodTrovati[i].nome}</h3>
        <h4 class="product-old-price">${prodTrovati[i].prezzo};</h4>
        <h4 class="product-price">14&euro;</h4>
    </div>
</div>`
                    newProductDiv.style.background = `url(${prodTrovati[i].percorso}) no-repeat center`;
                    newProductDiv.style.backgroundSize = 'contain';
                    newProductDiv.style.transition = 'all 0.3s';
                    container.appendChild(newProductDiv);
                }
            }
        }).catch(console.error);
    let newProductDiv = document.createElement('div');

}