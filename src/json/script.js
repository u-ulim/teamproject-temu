const productsURL =
  "https://my-json-server.typicode.com/u-ulim/temu-products/db";

console.log("hi");

fetch(productsURL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const createItem = (product) => {
      const ul = document.querySelector(".product-lists");
      const productList = document.createElement("li");
      const productListTitle = document.createElement("h3");
      const productListThumb = document.createElement("img");
      const productListPrice = document.createElement("span");
      const div = document.createElement("div");
      const attr = document.createAttribute("src");
      const price = new Intl.NumberFormat("ko-kr", {}).format(product.price);

      productList.id = product.id;

      productListTitle.className = "prodcut-list__title";
      productListTitle.innerText = product.title;

      productListPrice.className = "price";
      productListPrice.innerText = price;

      attr.value = product.thumbnail;
      productListThumb.setAttributeNode(attr);
      ul.appendChild(productList);
      div.append(productListTitle, productListPrice);
      productList.append(productListThumb, div);

      productList.addEventListener("click", () => {
        const url = `/html/product.html?category=${
          product.category
        }&name=${encodeURIComponent(product.name)}`;
        window.location.href = url;
      });
    };
    const importData = () => {
      data.products.map((product) => {
        createItem(product);
      });
    };
    importData();
  })
  .catch((error) => {
    console.log(error);
  });
