function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket(){
    let basket = localStorage.getItem("basket");
    if (basket == null){
        return [];
    } else {
        return JSON.parse(localStorage.getItem("basket"));
    }
}

function emptyBasket() {
    localStorage.clear();
}

function addItem(id, imageUrl, nameProduct, price, quantity=1) {
    let basket = getBasket();
    let foundItem = basket.find(item => item.id == id);
    product= {id, imageUrl, nameProduct, price, quantity};
    if (foundItem == undefined) {
        basket.push(product);
    } else {
        foundItem.quantity += quantity;
    }
    saveBasket(basket);
    countItemsQuantity()
}

function removeItem(id){
    let basket = getBasket();
    let foundItem = basket.findIndex(item => item.id === id);
    basket.splice(foundItem, 1);
    saveBasket(basket);
}

function changeQuantity(id, quantity) {
    let basket = getBasket();
    let foundItem = basket.find(item => item.id == id);
    foundItem.quantity = quantity;
}

function countItemsQuantity() {
    let basket = getBasket();
    console.log(basket);
    let itemsQuantity = 0;
    for (let item of basket) {
        itemsQuantity += item.quantity;
        }
    const nbItems= document.getElementById('nbItems');
    console.log(nbItems);
    console.log(itemsQuantity);
    if (itemsQuantity==0){
        nbItems.classList.add("hidden");
    } else {
        nbItems.classList.remove("hidden");
        nbItems.innerText = itemsQuantity;
    } 
}

function totalPricebasket() {
    let basket = getBasket();
    totalPrice = 0;
    basket.forEach(item => {
        totalPrice += item.quantity * item.price;
    });
    return totalPrice;
    }

