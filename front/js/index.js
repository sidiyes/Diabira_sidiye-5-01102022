let url = `http://localhost:3000/api/products`;

fetch(url)
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    for (let product of products) {
      let HTML = document.getElementById("items");

      let card = document.createElement("a");
      card.href = `./product.html?id=${product._id}`;

      let cardArticle = document.createElement("article");

      let cardImg = document.createElement("img");
      cardImg.src = product.imageUrl;
      cardImg.alt = product.imageUrl;

      let cardH3 = document.createElement("h3");
      cardH3.textContent = product.name;
      cardH3.className = "productName";
      let cardP = document.createElement("p");
      cardP.className = "productDescription";
      cardP.textContent = product.description;

      HTML.appendChild(card);
      card.appendChild(cardArticle);
      cardArticle.appendChild(cardImg);
      cardArticle.appendChild(cardH3);
      cardArticle.appendChild(cardP);
    }
  });