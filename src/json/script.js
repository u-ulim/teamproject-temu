const productsURL =
  "https://my-json-server.typicode.com/u-ulim/temu-products/db";

console.log("hi");

fetch(productsURL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const createItem = (product) => {
      const ul = document.querySelector("ul");
      const li = document.createElement("li");
      const h3 = document.createElement("h3");
      const img = document.createElement("img");
      const span = document.createElement("span");
      const div = document.createElement("div");
      const attr = document.createAttribute("src");
      const price = new Intl.NumberFormat("ko-kr", {}).format(product.price);

      li.id = product.id;

      console.log(li.id);

      console.log(price);

      h3.className = "name";
      h3.innerText = product.title;

      span.className = "price";
      span.innerText = price;

      attr.value = product.thumbnail;
      img.setAttributeNode(attr);
      ul.appendChild(li);
      div.append(h3, span);
      li.append(img, div);

      li.addEventListener("click", () => {
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
