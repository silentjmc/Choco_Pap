import { ProductGrid } from './boutique_copy.js';
class Basket {
    constructor() {
        let basket = localStorage.getItem("basket");
        if (basket == null){
            this.basket = [];
        } else {
            this.basket = JSON.parse(localStorage.getItem("basket"));
        }
    }

    saveBasket() {
        localStorage.setItem(this.basket, JSON.stringify(this.basket));
        this.countItemsQuantity();
        this.renderBasket();
    }

    emptyBasket() {
        if (confirm("Voulez-vous vider votre panier ?")) {
            localStorage.clear();
            this.countItemsQuantity();
            this.renderBasket();
        }
    }

    addItem(id, imageUrl, nameProduct, price, quantity=1) {
        let foundItem = this.basket.find(item => item.id == id);
        let product={id, imageUrl, nameProduct, price, quantity};
        if (foundItem == undefined) {
            this.basket.push(product);
        } else {
            foundItem.quantity+= quantity;
        }
    }

    removeItem(id){
        let foundItem = this.basket.findIndex(item => item.id === id);
        this.basket.splice(foundItem, 1);
    }

    changeQuantity(id, quantity) {
        let foundItem = this.basket.find(item => item.id == id);
        foundItem.quantity = parseInt(quantity);
    }
        
    countItemsQuantity() {
        let itemsQuantity = 0;
        for (let item of this.basket) {
            parseInt(itemsQuantity += item.quantity);
            }
        let nbItems= document.getElementById('nbItems');
        if (itemsQuantity==0){
            nbItems.classList.add("hidden");
        } else {
            nbItems.classList.remove("hidden");
            nbItems.innerText = itemsQuantity;
        } 
    }

    totalPricebasket() {
        let totalPrice = 0;
        let divTotalPrice = document.getElementById("totalBasket");
        if(this.basket.length === 0) {
            divTotalPrice.innerText = 'Panier vide';
        } else {
            this.basket.forEach(item => {
                totalPrice += parseFloat((item.quantity * item.price));
            });
            divTotalPrice.innerText = 'TOTAL : ' + totalPrice.toFixed(2) + ' €';
        }    
    }

    renderBasket(){
        let divBasket = document.getElementById("gridBasket");
        $('#gridBasket').empty();
    
        this.basket.forEach((item) => {
            let removeItemBtn = document.createElement("button");
    
            removeItemBtn.type = "button";
            removeItemBtn.setAttribute("ariaControls","delete");
            removeItemBtn.className = "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-8 dark:hover:bg-gray-600 dark:hover:text-white col-span-1 justify-self-center";
            let imgBtn = document.createElement("img");
            imgBtn.src ="images/cross.svg";
            imgBtn.alt ="supprimer";
            imgBtn.title ="supprimer l'article";
            removeItemBtn.onclick = function () {
                this.removeItem(item.id);
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
                this.changeQuantity(item.id, itemQty.value);
            };
    
            divBasket.appendChild(removeItemBtn);
            divBasket.appendChild(imgItem);
            divBasket.appendChild(itemDiv);
            divBasket.appendChild(itemQty);
             }
        )
        this.totalPricebasket();
    }
    
    renderBasket(){
        let divBasket = document.getElementById("gridBasket");
        $('#gridBasket').empty();

        this.basket.forEach((item) => {
            let removeItemBtn = document.createElement("button");

            removeItemBtn.type = "button";
            removeItemBtn.setAttribute("ariaControls","delete");
            removeItemBtn.className = "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-8 dark:hover:bg-gray-600 dark:hover:text-white col-span-1 justify-self-center";
            let imgBtn = document.createElement("img");
            imgBtn.src ="images/cross.svg";
            imgBtn.alt ="supprimer";
            imgBtn.title ="supprimer l'article";
            removeItemBtn.onclick = function () {
                this.removeItem(item.id);
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
                this.changeQuantity(item.id, itemQty.value);
            };

            divBasket.appendChild(removeItemBtn);
            divBasket.appendChild(imgItem);
            divBasket.appendChild(itemDiv);
            divBasket.appendChild(itemQty);
            }
        )
        this.totalPricebasket();
    }
}
export { Basket };