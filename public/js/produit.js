$(document).ready(function() {  
    const idProduct = window.location.search.substring(1); 
    $.getJSON("src/products.json", function(data) {
        // Parcourir les objets dans le fichier JSON
        for (var i = 0; i < data.length; i++) {
            // Vérifier si l'ID de l'objet correspond à l'ID passé dans l'URL
            if (data[i].id === idProduct) {
        
                console.log("Objet correspondant trouvé :", data[i]);
                
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
                productQte.placeholder = "1";
                productQte.step = "1";
                productQte.min = "1";
                productQte.max = "100";
                productQte.className = "border w-16 pl-2";
                productQteAddCart.appendChild(productQte);
                var productAddCart= document.createElement("button");
                productAddCart.type="button";
                productAddCart.className="rounded items-center bg-lightbrown px-6 py-3 text-base font-Fjalla text-white w-44 hover:bg-brown hover:rounded";
                productAddCart.innerText="Ajouter au panier";
                productQteAddCart.appendChild(productAddCart);
                
                
                var productImg = document.createElement("img");
                productImg.src = data[i].image;
                productImg.alt = data[i].title;
                productImg.className = "my-3 w-72 md:order-1 md:place-self-center";

                var productIngredient = document.createElement("div");
                productIngredient.className = "mb-12 md:order-3 md:col-span-3 md:mb-72";
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


