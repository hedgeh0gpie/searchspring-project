"use strict";

const productView = document.querySelector('.product-view');

const searchBar = document.querySelector('.search__input');

const searchButton = document.querySelector('.search__button');

const cart = document.querySelector('.user-nav__icon-box');

const cartQuantityBadge = `<span class="user-nav__notification"></span>`;

let cartQuantity = 0;

const addToCart = () => {
    if (!document.body.contains(document.querySelector('.user-nav__notification'))) {
        cart.innerHTML += cartQuantityBadge;
    }

    document.querySelector('.user-nav__notification').innerText = ++cartQuantity;
}

const search = () => {
        let filter = searchBar.value.toLowerCase();
        productView.innerHTML = '';

        fetch(`http://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=${filter}&resultsFormat=native&page=1`)
            .then(response => response.json())
            .then(data => {
                data.results.map(product => {
                    const productCard = `<div class="product">
                <img src=${product.imageUrl} alt="" class="product__img">
                    <h5 class="product__name">${product.name}</h5>
                    <div class="product__price">
                        <p>$${product.price}</p>
                    </div>
                    <button class="btn product__btn">Add To Cart</button>
            </div>`

                    productView.innerHTML += productCard;

                    let addToCartButtonList = document.querySelectorAll('.product__btn');

                    addToCartButtonList.forEach(btn => {
                        btn.addEventListener('click', addToCart)
                    })
                })
            });
}



searchBar.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        search()
    }
});

searchButton.addEventListener('click', search);


