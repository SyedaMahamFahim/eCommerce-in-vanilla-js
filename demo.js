// Checking if there is no product in cart then show incart value =0

function isProductInCart() {
    // getting product in cart array
    let getProductsInCart = localStorage.getItem('setProductsInCart')

    // getting incart value which is display on navbar icon (cart icon)
    if (getProductsInCart == null) {
        localStorage.setItem('cartQ', 0)
    }
}
