$(document).ready(function() {  
    $.getJSON("src/products.json", function(result){
        $.each(result, function(i, produit){
            var productDiv = document.createElement("div");
            productDiv.className = "grid justify-items-center mb-5";
            var productImg = document.createElement("img");
            productImg.src = this.image;
            productImg.alt = this.title;
            productImg.className = "max-h-20";
            var productName = document.createElement("p");
            var productLink = document.createElement("a");
            productLink.href = "produit.html?" + this.id
            productLink.innerText = this.title;
            productLink.className = "hover:underline hover:font-bold hover:text-lightbrown"
            productName.appendChild(productLink);
            var productPrice = document.createElement("p");
            productPrice.innerText = this.price + " €";
            var productNote = document.createElement("p");
            productNote.innerText = "Note : " + this.note;
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
        });
    });
})
