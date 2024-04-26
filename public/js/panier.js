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
    countItemsQuantity();
}

function removeItem(id){
    let basket = getBasket();
    let foundItem = basket.findIndex(item => item.id === id);
    basket.splice(foundItem, 1);
    saveBasket(basket);
    countItemsQuantity();
    renderBasket();

}

function changeQuantity(id, quantity) {
    let basket = getBasket();
    let foundItem = basket.find(item => item.id == id);
    console.log(foundItem);
    foundItem.quantity = Number(quantity);
    console.log(foundItem);
    saveBasket(basket);
    renderBasket();
    countItemsQuantity()
}

function countItemsQuantity() {
    let basket = getBasket();
    let itemsQuantity = 0;
    for (let item of basket) {
        Number(itemsQuantity += item.quantity);
        }
    let nbItems= document.getElementById('nbItems');
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

function renderBasket(){
    let basket = getBasket();
    let divBasket = document.getElementById("gridBasket");
    $('#gridBasket').empty();

    
    basket.forEach((item) => {
        let removeItemBtn = document.createElement("button");

        removeItemBtn.type = "button";
        removeItemBtn.setAttribute("ariaControls","delete");
        removeItemBtn.className = "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-8 dark:hover:bg-gray-600 dark:hover:text-white col-span-1 justify-self-center";
        let imgBtn = document.createElement("img");
        imgBtn.src ="images/cross.svg";
        imgBtn.alt ="supprimer";
        imgBtn.title ="supprimer l'article";
        removeItemBtn.onclick = function () {
            removeItem(item.id);
        };
        removeItemBtn.appendChild(imgBtn);

        let imgItem = document.createElement("img");
        imgItem.src=item.imageUrl;
        imgItem.alt=item.nameProduct;
        imgItem.className="place-self-center col-span-1";

        let itemDiv = document.createElement("div");
        itemDiv.className="text-xs font-medium text-gray-900 col-span-2";

        let itemName = document.createElement("p");
        itemName.innerText=item.nameProduct;
        let itemPrice = document.createElement("p");
        itemPrice.innerText=item.price + ' €';

        itemDiv.appendChild(itemName);
        itemDiv.appendChild(itemPrice);

        let itemQty = document.createElement("input");
        itemQty.value=item.quantity;
        itemQty.type="number";
        itemQty.min="1";
        itemQty.className="grid place-self-center w-full h-8 rounded-lg col-span-1 pr-0 text-center";
        itemQty.onchange = function () {
            changeQuantity(item.id, itemQty.value);
        };

        divBasket.appendChild(removeItemBtn);
        divBasket.appendChild(imgItem);
        divBasket.appendChild(itemDiv);
        divBasket.appendChild(itemQty);
         }
    )
}
