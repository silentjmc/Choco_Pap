class ProductGrid {
    constructor() {
        this.jsonUrl = "src/products.json";
        this.containerId = "shopContent";
        this.noteMini = 1;
        this.noteMax = 5;
        this.prixMini = 2.99;
        this.prixMax = 19.99;
        this.checkedCategories = new Set();
    }
    // recupération du JSON
    async getProducts() {
        const that = this
        $.ajax({
            url: this.jsonUrl,
            dataType: "json",
        })
            .done(function (products) {
                that.renderProducts(products);
                that.createPriceOptions(products);
                that.manageFilter(products);
                //countItemsQuantity();
            })
            .fail(function (jqXHR, textStatus, error) {
                console.log("Post error: " + error);
            });
    }
    // methode pour écouter les filtres et mettre a jour la grillle de produit
    manageFilter(products) {
        const notAllCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#Tous)');
        const allCheckbox = document.getElementById('Tous');

        notAllCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", () => {
                if (allCheckbox.checked == true) {
                    allCheckbox.checked = false;
                }
                if (this.checkedCategories.has(checkbox.id)) {
                    this.checkedCategories.delete(checkbox.id);
                } else {
                    this.checkedCategories.add(checkbox.id);
                    this.renderProducts(products);
                }
                if (this.checkedCategories.size === 0) {
                    allCheckbox.checked = true;
                    this.renderProducts(products);
                } else {
                    this.renderProducts(products);
                }
            });
        });


        allCheckbox.addEventListener("change", () => {
            if (allCheckbox.checked === false) {
                allCheckbox.checked = true;
                this.renderProducts(products);
            } else {
                notAllCheckboxes.forEach((checkbox) => {
                checkbox.checked = false;
                this.checkedCategories.clear();
                this.renderProducts(products);
                });
            }
        })

        prixMini.addEventListener("change", () => {
            if (parseFloat(prixMini.value) > this.prixMax) {
                console.log("prixmini prend this valeur" + this.prixMini)
                prixMini.value = this.prixMini;
            } else {
                this.prixMini = prixMini.value;
                this.renderProducts(products);
            }
        })

        prixMax.addEventListener("change", () => {
            if (parseFloat(prixMax.value) < this.prixMini) {
                prixMax.value = this.prixMax;
            } else {
                this.prixMax = prixMax.value;
                this.renderProducts(products);
            }
        })

        noteMini.addEventListener("change", () => {
            if (noteMini.value > this.noteMax) {
                noteMini.value = this.noteMini;
            } else {
                this.noteMini = noteMini.value;
                this.renderProducts(products);
            }
        })

        noteMax.addEventListener("change", () => {
            if (noteMax.value < this.noteMini) {
                noteMax.value = this.noteMax;
            } else {
                this.noteMax = noteMax.value;
                this.renderProducts(products);
            }
        })
    }
    // methode pour récupérer les prix et les afficher dans options des filtres
    createPriceOptions(products) {
        let arrayPrices = [...new Set(products.map((product) => product.price))];
        arrayPrices.sort((a, b) => a - b);
        let filterLowPrice = document.getElementById("prixMini");
        let filterMaxPrice = document.getElementById("prixMax");
        arrayPrices.forEach((price) => {
            let priceLowOption = document.createElement("option");
            priceLowOption.value = parseFloat(price);
            priceLowOption.innerHTML = price;

            let priceMaxOption = document.createElement("option");
            priceMaxOption.value = parseFloat(price);
            priceMaxOption.innerHTML = price;
            filterLowPrice.appendChild(priceLowOption);
            filterMaxPrice.appendChild(priceMaxOption);
        });
        filterMaxPrice.value = arrayPrices[arrayPrices.length - 1];
    }

    // methode filtrer les produits en fonction des prix / notes et catégories (ne fonctionne aps pour catégorie)

    filterProducts(products) {
        return products.filter((product) =>
            product.price >= this.prixMini &&
            product.price <= this.prixMax &&
            product.note >= this.noteMini &&
            product.note <= this.noteMax &&
            (this.checkedCategories.size === 0 ||
                Object.keys(product.category).some(category => this.checkedCategories.has(category) && product.category[category] == true))
        );
    }

    //methode pour afficher la grille de produit
    renderProducts(products) {
        const filteredProducts = this.filterProducts(products);
        const containerId = this.containerId;
        $('#' + containerId).empty();
        let gridContainer = document.getElementById(this.containerId);

        //let filterProducts = products.filter((products) => products.price >= prixMini && products.price <= prixMax && products.note >= noteMini && products.note <= noteMax );

        filteredProducts.forEach((product) => {
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
            productAddCart.onclick = function () {
                addItem(product.id, product.image, product.title, product.price,);
            };
            productAddCart.className = "rounded-lg items-center bg-lightbrown px-5 py-3 text-base font-Fjalla text-white hover:bg-brown hover:rounded-lg";
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
