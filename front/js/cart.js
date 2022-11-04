//Récupere le panier
let cartProducts = JSON.parse(localStorage.getItem("cart"));
//

//Recupère les prix des produits (backend fetch) (Panier + prix)

//If panier vide
if (cartProducts === null) {
  let ifNull = document.getElementById("cart__items");
  let ifNullP = document.createElement("p");
  ifNullP.textContent = "Votre panier est vide !";
  ifNull.appendChild(ifNullP);
} else {
  let url = `http://localhost:3000/api/products`;

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((products) => {
      buildePanier(products);
      totalPriceAndItem();
    });
}

const buildePanier = (products) => {
  for (let cartProduct of cartProducts) {
    let findProduct = products.find(
      (element) =>
        element._id === cartProduct.id || element.colors === cartProduct.color
    );

    if (findProduct) {
      let cartArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(cartArticle);
      cartArticle.className = "cart__item";
      cartArticle.setAttribute("data-id", findProduct._id);
      cartArticle.setAttribute("data-color", cartProduct.color);
      // Image Content
      let cartImg = document.createElement("div");
      cartArticle.appendChild(cartImg);
      cartImg.className = "cart__item__img";
      // Image
      let cartImgItem = document.createElement("img");
      cartImg.appendChild(cartImgItem);
      cartImgItem.src = findProduct.imageUrl;
      cartImgItem.alt = findProduct.imageUrl;
      //
      let cartItemContent = document.createElement("div");
      cartArticle.appendChild(cartItemContent);
      cartItemContent.className = "cart__item__content";
      // Name Content
      let cartItemContentDescription = document.createElement("div");
      cartItemContent.appendChild(cartItemContentDescription);
      cartItemContentDescription.className =
        "cart__item__content____description";
      // Name
      let cartProductName = document.createElement("h2");
      cartItemContentDescription.appendChild(cartProductName);
      cartItemContentDescription.innerHTML = findProduct.name;
      // Color
      let productColor = document.createElement("p");
      productColor.innerHTML = cartProduct.color;
      cartItemContentDescription.appendChild(productColor);
      // Price
      let productPrice = document.createElement("p");
      cartItemContentDescription.appendChild(productPrice);
      productPrice.innerHTML = findProduct.price + " €";
      // Quantity Settings
      let cartItemContentSettings = document.createElement("div");
      cartItemContent.appendChild(cartItemContentSettings);
      cartItemContentSettings.className = "cart__item__content__settings";

      let cartItemContentSettingsQuantity = document.createElement("div");
      cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
      cartItemContentSettingsQuantity.className =
        "cart__item__content__settings__quantity";
      // Quantity
      let Qte = document.createElement("p");
      cartItemContentSettingsQuantity.appendChild(Qte);
      Qte.innerHTML = "Qté : ";

      let productQty = document.createElement("input");
      cartItemContentSettingsQuantity.appendChild(productQty);
      // for (let product of cartProducts) {
      productQty.value = cartProduct.quantity;
      // }
      productQty.className = "itemQuantity";
      productQty.setAttribute("type", "number");
      productQty.setAttribute("min", "1");
      productQty.setAttribute("max", "100");
      productQty.setAttribute("name", "itemQuantity");

      // Delete-Container
      let cartItemContentSettingsDelete = document.createElement("div");
      cartItemContentSettingsDelete.className =
        "cart__item__content__settings__delete";
      cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

      // Delete
      let eltDeleteItem = document.createElement("p");
      eltDeleteItem.className = "deleteItem";
      eltDeleteItem.innerHTML = "Supprimer";
      cartItemContentSettingsDelete.appendChild(eltDeleteItem);

      deleteItem(eltDeleteItem, cartProduct, cartProducts);

      ///////////////// CHANGER
      modifyItem(productQty);

      // for (let i = 0; i < itemQuantity.length; i++) {
      //   itemQuantity[i].addEventListener("change", (event) => {
      //     event.preventDefault();

      //     let quantityModif = cartProducts[i].quantity;
      //     let qttModifValue = itemQuantity[i].valueAsNumber;

      //     let change = cartProducts.find(
      //       (element) => element.qttModifValue !== quantityModif
      //     );

      //     change.quantity = qttModifValue;
      //     cartProducts[i].quantity = change.quantity;

      //     localStorage.setItem("cart", JSON.stringify(cartProducts));
      //     window.location.reload();
      //   });
      // }
      //
    }
  }
};

const deleteItem = (eltClick, cartProduct, cartProducts) => {
  eltClick.addEventListener("click", (e) => {
    e.preventDefault();

    //Vérifier si Id et Color
    let cartProductsF = cartProducts.filter(
      (element) => element != cartProduct
    );
    console.log(cartProductsF);
    // localStorage.setItem("cart", JSON.stringify(cartProductsF));

    //Supprimer element HTML e.target -> article (closet)

    //Relancer le carlcule de prix
    totalPriceAndItem();

    // window.location.reload()
  });
};

const modifyItem = (input) => {
  input.addEventListener("change", (event) => {
    console.log(event.target.value);
    totalPriceAndItem();
  });
};

const totalPriceAndItem = () => {
  // total des quantités
  let itemQuantity = document.getElementsByClassName("itemQuantity");
  totalQuantity = 0;
  for (let i = 0; i < itemQuantity.length; ++i) {
    totalQuantity += itemQuantity[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQuantity;

  // // prix total
  // let productTotalPrice = document.getElementById("totalPrice");
  // totalPrice = 0;
  // totalPrice += totalQuantity * findProduct.price;
  // productTotalPrice.innerHTML = totalPrice;
};
