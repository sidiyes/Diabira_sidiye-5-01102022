let cartProducts = JSON.parse(localStorage.getItem("cart"));

console.log(cartProducts);

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
      for (let cartProduct of cartProducts) {
        let findProduct = products.find(
          (element) =>
            element._id === cartProduct.id ||
            element.colors === cartProduct.color
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
          productPrice.className = "cart__item__price";
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

          //SUPPRIMER LES ARTICLES
          btnSupp(
            eltDeleteItem,
            cartProducts,
            cartProduct,
            cartArticle,
            products
          );

          //MODIFIER LA QUANTITE
          productQty.addEventListener("change", (event) => {
            let newValue = event.target.value;

            cartProduct.quantity = newValue;
            localStorage.setItem("cart", JSON.stringify(cartProducts));
            // totalPriceAndItem();
            totalPriceAndItemTest2(products);
          });
        }
      }
      // totalPriceAndItem();
      totalPriceAndItemTest2(products);
    });
}

//////////////////////////////////////////////////////////////////////////
const btnSupp = (
  eltDeleteItem,
  cartProducts,
  cartProduct,
  cartArticle,
  products
) => {
  eltDeleteItem.addEventListener("click", (e) => {
    let newCartProducts = cartProducts.filter(
      (element) =>
        element.id !== cartProduct.id || element.color !== cartProduct.color
    );

    console.log(newCartProducts);

    //Supprimer le HTML
    e.target.closest("article").remove();
    // cartArticle.remove();

    if (newCartProducts.length === 0) {
      let ifNull = document.getElementById("cart__items");
      let ifNullP = document.createElement("p");
      ifNullP.textContent = "Votre panier est vide !";
      ifNull.appendChild(ifNullP);
    }

    localStorage.setItem("cart", JSON.stringify(newCartProducts));
    // totalPriceAndItem();
    totalPriceAndItemTest2(products);
  });
};

const totalPriceAndItem = () => {
  let itemQuantity = document.getElementsByClassName("itemQuantity");
  totalQuantity = 0;

  let itemQPrice = document.getElementsByClassName("cart__item__price");
  let totalPrice = 0;

  for (let i = 0; i < itemQuantity.length; ++i) {
    totalQuantity += itemQuantity[i].valueAsNumber;
    let price = Number(itemQPrice[i].textContent.replace(" €", ""));
    totalPrice += price * itemQuantity[i].valueAsNumber;
  }
  // for (const quantity of itemQuantity) {
  //   totalQuantity += quantity.valueAsNumber;
  // }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQuantity;

  // TOTAL
  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;

  // let array = findProduct.price * cartProduct.quantity;
  // totalPrice = array.reduce((acc, v) => acc + v);
  // console.log(totalPrice, itemQPrice);
};

const totalPriceAndItemTest2 = (products) => {
  let totalQuantity = 0;
  let totalPrice = 0;
  let cartProducts = JSON.parse(localStorage.getItem("cart"));
  for (let cartProduct of cartProducts) {
    let findProduct = products.find(
      (element) =>
        element._id === cartProduct.id || element.colors === cartProduct.color
    );

    if (findProduct) {
      totalQuantity += Number(cartProduct.quantity);
      totalPrice += Number(findProduct.price) * Number(cartProduct.quantity);
    }
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQuantity;

  // TOTAL
  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
};
