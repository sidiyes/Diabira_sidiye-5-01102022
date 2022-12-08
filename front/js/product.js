 let params = new URL(document.location).searchParams;
let idUrl = params.get("id");
const produitUrl = `http://localhost:3000/api/products/` + idUrl; 

fetch(produitUrl)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    let cardImg = document.createElement("img");
    cardImg.src = product.imageUrl;
    cardImg.alt = product.imageUrl;
    document.querySelector(".item__img").appendChild(cardImg);

    document.getElementById("title").textContent = product.name;
    document.getElementById("price").textContent = product.price;
    document.getElementById("description").textContent = product.description;

    for (let colors of product.colors) {
      let colorsOptions = document.createElement("option");
      colorsOptions.innerHTML = colors;
      document.getElementById("colors").appendChild(colorsOptions);
    }

    document.getElementById("addToCart").addEventListener("click", (e) => {
      e.preventDefault();

      myProduct = {
        id: product._id,
        quantity: parseInt(document.getElementById("quantity").value),
        color: document.getElementById("colors").value,
      };

      if (myProduct.color == "") {
        alert("choisissez une couleur");
      } else {
        if (quantity.value == 0) {
          alert("choisissez le nombre d'article(s)");
        } else {
          let cartProducts = JSON.parse(localStorage.getItem("cart"));
          if (cartProducts === null) {
            cartProducts = [];
            cartProducts.push(myProduct);
            alert("Produit ajouté au panier")
          } else if (cartProducts != null) {
            //Vérifier si le produit id et la couleur existe
            let ifProduct = cartProducts.find(
              (item) =>
                item.color === myProduct.color && item.id === myProduct.id
            );
            if (ifProduct) {
              //Modifier la quantité du produit
              ifProduct.quantity += myProduct.quantity;
            } else {
              cartProducts.push(myProduct);
              alert("Produit ajouté au panier")
            }
            //

            //
          }
          //
          localStorage.setItem("cart", JSON.stringify(cartProducts));
        }
      }
    });
  });
