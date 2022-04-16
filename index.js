"use strict";

const productView = document.querySelector('.product-view');

const pagination = document.querySelector('.pagination')

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

const search = (page) => {
    let filter = searchBar.value.toLowerCase();
    productView.innerHTML = '';

    fetch(`http://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=${filter}&resultsFormat=native&page=${page}`)
        .then(response => response.json())
        .then(data => {

            console.log(data)
            console.log(data.pagination)


            let pageHandler = (page) => {
                if (data.pagination.currentPage + page <= data.pagination.totalPages) {
                    return data.pagination.currentPage + page
                } else {
                    return "";
                }
            }

            let firstPageNavTemplate =
                `<div class="pagination__prev-box" style="visibility: hidden">
                    <svg class="pagination__prev">
                        <use xlink:href="img/sprite.svg#icon-chevron-small-left"></use>
                    </svg>
                </div>

                <div class="pagination__pages">
                    <div class="pagination__page-box" onclick="search(${data.pagination.currentPage})">
                        <span class="pagination__page pagination__page-current">${data.pagination.currentPage}</span>
                    </div>
                    <div class="pagination__page-box" onclick="search(${pageHandler(1)})">
                        <span class="pagination__page">${pageHandler(1)}</span>
                    </div>
                    <div class="pagination__page-box" onclick="search(${pageHandler(2)})">
                        <span class="pagination__page">${pageHandler(2)}</span>
                    </div>
                    <div class="pagination__page-box" onclick="search(${pageHandler(3)})">
                        <span class="pagination__page">${pageHandler(3)}</span>
                    </div>
                    <div class="pagination__page-box" onclick="search(${pageHandler(4)})">
                        <span class="pagination__page">${pageHandler(4)}</span>
                    </div>
                </div>


                <div class="pagination__next-box">
                    <svg class="pagination__next">
                        <use xlink:href="img/sprite.svg#icon-chevron-small-right"></use>
                    </svg>
                </div>`


            let lastPageNavTemplate =
                `<div class="pagination__prev-box">
                    <svg class="pagination__prev">
                        <use xlink:href="img/sprite.svg#icon-chevron-small-left"></use>
                    </svg>
                </div>

                <div class="pagination__pages">
                    <div class="pagination__page-box" onclick="search(${data.pagination.currentPage})">
                        <span class="pagination__page pagination__page-current">${data.pagination.currentPage}</span>
                    </div>
                </div>

                <div class="pagination__next-box" style="visibility: hidden">
                    <svg class="pagination__next">
                        <use xlink:href="img/sprite.svg#icon-chevron-small-right"></use>
                    </svg>
                </div>`




            let navTemplate =
                `<div class="pagination__prev-box">
                    <svg class="pagination__prev">
                        <use xlink:href="img/sprite.svg#icon-chevron-small-left"></use>
                    </svg>
                </div>

                <div class="pagination__pages">
                    <div class="pagination__page-box" onclick="search(${data.pagination.currentPage})">
                        <span class="pagination__page pagination__page-current">${data.pagination.currentPage}</span>
                    </div>
                    <div class="pagination__page-box" onclick="search(${pageHandler(1)})">
                        <span class="pagination__page">${pageHandler(1)}</span>
                    </div>
                    <div class="pagination__page-box" onclick="search(${pageHandler(2)})">
                        <span class="pagination__page">${pageHandler(2)}</span>
                    </div>
                    <div class="pagination__page-box" onclick="search(${pageHandler(3)})">
                        <span class="pagination__page">${pageHandler(3)}</span>
                    </div>
                    <div class="pagination__page-box" onclick="search(${pageHandler(4)})">
                        <span class="pagination__page">${pageHandler(4)}</span>
                    </div>
                </div>

                <div class="pagination__next-box">
                    <svg class="pagination__next">
                        <use xlink:href="img/sprite.svg#icon-chevron-small-right"></use>
                    </svg>
                </div>`


            if (data.pagination.currentPage === 1) {
                pagination.innerHTML = firstPageNavTemplate;
            } else if (data.pagination.currentPage === data.pagination.totalPages) {
                pagination.innerHTML = lastPageNavTemplate;
            } else {
                pagination.innerHTML = navTemplate;
            }


            let prevBtn = document.querySelector('.pagination__prev-box');
            let nextBtn = document.querySelector('.pagination__next-box');

            prevBtn.addEventListener('click', () => {
                search(data.pagination.currentPage - 1)
            })

            nextBtn.addEventListener('click', () => {
                search(data.pagination.currentPage + 1)
            })


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
        search(1)
    }
});

searchButton.addEventListener('click', () => {
    search(1)
});

search(1);
