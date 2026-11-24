import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => {
    return {
      id: item.Id,
      name: item.Name,
      price: Number(item.FinalPrice),
      quantity: 1,
    };
  });
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(
      `${this.outputSelector} #cartTotal`,
    );

    const itemNumElement = document.querySelector(
      `${this.outputSelector} #num-items`,
    );

    this.itemTotal = this.list.reduce(
      (sum, item) => sum + Number(item.FinalPrice),
      0,
    );

    itemNumElement.textContent = this.list.length;
    summaryElement.textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;

    this.shipping =
      this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(
      `${this.outputSelector} #shipping`,
    );
    const orderTotal = document.querySelector(
      `${this.outputSelector} #orderTotal`,
    );

    tax.textContent = `$${this.tax.toFixed(2)}`;
    shipping.textContent = `$${this.shipping.toFixed(2)}`;
    orderTotal.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    const formElement = document.forms["chekout"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal.toFixed(2);
    order.shipping = this.shipping;
    order.tax = this.tax.toFixed(2);
    order.items = packageItems(this.list);

    try {
      const response = await services.checkout(order);
      console.log(response);
      return response;
    } catch (err) {
      console.log("Checkout failed:", err);
      console.log("Server message:", err.message);
      
    }

  }
}