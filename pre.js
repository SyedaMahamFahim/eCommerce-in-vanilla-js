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
                            
            onclick="setItemsInCart('${element.id}','${element.title}','${element.price}','${element.desc}','${element.url}','${element.qty}')"
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


function onLoadCartQuantity() {
    let getCartQ = localStorage.getItem('cartQ')
    if (getCartQ) {
        document.querySelector('.cart-menu span').textContent = getCartQ
    } else {
        document.querySelector('.cart-menu span').textContent = 0
    }
}

function setItemsInCart(id, title, price, desc, url, qty) {

    let getProductsInCart = localStorage.getItem('setProductsInCart')
    getProductsInCart = JSON.parse(getProductsInCart)

    let product = {
        id: parseInt(id),
        title,
        price: parseInt(price),
        desc,
        url,
        qty: parseInt(qty),
    }

    if (getProductsInCart != null) {
        if (getProductsInCart[product.id] == undefined) {
            product.qty += 1;
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
        localStorage.setItem('cartQ', 1)

    }
    localStorage.setItem('setProductsInCart', JSON.stringify(getProductsInCart))

    document.querySelector('.cart-menu span').textContent = getCartQ + 1


    if (getProductsInCart != null) {
        console.log("hey")
        displayProductOnCartPage(getProductsInCart)
    }
}



// When click on - sign it will decrease the Qty Of Product From Cart 
function decreaseQtyOfProductFromCart(id, title, price, desc, url, qty) {

    console.log("decreaseQtyOfProductFromCart(")
    let getCartQ = localStorage.getItem('cartQ')
    getCartQ = parseInt(getCartQ)
    localStorage.setItem('cartQ', getCartQ - 1)

    let getProductsInCart = localStorage.getItem('setProductsInCart')
    getProductsInCart = JSON.parse(getProductsInCart)

    // let product = {
    //     id: parseInt(id),
    //     title,
    //     price: parseInt(price),
    //     desc,
    //     url,
    //     qty: parseInt(qty),
    // }
 
    // getProductsInCart.map((element, index) => {
    //     if (element.id == product.id) {
    //         console.log("index of product in localsto", index)
    //         console.log("id matches i.e ", element.id)
    //         element.qty -= 1
    //         element.price -= allProducts[product.id].price
    //     }
    // })

    localStorage.setItem('setProductsInCart', JSON.stringify(getProductsInCart))

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
                      onclick="decreaseQtyOfProductFromCart('${element.id}','${element.title}','${element.price}','${element.desc}','${element.url}','${element.qty}')"
                    >
                      -
                    </button>
                   <span>${element.qty}</span>
                    <button
                      class="qtybutton"
                      onclick="setItemsInCart('${element.id}','${element.title}','${element.price}','${element.desc}','${element.url}','${element.qty}')"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td data-th="Subtotal" class="text-center" >
                ${element.price}
                </td>
                <td class="actions" data-th >
                  <button class="btn btn-danger btn-sm" onclick="removeProductFromCart('${index}')">
                   Trash
                  </button>
                </td>
                </tr>
                                
                `;
        });
        console.log("in cart ")


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
displayProductOnCartPage()
onLoadCartQuantity()

console.log("hello world")