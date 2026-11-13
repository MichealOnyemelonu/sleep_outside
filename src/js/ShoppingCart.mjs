import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
} from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
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
}

export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  init() {
    this.renderCartContents();
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key) || [];

    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      cartItems,
      "afterbegin",
      true,
    );

    document.querySelectorAll(".remove-item").forEach((item) => {
      item.addEventListener("click", (event) => {
        this.removeCartItem(event);
      });
    });
  }


// week 2 individual assignment: removeCartItem function that takes an event object as a parameter. 
//    This function retrieves the product id from the data-id attribute of the clicked element, retrieves 
//    the cart items from local storage, filters out the item with the matching id, saves the updated cart 
//    items back to local storage, and calls renderCartContents to update the cart display.

  removeCartItem(event) {
    const productId = event.target.dataset.id;
    const cartItems = getLocalStorage(this.key) || [];

    const updatedCart = cartItems.filter(
      (item) => item.Id !== productId,
    );

    setLocalStorage(this.key, updatedCart);

    this.renderCartContents();
  }
}