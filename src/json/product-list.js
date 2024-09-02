// product-list.html 파일을 로드하여 #product 안에 삽입
const productListLoad = () => {
  return fetch("../../html/components/product-list.html")
    .then((response) => response.text())
    .then((data) => {
      const productList = document.getElementById("product-list");
      productList.innerHTML = data; // product-list.html 파일 내용 삽입
    })
    .catch((error) => console.error("Error loading product list:", error));
};

// product-list를 로드한 후 데이터 처리
productListLoad().then(() => {
  // product-list.html 파일이 로드되고 나서 실행
  const productsURL =
    "https://raw.githubusercontent.com/u-ulim/temu-products/main/test.json";

  fetch(productsURL)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      const createItem = (product) => {
        // 이제 product-list.html의 .product-lists 요소가 존재하는지 확인 가능
        const productLists = document.querySelector(".product-lists");

        if (!productLists) {
          console.error("Parent element '.product-lists' not found.");
          return;
        }

        const productList = document.createElement("li");
        const productListThumbBox = document.createElement("div");
        const productListThumb = document.createElement("img");
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

        // 이미지 소스 설정
        productListThumb.src = product.thumbnail;

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

        // 텍스트 설정
        productListTitle.innerText = product.title;
        productListDiscount.innerText = product.discountRate + "%";
        productListRating.innerText = product.rating;
        productListReviewText.innerText = `리뷰`;
        productListReviewCount.innerText = `(${product.reviewCount})`;
        productListSoldsOut.innerText = `매진임박`;
        productListQuantity.innerText = `${product.quantity}개 남음`;
        productListPrice.innerText = price;

        // 클릭 시 제품 상세 페이지로 이동
        productList.addEventListener("click", () => {
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

      // 데이터를 처리하여 제품 목록 추가
      importData();
    })
    .catch((error) => {
      console.log(error);
    });
});
