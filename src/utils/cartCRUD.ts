import {CartItem} from "../interfaces.tsx";

const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

const filterCart = (cart: CartItem[]) => {
    const newCart: Array<CartItem> = cart.filter((item: CartItem) => item != undefined || item != null);
    return newCart
}

function getCart() {
    const existingCart = getCartFromLocalStorage();
    if (existingCart) {
        return existingCart;
    } else {
        return initializeCartInLocalStorage();
    }
}


const saveCartToLocalStorage = (cart: Array<CartItem>) => {

    localStorage.setItem('cart', JSON.stringify(cart));
};

const initializeCartInLocalStorage = () => {
    const cart: Array<CartItem> = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
};

const getItemsInTheCartNumber = (cart: CartItem[]) => {
    let total = 0;
    if (cart.length == 0) {
        return 0;
    }
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        total += item.quantity
    }
    return total
}

export {
    getCart,
    filterCart,
    getCartFromLocalStorage,
    saveCartToLocalStorage,
    initializeCartInLocalStorage,
    getItemsInTheCartNumber
}