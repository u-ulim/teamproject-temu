const productsURL =
  "https://my-json-server.typicode.com/u-ulim/temu-products/db";

console.log("hi");

fetch(productsURL)
  .then((response) => response.json())
  .then((data) => {
    const createItem = (product) => {
      // 노드 선택 및 생성
      const productLists = document.querySelector(".product-lists");
      const productList = document.createElement("li");
      const productListThumb = document.createElement("img");
      const productListThumbSrc = document.createAttribute("src");
      const productListTitle = document.createElement("h3");
      const productListCounters = document.createElement("div");

      const productListCountersDiv = document.createElement("div");
      const productListDiscount = document.createElement("span");
      const productListPrice = document.createElement("span");

      const productListCountersSpan = document.createElement("span");

      // item id 추가
      productList.id = product.id;

      // class 구조 추가
      productLists.appendChild(productList);
      productList.append(
        productListThumb,
        productListTitle,
        productListCounters
      );
      productListCounters.append(
        productListCountersDiv,
        productListCountersSpan
      );
      productListCountersDiv.append(productListDiscount, productListPrice);

      // attribute 추가
      productListThumbSrc.value = product.thumbnail;
      productListThumb.setAttributeNode(productListThumbSrc);

      // class 지정
      productList.className = "product-list";
      productListTitle.className = "product-list__title";
      productListThumb.className = "product-list__thumb";
      productListCounters.className = "product-list__counters";

      productListDiscount.className = "product-list__discount";
      productListPrice.className = "product-list__price";

      productListCountersSpan.className = "product-list__cart-ico";

      // 가격 조정
      const price = new Intl.NumberFormat("ko-kr", {}).format(product.price);

      // Text 생성

      productListTitle.innerText = product.title;
      productListDiscount.innerText = product.discountRate;
      productListPrice.innerText = price;

      // attr.value = product.thumbnail;
      // productListThumb.setAttributeNode(attr);
      // div.append(productListTitle, productListPrice);
      // productList.append(productListThumb, div);

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
