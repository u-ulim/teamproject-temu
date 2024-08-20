const productsURL =
  "https://my-json-server.typicode.com/u-ulim/temu-products/db";

fetch(productsURL)
  .then((response) => response.json())
  .then((data) => {
    const createItem = (product) => {
      // 노드 선택 및 생성
      const productLists = document.querySelector(".product-lists");
      const productList = document.createElement("li");
      const productListThumbBox = document.createElement("div");
      const productListThumb = document.createElement("img");
      const productListThumbSrc = document.createAttribute("src");
      const productListTitle = document.createElement("h3");
      const productListCounters = document.createElement("div");
      const productListReviews = document.createElement("div");
      const productListSolds = document.createElement("div");

      const productListCountersDiv = document.createElement("div");
      const productListDiscount = document.createElement("span");
      const productListPrice = document.createElement("span");

      const productListCountersSpan = document.createElement("span");

      const productListStar = document.createElement("i");
      const productListRating = document.createElement("span");
      const productListReviewText = document.createElement("span");
      const productListReviewCount = document.createElement("span");

      const productListSoldsOut = document.createElement("div");
      const productListQuantity = document.createElement("span");

      // item id 추가
      productList.id = product.id;

      // class 구조 추가
      productLists.appendChild(productList);
      productList.append(
        productListThumbBox,
        productListTitle,
        productListCounters,
        productListReviews,
        productListSolds
      );
      productListThumbBox.append(productListThumb);
      productListCounters.append(
        productListCountersDiv,
        productListCountersSpan
      );
      productListCountersDiv.append(productListDiscount, productListPrice);

      productListReviews.append(
        productListStar,
        productListRating,
        productListReviewText,
        productListReviewCount
      );

      productListSolds.append(productListSoldsOut, productListQuantity);

      // attribute 추가
      productListThumbSrc.value = product.thumbnail;
      productListThumb.setAttributeNode(productListThumbSrc);

      // class 지정
      productList.className = "product-list";
      productListThumbBox.className = "product-list__thumb-box";
      productListTitle.className = "product-list__title";
      productListThumb.className = "product-list__thumb";
      productListCounters.className = "product-list__counters";
      productListReviews.className = "product-list__reviews";

      productListDiscount.className = "product-list__discount";
      productListPrice.className = "product-list__price";

      productListCountersSpan.className = "product-list__cart-ico";
      productListStar.className = "product-list__star";
      productListRating.className = "product-list__rating";
      productListReviewText.className = "product-list__review-text";
      productListReviewCount.className = "product-list__review-count";

      productListSolds.className = "product-list__solds";
      productListSoldsOut.className = "product-list__solds-out";
      productListQuantity.className = "product-list__quantity";

      // 가격 조정
      const price = new Intl.NumberFormat("ko-kr", {}).format(product.price);

      // Text 생성
      productListTitle.innerText = product.title;
      productListDiscount.innerText = product.discountRate;
      productListRating.innerText = product.rating;
      productListReviewText.innerText = `리뷰`;
      productListReviewCount.innerText = `(${product.reviewCount})`;
      productListSoldsOut.innerText = `매진임박`;
      productListQuantity.innerText = `${product.quantity}개 남음`;
      productListPrice.innerText = price;

      // attr.value = product.thumbnail;
      // productListThumb.setAttributeNode(attr);
      // div.append(productListTitle, productListPrice);
      // productList.append(productListThumb, div);
      productList.addEventListener("click", () => {
        // 절대경로 이용하기
        const url = `/html/components/product-detail.html?category=${
          product.category
        }&name=${encodeURIComponent(product.title)}`;
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
