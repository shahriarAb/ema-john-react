//add product to fake database/local storage
const addToLocalStorage = id => {
    const exist = getLocalStorage();
    let shopping_cart = {};
    if (!exist) {
        shopping_cart[id] = 1;
    }
    else {
        shopping_cart = JSON.parse(exist);
        if (shopping_cart[id]) {
            shopping_cart[id] = shopping_cart[id] + 1;
        }
        else {
            shopping_cart[id] = 1;
        }
    }
    setLocalStorage(shopping_cart);
}

const setLocalStorage = (cart) => localStorage.setItem('shopping_cart', JSON.stringify(cart));
const getLocalStorage = () => localStorage.getItem('shopping_cart');

const getData = () => {
    const exists = getLocalStorage();
    return exists ? JSON.parse(exists) : {};
}

const removeFromLocalStorage = id => {
    const exist = getLocalStorage();
    if (!exist) {
        return;
    }
    else {
        const shopping_cart = JSON.parse(exist);
        delete shopping_cart[id];
        setLocalStorage(shopping_cart);
    }
}

const clearTheCart = () => {
    localStorage.removeItem('shopping_cart');
}

export { addToLocalStorage, getData, removeFromLocalStorage, clearTheCart };