import { getLocalStorage } from "./utils.mjs";

import { setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".remove-item").forEach((item) => {
    item.addEventListener("click", removeCartItem);
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="remove-item" data-id="${item.Id}">X</span>

  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function removeCartItem(e) {
  const productId = e.target.dataset.id;

  const cartItems = getLocalStorage("so-cart") || [];

  const updatedCart = cartItems.filter(
    (item) => item.Id !== productId
  );

  setLocalStorage("so-cart", updatedCart);

  renderCartContents();
}

renderCartContents();
