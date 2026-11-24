import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {

  console.log(
    product.Name,
    product.FinalPrice,
    product.SuggestedRetailPrice
  );

  let discount = "";

  if (product.FinalPrice < product.SuggestedRetailPrice) {
    const discountPercent = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) *
        100,
    );

    discount = `<span class="discount-badge">${discountPercent}% OFF</span>`;
  }

  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">

      <div class="product-image-container">
        <img src="${product.Image}" alt="Image of ${product.Name}" />
        ${discount}
      </div>

      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>

      ${
  product.FinalPrice < product.SuggestedRetailPrice
    ? `
      <p class="product-card__price">
        <span class="original-price">
          $${product.SuggestedRetailPrice}
        </span>
        <span class="sale-price">
          $${product.FinalPrice}
        </span>
      </p>
    `
    : `
      <p class="product-card__price">
        $${product.FinalPrice}
      </p>
    `
}


    </a>
  </li>`
  ;
}


export default class ProductList {
  constructor(category, dataSource, listElement) {
    // You passed in this information to make the class as reusable as possible.
    // Being able to define these things when you use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
    
  }


 renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);

  }

}


