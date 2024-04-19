
class ProductGrid {
    constructor(jsonUrl, containerId) {
        this.jsonUrl = jsonUrl;
        this.containerId = containerId;
        this.noteMini = 1;
        this.noteMax = 5;
        this.prixMini = 0;
        this.prixMax = 10000;

    }
/*
    async getProducts() {
        try {
            const response = await fetch(this.jsonUrl);
            if (!response.ok) {
                throw new Error(`Erreur lors de la récupération des données depuis ${this.jsonUrl}`);
            }
            let products = await response.json();
            this.renderProducts(products, '1', '5');
            this.createPriceOptions(products);
            this.filter(products);
        } catch (error) {
            console.error(error);
        }
    }
*/
    async getProducts() {
         const that = this
        $.ajax({
            url: this.jsonUrl,
            dataType: "json",
        })
        .done(function(products) {
            that.renderProducts(products, that.prixMini, that.prixMax, that.noteMini, that.noteMax);
            that.filter(products);
            that.createPriceOptions(products);
        })
        .fail(function (jqXHR, textStatus, error) {
            console.log("Post error: " + error);
        });
    }

    filter(products) {
        const notAllCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#Tous)');
        const allCheckbox = document.getElementById('Tous');
        // const btnFilter = document.getElementById('btnFilter');

        notAllCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", () => {
                if (allCheckbox.checked == true) {
                    allCheckbox.checked = false;
                }
            });
        });
        
       allCheckbox.addEventListener("change", () => {
            notAllCheckboxes.forEach((checkbox) => {
                checkbox.checked = false;
               }); 
        });

        prixMini.addEventListener("change", () => {
            if (parseFloat(prixMini.value)>this.prixMax){
                console.log("erreur prixMax: " + prixMax.value + ", prixMini: " + this.prixMini);
                prixMini.value = this.prixMini;
            } else {
                console.log("prixMax: " + prixMax.value + ", prixMini: " + this.prixMini);
            this.prixMini = prixMini.value;
            console.log("prixMax: " + prixMax.value + ", prixMini: " + this.prixMini);
            this.renderProducts(products, this.prixMini, this.prixMax, this.noteMini, this.noteMax);
            }
        })

        prixMax.addEventListener("change", () => {
            if (parseFloat(prixMax.value)<this.prixMini){
                console.log("prixMax: " + prixMax.value + ", prixMini: " + this.prixMini);
                prixMax.value = this.prixMax;
            } else {
            console.log("prixMax: " + prixMax.value + ", prixMini: " + this.prixMini);
            this.prixMax = prixMax.value;
            this.renderProducts(products, this.prixMini, this.prixMax,this.noteMini, this.noteMax);
            }
        })

        noteMini.addEventListener("change", () => {
            if (noteMini.value>this.noteMax){
                noteMini.value = this.noteMini;
            } else {
            this.noteMini = noteMini.value;
            this.renderProducts(products, this.prixMini, this.prixMax,this.noteMini, this.noteMax);
            }
        })

        noteMax.addEventListener("change", () => {
            if (noteMax.value<this.noteMini){
                noteMax.value = this.noteMax;
            } else {
            this.noteMax = noteMax.value;
            this.renderProducts(products, this.prixMini, this.prixMax,this.noteMini, this.noteMax);
            }
        })


        /*
        btnFilter.addEventListener("click", () => {
            let noteMini = document.getElementById('noteMini').value;
            console.log(noteMini);
            let noteMax = document.getElementById('noteMax').value;
            console.log(noteMax);
            this.renderProducts(products,noteMini, noteMax);
        });*/
    }

    createPriceOptions(products) {
        let arrayPrices = [...new Set(products.map((product) => product.price))];
        arrayPrices.sort((a, b) => a - b);
        let filterLowPrice = document.getElementById("prixMini");
        let filterMaxPrice = document.getElementById("prixMax");
        arrayPrices.forEach((price) => {
            let priceLowOption = document.createElement("option");
            priceLowOption.value = parseFloat(price);
            priceLowOption.innerHTML=price;

            let priceMaxOption = document.createElement("option");
            priceMaxOption.value = parseFloat(price);
            priceMaxOption.innerHTML=price;
            filterLowPrice.appendChild(priceLowOption);
            filterMaxPrice.appendChild(priceMaxOption);
        });
        filterMaxPrice.value = arrayPrices[arrayPrices.length - 1];
    }

    clearGridContainer() {
        // let gridContainer = document.getElementById(this.containerId);
        const containerId = this.containerId;
        $('#'+containerId).empty();
    }

    renderProducts(products, prixMini, prixMax, noteMini, noteMax) {
        const containerId = this.containerId;
        $('#'+containerId).empty();
        let gridContainer = document.getElementById(this.containerId);

        let filterProducts = products.filter((products) => products.price >= prixMini && products.price <= prixMax && products.note >= noteMini && products.note <= noteMax);

        filterProducts.forEach((product) => {    
            const productDiv = document.createElement("div");
            productDiv.className = "grid justify-items-center mb-5";

            const productImg = document.createElement("img");
            productImg.src = product.image;
            productImg.alt = product.title;
            productImg.className = "max-h-20";

            const productName = document.createElement("p");
            const productLink = document.createElement("a");
            productLink.href = `produit.html?id=${product.id}`;
            productLink.innerText = product.title;
            productLink.className = "hover:underline hover:font-bold hover:text-lightbrown";
            productName.appendChild(productLink);

            const productPrice = document.createElement("p");
            productPrice.innerText = `${product.price} €`;

            const productNote = document.createElement("p");
            productNote.innerText = `Note : ${product.note}`;

            const productAddCart = document.createElement("button");
            productAddCart.type = "button";
            productAddCart.className = "rounded items-center bg-lightbrown px-5 py-3 text-base font-Fjalla text-white hover:bg-brown hover:rounded";
            productAddCart.innerText = "Ajouter au panier";

            productDiv.appendChild(productImg);
            productDiv.appendChild(productName);
            productDiv.appendChild(productPrice);
            productDiv.appendChild(productNote);
            productDiv.appendChild(productAddCart);

            gridContainer.appendChild(productDiv);
        });
        };
}
