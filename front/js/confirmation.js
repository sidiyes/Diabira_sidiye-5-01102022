let linkId = new URL(window.location).searchParams.get("id");
const orderId = document.getElementById('orderId');
orderId.innerHTML = linkId;
localStorage.clear();