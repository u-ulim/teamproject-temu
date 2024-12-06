// product-list를 로드한 후 데이터 처리
// product-list.html 파일이 로드되고 나서 실행

// URL의 쿼리 값을 가져오는 함수
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    query: params.get("query"),
  };
}

const productsURL =
  "https://raw.githubusercontent.com/u-ulim/temu-products/main/test.json";

fetch(productsURL)
  .then((response) => response.json())
  .then((data) => {
    const productLists = document.querySelector(".find-product-lists");

    console.log(productLists);
    const createItem = (product) => {
      // 이제 product-list.html의 .product-lists 요소가 존재하는지 확인 가능
      if (!productLists) {
        console.error("Parent element '.product-lists' not found.");
        return;
      }

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

      // 로컬스토리지에서 유저 정보 확인
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const isLoggedIn = users.length > 0 && users[0]?.id; // 로그인 상태 확인

      // 클릭 시 제품 상세 페이지로 이동
      productList.addEventListener("click", () => {
        if (!isLoggedIn) {
          // 비로그인 상태
          alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
          window.location.href = "/html/components/login.html"; // 로그인 페이지로 이동
        } else {
          // 로그인 상태: 상세 페이지로 이동
          const url = `/html/components/product-detail.html?category=${
            product.category
          }&name=${encodeURIComponent(product.title)}`;
          window.location.href = url;
        }
      });
    };

    const importData = () => {
      const queryParams = getQueryParams();
      const query = queryParams.query
        ? queryParams.query.trim().toLowerCase()
        : "";
      const category = queryParams.category
        ? queryParams.category.trim().toLowerCase()
        : "";

      const listWrapperSpan = document.querySelector(".list-wrapper span");
      listWrapperSpan.innerText = query;

      // query 또는 category 값에 맞는 아이템만 필터링
      const filteredProducts = data.products.filter((product) => {
        // product.title.toLowerCase().includes(query)
        const titleMatches = product.title.toLowerCase().includes(query);
        const categoryMatches = product.category.toLowerCase() === category;
        return titleMatches || categoryMatches;
      });

      // 필터링된 제품 개수 확인 및 justify-content 조정
      // 필터링된 데이터를 사용해 리스트 생성
      filteredProducts.map((product) => {
        createItem(product);
      });

      // 홀수 개의 아이템일 경우, 짝수 개로 맞추기 위해 빈 li 추가
      // 아이템이 5개가 되도록 빈 li 추가
      // const numItems = filteredProducts.length;
      // if (numItems < 5) {
      //   for (let i = 0; i < 5 - numItems; i++) {
      //     const emptyListItem = document.createElement("li");
      //     emptyListItem.className = "product-list empty-item";
      //     productLists.appendChild(emptyListItem);
      //   }
      // }
    };
    // 데이터를 처리하여 제품 목록 추가
    importData();
  })
  .catch((error) => {
    console.log(error);
  });
