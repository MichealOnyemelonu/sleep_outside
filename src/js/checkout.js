import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cartItems = getLocalStorage("so-cart") || [];

const subtotal = cartItems.reduce(
  (total, item) => total + Number(item.FinalPrice),
  0,
);

const taxRate = 0.06;
const tax = subtotal * taxRate;
const shipping = subtotal > 0 ? 10 : 0;
const orderTotal = subtotal + tax + shipping;

document.querySelector("#subtotal").textContent =
  `$${subtotal.toFixed(2)}`;

document.querySelector("#tax").textContent =
  `$${tax.toFixed(2)}`;

document.querySelector("#shipping").textContent =
  `$${shipping.toFixed(2)}`;

document.querySelector("#order-total").textContent =
  `$${orderTotal.toFixed(2)}`;

const checkoutForm = document.querySelector("#checkout-form");

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!checkoutForm.checkValidity()) {
    checkoutForm.reportValidity();
    return;
  }

  //console.log("Checkout form is valid.");
});