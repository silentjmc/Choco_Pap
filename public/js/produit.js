$(document).ready(function() {  
    const idProduct = window.location.search.substring(1); 
    $.getJSON("src/products.json", function(data) {
        // Parcourir les objets dans le fichier JSON
        for (var i = 0; i < data.length; i++) {
            // Vérifier si l'ID de l'objet correspond à l'ID passé dans l'URL
            if (data[i].id === idProduct) {
                // L'objet correspondant a été trouvé, vous pouvez maintenant l'utiliser comme nécessaire
                console.log("Objet correspondant trouvé :", data[i]);
                
                var productDiv = document.createElement("div");
                productDiv.className = "grid justify-items-center mb-5";
                var productImg = document.createElement("img");
                productImg.src = data[i].image;
                productImg.alt = data[i].title;
                productImg.className = "max-h-20";
                var productName = document.createElement("p");
                var productLink = document.createElement("a");
                productLink.href = "produit.html?" + data[i].id
                productLink.innerText = data[i].title;
                productName.appendChild(productLink);
                var productPrice = document.createElement("p");
                productPrice.innerText = data[i].price;
                var productNote = document.createElement("p");
                productNote.innerText = "Note : " + data[i].note;
                var productAddCart= document.createElement("button");
                productAddCart.type="button";
                productAddCart.className="rounded items-center bg-lightbrown px-5 py-3 text-base font-Fjalla text-white hover:bg-brown hover:rounded";
                productAddCart.innerText="Ajouter au panier";

                productDiv.appendChild(productImg);
                productDiv.appendChild(productName);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(productNote);
                productDiv.appendChild(productAddCart);

                $('#shopContent').append(productDiv);

                break;
            }
        }
    })
})