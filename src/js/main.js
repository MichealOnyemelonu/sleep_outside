// Individual task1 for week 2
import ProductData from './ProductData.mjs';

import ProductList from "./ProductList.mjs";


const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

// Create a new instance of the ProductList class
const productList = new ProductList("Tents", dataSource, element);