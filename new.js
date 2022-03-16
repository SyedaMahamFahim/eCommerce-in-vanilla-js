const priceSign = "$"

const allProducts = [
    {
        id: 0,
        title: "Men Product 1",
        price: 100,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, alias?",
        url: 'men_1.jpg',
        qty: 0
    },
    {
        id: 1,
        title: "Men Product 2",
        price: 200,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, alias?",
        url: 'men_2.jpg',
        qty: 0
    },
    {
        id: 2,
        title: "Men Product 3",
        price: 300,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, alias?",
        url: 'men_3.jpg',
        qty: 0
    },
    {
        id: 3,
        title: "Women Product 1",
        price: 100,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, alias?",
        url: 'women_1.jpg',
        qty: 0
    },
    {
        id: 4,
        title: "Women Product 2",
        price: 100,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, alias?",
        url: 'women_2.jpg',
        qty: 0
    },
    {
        id: 5,
        title: "Women Product 3",
        price: 100,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, alias?",
        url: 'women_3.jpg',
        qty: 0
    },
    {
        id: 6,
        title: "Perfume 1",
        price: 100,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, alias?",
        url: 'perfume_1.jpg',
        qty: 0
    },
    {
        id: 7,
        title: "Perfume 2",
        price: 100,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, alias?",
        url: 'perfume_2.jpg',
        qty: 0
    },
    {
        id: 9,
        title: "Perfume 3",
        price: 100,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, alias?",
        url: 'perfume_3.jpg',
        qty: 0
    },

]


// Display all products on homepage
function displayProducts() {
    let innerDisplayProduct = "";
    allProducts.forEach(function (element, index) {
        innerDisplayProduct += `   

                  <div class="shop-card">
                    <div class="imgBx">
                        <img src="./images/${element.url}" alt=${element.title} />

                    </div>
                    <div class="content">
                        <div class="productName">
                            <h3>${element.title}
                            </h3>
                        </div>
                        <div class="price-rating">
                            <h2>${priceSign} ${element.price}</h2>
                        </div>
                        <div class="rating">
                            <button type="button" class="btn btn-dark cart-add" 
                            id=${index}
                            
            onclick="addToCart('${index}','${element.title}','${element.price}','${element.desc}','${element.url}','${element.qty}','${element}')"
                            >
                                Add to cart
                            </button>

                        </div>
                    </div>
                </div>
                  `;
    });
    let parentProductsDiv = document.getElementById("parent-product-div");
    if (parentProductsDiv != null) {
        parentProductsDiv.innerHTML = innerDisplayProduct;
    }


}

// Display cart qty in menu bar icon (cart icon)
function onLoadCartQuantity() {
    let getCartQ = localStorage.getItem('cartQ')
    getCartQ = parseInt(getCartQ)
    if (getCartQ) {
        document.querySelector('.cart-menu span').textContent = getCartQ
    } else {
        document.querySelector('.cart-menu span').textContent = 0
    }
}

// Add product to cart
function addToCart(id, title, price, desc, url, qty) {
    let getCartQ = localStorage.getItem('cartQ')
    getCartQ = parseInt(getCartQ)
    if (getCartQ) {
        localStorage.setItem('cartQ', getCartQ + 1)
        document.querySelector('.cart-menu span').textContent = getCartQ + 1
    } else {
        localStorage.setItem('cartQ', 1)
    }

    let product = {
        id: parseInt(id),
        title,
        price: parseInt(price),
        desc,
        url,
        qty: parseInt(qty),
    }

    setItemsInCart(product)

}

function setItemsInCart(product) {
    let getProductsInCart = localStorage.getItem('setProductsInCart')
    getProductsInCart = JSON.parse(getProductsInCart)

    if (getProductsInCart != null) {
        if (getProductsInCart[product.id] == undefined) {
            product.qty = 1;
            getProductsInCart = [
                ...getProductsInCart,
                product,
            ]
        }
        else {
            getProductsInCart[product.id].qty += 1
            getProductsInCart[product.id].price += allProducts[product.id].price
        }
    } else {
        product.qty += 1
        getProductsInCart = [
            product
        ]

    }

    localStorage.setItem('setProductsInCart', JSON.stringify(getProductsInCart))
    if (getProductsInCart != null) {
        displayProductOnCartPage(getProductsInCart)
    }
}
// When click on - sign ( Cart Page ) , jab mai is par click ho aik qty kaamm hojaye

