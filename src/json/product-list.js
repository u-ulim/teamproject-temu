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
        productListCountersSpan.setAttribute("data-product-id", product.id);
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
        // productListSoldsOut.innerText = `매진임박`;
        productListQuantity.innerText = `${product.quantity}개 남음`;
        productListPrice.innerText = price;

        // 랜덤으로 24시간에서 4시간 사이의 시간을 설정 (초 단위로 변환)
        function getRandomTimeInSeconds() {
          const maxTime = 24 * 60 * 60; // 24시간을 초로 변환
          const minTime = 4 * 60 * 60; // 4시간을 초로 변환
          return Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
        }

        // 시간을 "HH:MM:SS" 형식으로 변환
        function formatTime(seconds) {
          const hours = Math.floor(seconds / 3600);
          const minutes = Math.floor((seconds % 3600) / 60);
          const secs = seconds % 60;
          return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
          )}:${String(secs).padStart(2, "0")}`;
        }

        // 남은 시간을 줄이는 로직
        function startCountdown() {
          let remainingTime = getRandomTimeInSeconds(); // 랜덤 시간 설정

          // 초기값 설정
          productListSoldsOut.innerText = formatTime(remainingTime);

          // 1초마다 실행되는 타이머
          const countdownInterval = setInterval(() => {
            remainingTime--;

            // 남은 시간이 0이 되면 타이머 중지
            if (remainingTime <= 0) {
              clearInterval(countdownInterval);
              productListSoldsOut.innerText = "00:00:00"; // 타이머 종료시 00:00:00 표시
            } else {
              // 시간이 줄어드는 것을 화면에 표시
              productListSoldsOut.innerText = formatTime(remainingTime);
            }
          }, 1000); // 1초마다 실행
        }

        // 제품 타이머를 시작하는 함수 호출
        startCountdown();

        // 클릭 시 제품 상세 페이지로 이동
        productListThumbBox.addEventListener("click", () => {
          const url = `/html/components/product-detail.html?category=${
            product.category
          }&name=${encodeURIComponent(product.title)}`;
          window.location.href = url;
        });

        // /////////////////
        // // cartLocalStorage: LocalStorage에서 장바구니 상태 가져오기
        // // cartLocalStorage
        // let setCartProducts =
        //   JSON.parse(localStorage.getItem("setCartProducts")) || [];

        // // LocalStorage에 장바구니 상태 저장
        // const localStorageSave = () => {
        //   localStorage.setItem(
        //     "setCartProducts",
        //     JSON.stringify(setCartProducts)
        //   );
        // };

        // // 아이템이 장바구니에 있는지 확인하는 함수
        // const isInCart = (productId, color, size) => {
        //   return setCartProducts.some(
        //     (item) =>
        //       item.id === productId &&
        //       item.selectColor === color &&
        //       item.selectSize === size
        //   );
        // };

        // // 장바구니에 상품을 추가하거나 제거하는 함수
        // const toggleCartItem = (product, iconElement) => {
        //   const selectColorElement = document.querySelector("#colors");
        //   const selectSizeElement = document.querySelector("#sizes");

        //   // 색상과 사이즈 요소가 존재하는지 확인하고 값 설정
        //   const selectColor = selectColorElement
        //     ? selectColorElement.value
        //     : "defaultColor";
        //   const selectSize = selectSizeElement
        //     ? selectSizeElement.value
        //     : "defaultSize";

        //   // 수량 요소를 찾아 기본값으로 1을 설정 (quan이 정의되지 않았을 때 기본값 1 사용)
        //   const quantity = typeof quan !== "undefined" ? Number(quan) : 1;

        //   const cartProduct = {
        //     id: product.id,
        //     title: product.title,
        //     price: product.price,
        //     quan: quantity,
        //     sumPrice: product.price * quantity,
        //     img: product.thumbnail,
        //     discountRate: product.discountRate,
        //     beforePrice: product.details.beforePrice,
        //     discountingPrice: product.details.beforePrice - product.price,
        //     discountedPrice:
        //       (product.details.beforePrice - product.price) * quantity,
        //     selectColor, // 선택된 색상
        //     selectSize, // 선택된 사이즈
        //   };

        //   // 장바구니에서 해당 제품이 있는지 확인
        //   const existingProductIndex = setCartProducts.findIndex(
        //     (item) =>
        //       item.id === cartProduct.id &&
        //       item.selectColor === cartProduct.selectColor &&
        //       item.selectSize === cartProduct.selectSize
        //   );

        //   if (existingProductIndex > -1) {
        //     // 이미 장바구니에 있는 경우 -> 제거
        //     setCartProducts.splice(existingProductIndex, 1);
        //     iconElement.classList.remove("active"); // active 클래스 제거
        //   } else {
        //     // 장바구니에 없는 경우 -> 추가
        //     setCartProducts.push(cartProduct);
        //     iconElement.classList.add("active"); // active 클래스 추가
        //   }

        //   // LocalStorage에 저장
        //   localStorageSave();
        // };

        // // 페이지 로드 시 장바구니에 있는 상품에 대해 아이콘 상태 복원
        // const restoreCartIcons = () => {
        //   document
        //     .querySelectorAll(".product-list__cart-ico")
        //     .forEach((iconElement) => {
        //       const productId = iconElement.getAttribute("data-product-id");
        //       const selectColor = iconElement.getAttribute("data-color");
        //       const selectSize = iconElement.getAttribute("data-size");

        //       if (isInCart(productId, selectColor, selectSize)) {
        //         iconElement.classList.add("active");
        //       } else {
        //         iconElement.classList.remove("active");
        //       }
        //     });
        // };

        // // 이벤트 핸들러 추가 (form submit 대신 버튼 클릭 시 장바구니 처리)
        // document
        //   .querySelectorAll(".product-list__cart-ico")
        //   .forEach((iconElement) => {
        //     iconElement.addEventListener("click", function () {
        //       const productId = this.getAttribute("data-product-id");

        //       // 제품 배열에서 productId에 맞는 제품 찾기
        //       const product = data.products.find(
        //         (item) => item.id === productId
        //       );

        //       if (product) {
        //         toggleCartItem(product, this);
        //       } else {
        //         console.error("Product not found for productId:", productId);
        //       }
        //     });
        //   });

        // // 제품이 로드되면 장바구니 상태에 따라 아이콘 복원
        // restoreCartIcons();
        // //////////////////

        /***************** */
        // LocalStorage에서 장바구니 상태 가져오기
        let setCartProducts =
          JSON.parse(localStorage.getItem("setCartProducts")) || [];

        // LocalStorage에 장바구니 상태 저장
        const localStorageSave = () => {
          localStorage.setItem(
            "setCartProducts",
            JSON.stringify(setCartProducts)
          );
        };

        // 아이템이 장바구니에 있는지 확인하는 함수
        const isInCart = (productId, color, size) => {
          return setCartProducts.some(
            (item) =>
              item.id === productId &&
              item.selectColor === color &&
              item.selectSize === size
          );
        };

        // 장바구니에 상품을 추가하거나 제거하는 함수
        const toggleCartItem = (product, iconElement) => {
          const selectColorElement = document.querySelector("#colors");
          const selectSizeElement = document.querySelector("#sizes");

          // 색상과 사이즈 요소가 존재하는지 확인하고 값 설정
          const selectColor = selectColorElement
            ? selectColorElement.value
            : "defaultColor";
          const selectSize = selectSizeElement
            ? selectSizeElement.value
            : "defaultSize";

          // 수량 요소를 찾아 기본값으로 1을 설정 (quan이 정의되지 않았을 때 기본값 1 사용)
          const quantity = typeof quan !== "undefined" ? Number(quan) : 1;

          const cartProduct = {
            id: product.id,
            title: product.title,
            price: product.price,
            quan: quantity,
            sumPrice: product.price * quantity,
            img: product.thumbnail,
            discountRate: product.discountRate,
            beforePrice: product.details.beforePrice,
            discountingPrice: product.details.beforePrice - product.price,
            discountedPrice:
              (product.details.beforePrice - product.price) * quantity,
            selectColor, // 선택된 색상
            selectSize, // 선택된 사이즈
          };

          // 장바구니에서 해당 제품이 있는지 확인
          const existingProductIndex = setCartProducts.findIndex(
            (item) =>
              item.id === cartProduct.id &&
              item.selectColor === cartProduct.selectColor &&
              item.selectSize === cartProduct.selectSize
          );

          if (existingProductIndex > -1) {
            // 이미 장바구니에 있는 경우 -> 제거
            setCartProducts.splice(existingProductIndex, 1);
            iconElement.classList.remove("active"); // active 클래스 제거
          } else {
            // 장바구니에 없는 경우 -> 추가
            setCartProducts.push(cartProduct);
            iconElement.classList.add("active"); // active 클래스 추가
          }

          // LocalStorage에 저장
          localStorageSave();
        };

        // 페이지 로드 시 장바구니에 있는 상품에 대해 아이콘 상태 복원
        const restoreCartIcons = () => {
          document
            .querySelectorAll(".product-list__cart-ico")
            .forEach((iconElement) => {
              const productId = iconElement.getAttribute("data-product-id");
              const selectColor =
                iconElement.getAttribute("data-color") || "defaultColor";
              const selectSize =
                iconElement.getAttribute("data-size") || "defaultSize";

              // 장바구니에 있는 상품인지 확인 후 active 클래스 설정
              if (isInCart(productId, selectColor, selectSize)) {
                iconElement.classList.add("active");
              } else {
                iconElement.classList.remove("active");
              }
            });
        };

        // 이벤트 핸들러 추가 (form submit 대신 버튼 클릭 시 장바구니 처리)
        document
          .querySelectorAll(".product-list__cart-ico")
          .forEach((iconElement) => {
            iconElement.addEventListener("click", function () {
              const productId = this.getAttribute("data-product-id");

              // 제품 배열에서 productId에 맞는 제품 찾기
              const product = data.products.find(
                (item) => item.id === productId
              );

              if (product) {
                toggleCartItem(product, this);
              } else {
                console.error("Product not found for productId:", productId);
              }
            });
          });

        // 제품이 로드되면 장바구니 상태에 따라 아이콘 복원
        restoreCartIcons();
        /***************** */
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
