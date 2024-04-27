// $(document).ready(function() { 
document.addEventListener('DOMContentLoaded', function() { 
    const idProduct = window.location.search.substring(4); 
    $.getJSON("src/products.json", function(data) {
        // Parcourir les objets dans le fichier JSON
        for (var i = 0; i < data.length; i++) {
            // Vérifier si l'ID de l'objet correspond à l'ID passé dans l'URL
            if (data[i].id === idProduct) {

                document.title = data[i].title;
                document.querySelector('meta[name="description"]').setAttribute('content', data[i].description);

                
                var productDiv = document.createElement("div");
                productDiv.className = "md:order-2 md:col-span-2";

                var productName = document.createElement("h1");
                productName.innerText = data[i].title;
                productName.className = "text-2xl font-Fjalla";

                var productPrice = document.createElement("p");
                productPrice.innerText = data[i].price + " €";
                productPrice.className = "text-2xl font-bold";

                var productDivDescription = document.createElement("div");
                productDivDescription.className = "my-3";
                var productDescription = document.createElement("p");
                productDescription.innerText = data[i].description;
                productDivDescription.appendChild(productDescription);

                var productQteAddCart = document.createElement("div");
                productQteAddCart.className = "flex flex-col gap-3";
                var productQte = document.createElement("input");
                productQte.type = "number";
                productQte.id = "quantity";
                productQte.value = "1";
                productQte.min = "1";
                productQte.className = "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-lightbrown block w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-lightbrown"
                productQteAddCart.appendChild(productQte);
                var productAddCart= document.createElement("button");
                productAddCart.type="button";
                productAddCart.className="rounded items-center bg-lightbrown px-6 py-3 text-base font-Fjalla text-white w-44 hover:bg-brown hover:rounded";
                productAddCart.innerText="Ajouter au panier";
                productAddCart.onclick = function() {
                    var quantityInput = document.getElementById("quantity");
                    var quantity = parseInt(quantityInput.value);
                    addItem(data[i].id, data[i].image, data[i].title, data[i].price, quantity);
                };
                productQteAddCart.appendChild(productAddCart);
                
                var productImg = document.createElement("img");
                productImg.src = data[i].image;
                productImg.alt = data[i].title;
                productImg.className = "my-3 w-72 md:order-1 md:place-self-center";

                var productIngredient = document.createElement("div");
                productIngredient.className = "mb-12 md:order-3 md:col-span-3 md:mb-52 md:mt-5";
                var productIngredientTitle = document.createElement("p");
                productIngredientTitle.innerText="Ingrédients";
                var productIngredientContent = document.createElement("p");
                productIngredientContent.innerText=data[i].ingredients;
                productIngredient.appendChild(productIngredientTitle);
                productIngredient.appendChild(productIngredientContent);

                productDiv.appendChild(productName);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(productDivDescription);    
                productDiv.appendChild(productQteAddCart);    
                $('#productContent').append(productDiv);
                $('#productContent').append(productImg);
                $('#productContent').append(productIngredient);
                break;
            }
        }
    })
})