function removeFromCart(id, title, price, desc, url, qty) {
    let getCartQ = localStorage.getItem('cartQ')
    getCartQ = parseInt(getCartQ)
    localStorage.setItem('cartQ', getCartQ - 1)
    document.querySelector('.cart-menu span').textContent = getCartQ - 1
    let product = {
        id: parseInt(id),
        title,
        price: parseInt(price),
        desc,
        url,
        qty: parseInt(qty),
    }

    // getting product. Konsa product mai sy qty kam ho raha hai 
    removeItemsFromCart(product)
}
// When click on - icon on cart page it will decrease the qty and price of that specific
function removeItemsFromCart(product) {
    let getProductsInCart = localStorage.getItem('setProductsInCart')
    getProductsInCart = JSON.parse(getProductsInCart)

    if (getProductsInCart != null) {
        if (getProductsInCart[product.id] != undefined) {
            if (getProductsInCart[product.id].qty > 1) {
                getProductsInCart[product.id].qty -= 1
                getProductsInCart[product.id].price -= allProducts[product.id].price
            }
        }

    }

    localStorage.setItem('setProductsInCart', JSON.stringify(getProductsInCart))


    if (getProductsInCart != null) {
        displayProductOnCartPage(getProductsInCart)
    }
}
// When clicked on trash icon it will remove the whole product 
function removeProductFromCart(index, qty) {

    let getCartQ = localStorage.getItem('cartQ')
    let getProductsInCart = localStorage.getItem('setProductsInCart')
    getProductsInCart = JSON.parse(getProductsInCart)
    let removeProduct = getProductsInCart.slice(index, 1)
    let confirmation = confirm("Do you want to remove the product from cart")
    if (confirmation) {
        localStorage.setItem('setProductsInCart', JSON.stringify(removeProduct))
        localStorage.setItem('cartQ', getCartQ - qty)
        window.location.reload();
    }
    console.log("lenght ", getProductsInCart.length)

}





function displayProductOnCartPage() {
    let getProductsInCart = localStorage.getItem('setProductsInCart')
    getProductsInCart = JSON.parse(getProductsInCart)

    let getParentContainer = document.getElementById('cart')

    let innerCartDisplayProduct = "";

    if (getProductsInCart != null) {
        getProductsInCart.forEach(function (element, index) {
            innerCartDisplayProduct += `  
                <tr>
                <td data-th="Product">
                  <div class="row">
                    <div class="col-sm-2 hidden-xs">
                    <img src="./images/${element.url}" alt=${element.title} class="img-responsive"
                    width="100%" />
                     
                    </div>
                    <div class="col-sm-10">
                      <a href="/new.js">
                        <h6 class="nomargin">${element.title}</h6>
                      </a>
                    </div>
                  </div>
                </td>
                <td data-th="Price">Price:${priceSign} ${element.price}</td>
                <td data-th="Quantity" >
                  <div class="cart-plus-minus">
                    <button
                      class="qtybutton"
                      onclick="removeFromCart('${index}','${element.title}','${element.price}','${element.desc}','${element.url}','${element.qty}')"
                    >
                      -
                    </button>
                   <span>${element.qty}</span>
                    <button
                      class="qtybutton"
                      onclick="addToCart('${index}','${element.title}','${element.price}','${element.desc}','${element.url}','${element.qty}')"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td data-th="Subtotal" class="text-center" >
                ${element.price}
                </td>
                <td class="actions" data-th >
                  <button class="btn btn-danger btn-sm" onclick="removeProductFromCart('${index}','${element.qty}')">
                   Trash
                  </button>
                </td>
                </tr>
                                
                `;
        });

        let parentCartProductsDiv = document.getElementById("tbody-cart");

        if (parentCartProductsDiv != null) {
            parentCartProductsDiv.innerHTML = innerCartDisplayProduct;
        }

    } else {
        if (getParentContainer != null) {
            document.getElementById('table-cart').style.display = "none"
            getParentContainer.innerHTML += `
        <div class="container"> No product in cart </div>  `
        }
    }
}



displayProducts()
onLoadCartQuantity()
displayProductOnCartPage()


