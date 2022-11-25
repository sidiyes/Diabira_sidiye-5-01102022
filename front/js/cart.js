let cartProducts = JSON.parse(localStorage.getItem("cart"));

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

          ////////////////
          //MODIFIER LA QUANTITE
          productQty.addEventListener("change", (event) => {
            let newValue = event.target.value;
            cartProduct.quantity = newValue;

            localStorage.setItem("cart", JSON.stringify(cartProducts));

            totalPriceAndItem();
          });
          ///////////////////

          btnSupp(
            eltDeleteItem,
            cartProducts,
            cartProduct,
            cartArticle,
            products
          );
        }
      }
      totalPriceAndItem();
    });
}

//////////////////////////////////////////////////////////////////////////
const btnSupp = (eltDeleteItem, cartProducts, cartProduct) => {
  eltDeleteItem.addEventListener("click", (e) => {
    let cartProductsDelete = JSON.parse(localStorage.getItem("cart"));
    let newCartProducts = cartProductsDelete.filter(
      (element) =>
        element.id !== cartProduct.id || element.color !== cartProduct.color
    );

    e.target.closest("article").remove();

    if (newCartProducts.length === 0) {
      let ifNull = document.getElementById("cart__items");
      let ifNullP = document.createElement("p");
      ifNullP.textContent = "Votre panier est vide !";
      ifNull.appendChild(ifNullP);
    }

    localStorage.setItem("cart", JSON.stringify(newCartProducts));
    totalPriceAndItem();
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

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQuantity;

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
};

const order = document.getElementById("order");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

order.addEventListener("click", (e) => {
  console.log(email);
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const nameRegex = /^[a-zA-Zàâäéèêëîïôöùûüÿç_]{1,35}$/;
  const emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

  if (firstName.value === "") {
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    firstNameErrorMsg.textContent = "Ce champ est obligatoire.";
  } else if (nameRegex.test(firstName.value) == false) {
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    firstNameErrorMsg.textContent =
      "Ce nom contient des caractères non autorisés.";
  } else {
  }
  /////
  if (lastName.value === "") {
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    lastNameErrorMsg.textContent = "Ce champ est obligatoire.";
  } else if (nameRegex.test(lastName.value) == false) {
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    lastNameErrorMsg.textContent =
      "Ce nom contient des caractères non autorisés.";
  } else {
  }
  /////
  if (address.value === "") {
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    addressErrorMsg.textContent = "Ce champ est obligatoire.";
  } else if (nameRegex.test(address.value) == false) {
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    addressErrorMsg.textContent =
      "Ce champ contient des caractères non autorisés.";
  } else {
  }
  /////
  if (city.value === "") {
    const cityErrorMsg = document.getElementById("cityErrorMsg");
    cityErrorMsg.textContent = "Ce champ est obligatoire.";
  } else if (nameRegex.test(city.value) == false) {
    const cityErrorMsg = document.getElementById("cityErrorMsg");
    cityErrorMsg.textContent =
      "Ce champ contient des caractères non autorisés.";
  } else {
  }
  /////
  if (email.value === "") {
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    emailErrorMsg.textContent = "Ce champ est obligatoire.";
  } else if (!emailRegex.test(email.value)) {
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    emailErrorMsg.textContent = "Veuillez saisir une adresse email valide.";
  } else {
  }
  ////////////////
  if (
    nameRegex.test(firstName.value) &&
    nameRegex.test(lastName.value) &&
    nameRegex.test(address.value) &&
    nameRegex.test(city.value) &&
    emailRegex.test(email.value)
  ) {
    contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };

    //  const itemsToPost = {
    //     cartProducts,
    //     contact,
    //   };

    let data = {
      contact,
      products: [
        "107fb5b75607497b96722bda5b504926",
        "107fb5b75607497b96722bda5b504926",
      ], //array of product_id
    };

    // const postServer = fetch("https://jsonplaceholder.typicode.com/posts", {
    //   Method: "POST",
    //   Body: JSON.stringify(itemsToPost),
    //   Headers: {
    //     Accept: "application.json",
    //     "Content-Type": "application/json",
    //   },
    // });
    // console.log(postServer); */
    let link = `http://localhost:3000/api/products/order`;
    fetch(link, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        // window.location = "confirmation.html";
      });

    // localStorage.setItem("formulaire", JSON.stringify(contact));
    /////////////////////

    // fetch(link)
    //   .then((data) => {
    //     return data.json();
    //   })
    //   .then((products) => {
    //     // for (let cartProduct of cartProducts) {
    //     //   let findId = products.find(
    //     //     (element) =>
    //     //       element._id === cartProduct.id ||
    //     //       element.colors === cartProduct.color
    //     //   );
    //     // localStorage.setItem("id", JSON.stringify(findId._id));
    //     // }
    //   });
  }
}

/**
 *
 * Expects request to contain:
 * {
 *  contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 *  }
 *  products: [string] <-- array of product _id
 * }
 *
 *
 */
