$(document).ready(function() {    
    $.getJSON("src/products.json", function(result){
        $.each(result, function(i, produit){
            var productDiv = $('<div class="grid justify-items-center mb-5">');
            productDiv.append('<img src= ' + this.image + ' alt="' + this.title + '" class="max-h-20">');
            productDiv.append('<p><a href="produit.html?' + this.id + '">' + this.title + '</a></p>');
            productDiv.append('<p>' + this.price + '</p>');
            productDiv.append('<p>Note : ' + this.note + '</p>');
            productDiv.append(' <button type="button" class="rounded items-center bg-lightbrown px-5 py-3 text-base font-Fjalla text-white hover:bg-brown hover:rounded"">Ajouter au panier</button>');
            productDiv.append('</div>');
            $('#shopContent').append(productDiv);
        });
    });
})