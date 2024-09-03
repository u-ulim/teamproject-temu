// 요소 선택
const banner = document.querySelector(".banner");
const bannerClose = document.querySelector(".banner-close");
const productInfoCart = document.querySelector(".product__info-All");
const selectAllCheckbox = document.querySelector("#custom__box");
const itemCountElement = document.querySelector("#item__count");

let productCheckboxes;
let getCartProducts = JSON.parse(localStorage.getItem("setCartProducts")) || [];
const productsURL =
  "https://raw.githubusercontent.com/u-ulim/temu-products/main/test.json";
let productsData = [];

// 배너 닫기 기능
if (bannerClose) {
  bannerClose.addEventListener("click", () => {
    banner.style.display = "none";
  });
}

// 제품 데이터 가져오기
fetch(productsURL)
  .then((response) => response.json())
  .then((data) => {
    productsData = data.products;
    renderCartItems();
  });

// 장바구니 렌더링
function renderCartItems() {
  productInfoCart.innerHTML = "";

  if (getCartProducts.length === 0) {
    document.querySelector(".empty__product").style.display = "block";
    productInfoCart.style.display = "none";
    resetAsideValues();
    selectAllCheckbox.disabled = true;
  } else {
    document.querySelector(".empty__product").style.display = "none";
    productInfoCart.style.display = "block";
    selectAllCheckbox.disabled = false;
  }

  let totalOriginalPrice = 0;
  let totalDiscountedPrice = 0;
  let totalDiscountAmount = 0;

  getCartProducts.forEach((product, index) => {
    const {
      img,
      title,
      selectColor,
      selectSize,
      quan,
      discountRate,
      discountingPrice,
      price,
    } = product;

    const originalTotalPrice = price * quan;
    const discountedTotalPrice = discountingPrice * quan;
    const discountAmount = discountedTotalPrice;

    // 장바구니 항목 HTML 생성
    const cartProductHTML = `
      <ul class="product">
        <li class="custom__box">
          <div>
            <input type="checkbox" id="custom__checkbox_${index}" class="custom__checkbox" data-index="${index}" />
            <label for="custom__checkbox_${index}" class="select"></label>
          </div>
        </li>
        <li class="img">
          <div><img src="${img}" alt="${title}"/></div>
        </li>
        <li class="product__info">
          <div>
            <div class="product__text-up"><span>${title}</span></div>
            <div class="product__text-middle"><span>${
              selectColor || "색상"
            }</span><span> | </span><span>${selectSize || "사이즈"}</span></div>
            <div class="product__text-down">
              <input type="button" value="옵션변경" class="option" data-index="${index}" />
            </div>
          </div>
        </li>
        <li class="number__box">
          <div class="number__input">
            <input type="button" value="+" class="original-add" data-index="${index}" />
            <input type="text" class="original-amount" id="original-amount_${index}" disabled size="2" value="${quan}" />
            <input type="button" value="-" class="original-minus" data-index="${index}" />
          </div>
        </li>
        <li class="price__info">
          <div>
            <span class="original-price" id="original-price_${index}">￦${originalTotalPrice.toLocaleString()}</span>
            <div class="price__text-down">
              <span class="sale">-${discountRate}%</span>
              <span>￦${discountedTotalPrice.toLocaleString()}</span>
            </div>
          </div>
        </li>
        <li class="product__close">
          <div><i class="fa-solid fa-xmark" data-index="${index}"></i></div>
        </li>
      </ul>`;

    productInfoCart.insertAdjacentHTML("beforeend", cartProductHTML);

    totalOriginalPrice += originalTotalPrice;
    totalDiscountAmount += discountAmount;
    totalDiscountedPrice = totalOriginalPrice - totalDiscountAmount;
  });

  // aside 정보 업데이트
  updateAsideValues(
    totalOriginalPrice,
    totalDiscountedPrice,
    totalDiscountAmount
  );
  addEventListeners();
  addCheckboxListeners();
  updateSelectAllCheckbox();
  updateSelectedCount(); // 선택된 항목 개수 업데이트
}

function updateSelectedCount() {
  const selectedCheckboxes = document.querySelectorAll(
    ".custom__checkbox:checked"
  ).length;
  const displayCount = Math.max(0, selectedCheckboxes - 1);
  if (itemCountElement) {
    itemCountElement.innerText = `(${displayCount})`;
  }
}

// aside 초기화 함수 (장바구니가 비었을 때 0원으로 설정)
function resetAsideValues() {
  const asideContainer = document.querySelector("aside");
  if (asideContainer) {
    asideContainer.innerHTML = `
      <div class="checkout__summary">
        <div class="summary__item">
          <ul>
            <li class="product__fee">
              <span>상품금액</span>
              <span class="product__fee__price price">￦0</span>
            </li>
            <li class="product__sale">
              <span>상품할인금액</span>
              <span class="discount"> - ￦0</span>
            </li>
            <li class="additional__info" id="additional__info" style="display: none;">
              ￦0 추가주문 시,<span>구매가능</span>
            </li>
          </ul>
        </div>
        <hr />
        <div class="summary__Price">
          <ul>
            <li class="summary__item__total">
              <p>결제금액</p>
              <span class="total-price">￦0</span>
            </li>
            <li class="tax__info">
              <span class="tax__label">TAX</span>
              <span class="tax__text">Temu의 가격은 관세가격을 포함합니다.</span>
            </li>
          </ul>
        </div>
        <button type="submit" class="checkout__button disabled" id="checkout__button" disabled>결제하기</button>
        <div class="info">
          <ul>
            <li class="info__text">
              <i class="fa-solid fa-circle-exclamation"></i>
              <p>결제가 완료될때까지 제품의 가격 및 구매 여부가 보장되지 않습니다.</p>
            </li>
            <li class="info__text">
              <i class="fa-solid fa-circle-exclamation"></i>
              <p>다음페이지에서 주문서를 확인하기 전까지 결제가 되지 않습니다.</p>
            </li>
            <li class="info__text">
              <i class="fa-solid fa-circle-exclamation"></i>
              <p>마이페이지>주문내역 상세페이지에서 직접 취소 할 수 있습니다.</p>
            </li>
          </ul>
        </div>
      </div>
    `;
  }
}

// aside 값 업데이트
function updateAsideValues(
  totalOriginalPrice,
  totalDiscountedPrice,
  totalDiscountAmount
) {
  const asideContainer = document.querySelector("aside");
  if (asideContainer) {
    const finalAmount = totalDiscountedPrice;
    const discountSum = totalDiscountAmount;
    const targetAmount = 20000;
    const shortage = targetAmount - finalAmount;

    asideContainer.innerHTML = `
      <div class="checkout__summary">
        <div class="summary__item">
          <ul>
            <li class="product__fee">
              <span>상품금액</span>
              <span class="product__fee__price price">￦${totalOriginalPrice.toLocaleString()}</span>
            </li>
            <li class="product__sale">
              <span>상품할인금액</span>
              <span class="discount"> - ￦${discountSum.toLocaleString()}</span>
            </li>
            <li class="additional__info" id="additional__info" ${
              shortage > 0
                ? 'style="display: block;"'
                : 'style="display: none;"'
            }>
              ￦${shortage.toLocaleString()} 추가주문 시,<span>구매가능</span>
            </li>
          </ul>
        </div>
        <hr />
        <div class="summary__Price">
          <ul>
            <li class="summary__item__total">
              <p>결제금액</p>
              <span class="total-price">￦${finalAmount.toLocaleString()}</span>
            </li>
            <li class="tax__info">
              <span class="tax__label">TAX</span>
              <span class="tax__text">Temu의 가격은 관세가격을 포함합니다.</span>
            </li>
          </ul>
        </div>
        <button type="submit" class="checkout__button ${
          shortage > 0 ? "disabled" : "enabled"
        }" id="checkout__button" ${
      shortage > 0 ? "disabled" : ""
    }>결제하기</button>
        <div class="info">
          <ul>
            <li class="info__text">
              <i class="fa-solid fa-circle-exclamation"></i>
              <p>결제가 완료될때까지 제품의 가격 및 구매 여부가 보장되지 않습니다.</p>
            </li>
            <li class="info__text">
              <i class="fa-solid fa-circle-exclamation"></i>
              <p>다음페이지에서 주문서를 확인하기 전까지 결제가 되지 않습니다.</p>
            </li>
            <li class="info__text">
              <i class="fa-solid fa-circle-exclamation"></i>
              <p>마이페이지>주문내역 상세페이지에서 직접 취소 할 수 있습니다.</p>
            </li>
          </ul>
        </div>
      </div>
    `;

    const checkoutButton = document.querySelector("#checkout__button");
    if (checkoutButton) {
      checkoutButton.style.cursor = shortage > 0 ? "not-allowed" : "pointer";
      checkoutButton.addEventListener("click", () => {
        if (shortage <= 0) {
          window.location.href =
            "http://127.0.0.1:5501/html/components/Payment.html";
        }
      });
    }
  }
}

// 개별 체크박스 리스너 추가
function addCheckboxListeners() {
  productCheckboxes = document.querySelectorAll(".custom__checkbox");
  productCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      handleCheckboxChange();
      updateSelectedCount();
      updateSelectAllCheckbox();
    });
  });
}

// 체크박스 상태 변경 처리
function handleCheckboxChange() {
  const selectedCheckboxes = document.querySelectorAll(
    ".custom__checkbox:checked"
  );
  const productIndexes = Array.from(selectedCheckboxes).map((checkbox) =>
    parseInt(checkbox.getAttribute("data-index"))
  );

  getCartProducts.forEach((product, index) => {
    product.checked = productIndexes.includes(index);
  });

  localStorage.setItem("setCartProducts", JSON.stringify(getCartProducts));
  updateSelectAllCheckbox();
}

// 전체 선택 체크박스 상태 업데이트
function updateSelectAllCheckbox() {
  const allChecked =
    productCheckboxes.length > 0 &&
    Array.from(productCheckboxes).every((checkbox) => checkbox.checked);
  if (selectAllCheckbox) {
    selectAllCheckbox.checked = allChecked;
  }
}

// 전체 선택 체크박스 클릭 처리
if (selectAllCheckbox) {
  selectAllCheckbox.addEventListener("change", () => {
    const isChecked = selectAllCheckbox.checked;
    productCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
    getCartProducts.forEach((product) => {
      product.checked = isChecked;
    });
    localStorage.setItem("setCartProducts", JSON.stringify(getCartProducts));
    updateSelectedCount();
  });
}

// 수량 증가/감소 및 삭제 이벤트 처리
function addEventListeners() {
  document.querySelectorAll(".original-add").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = parseInt(event.target.getAttribute("data-index"));
      if (index >= 0) {
        getCartProducts[index].quan++;
        localStorage.setItem(
          "setCartProducts",
          JSON.stringify(getCartProducts)
        );
        renderCartItems();
      }
    });
  });

  document.querySelectorAll(".original-minus").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = parseInt(event.target.getAttribute("data-index"));
      if (index >= 0 && getCartProducts[index].quan > 1) {
        getCartProducts[index].quan--;
        localStorage.setItem(
          "setCartProducts",
          JSON.stringify(getCartProducts)
        );
        renderCartItems();
      }
    });
  });

  // 개별 제품 삭제 이벤트 처리
  document.querySelectorAll(".product__close i").forEach((icon) => {
    icon.addEventListener("click", (event) => {
      const index = parseInt(event.target.getAttribute("data-index"));
      if (index >= 0) {
        getCartProducts.splice(index, 1);
        if (getCartProducts.length === 0) {
          localStorage.removeItem("setCartProducts");
        } else {
          localStorage.setItem(
            "setCartProducts",
            JSON.stringify(getCartProducts)
          );
        }
        renderCartItems();
      }
    });
  });

  // 선택된 항목 삭제 버튼 추가 및 이벤트 처리
  const deleteSelectedButton = document.querySelector(".delete-select");
  if (deleteSelectedButton) {
    deleteSelectedButton.addEventListener("click", () => {
      getCartProducts = getCartProducts.filter(
        (product, index) =>
          !document.querySelector(`#custom__checkbox_${index}`).checked
      );
      if (getCartProducts.length === 0) {
        localStorage.removeItem("setCartProducts");
      } else {
        localStorage.setItem(
          "setCartProducts",
          JSON.stringify(getCartProducts)
        );
      }
      renderCartItems();
    });
  }

  // 옵션 변경 모달 관련 이벤트 추가
  document.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = parseInt(event.target.getAttribute("data-index"));
      openModal(index);
    });
  });
}

// 모달창 열기 함수
function openModal(index) {
  const optionModal = document.querySelector(".modal__box");
  const modalClose = optionModal.querySelector(".modal__close-box .close");
  const product = getCartProducts[index];
  const productData = productsData.find((item) => item.id === product.id);

  const modalImg = optionModal.querySelector(".product__img img");
  const modalTitle = optionModal.querySelector(".product__info-title");
  const modalColor = optionModal.querySelector(".color");
  const modalSize = optionModal.querySelector(".size");

  modalImg.src = product.img;
  modalTitle.innerHTML = product.title;
  modalColor.innerHTML = product.selectColor;
  modalSize.innerHTML = product.selectSize;

  if (productData && productData.details) {
    const existingDeliveryInfo = optionModal.querySelector(
      ".modal-delivery-info"
    );
    if (existingDeliveryInfo) {
      existingDeliveryInfo.remove();
    }

    const modalDelivery = `
      <p class="modal-delivery-info" style="color:#007316">배송 확률: ${productData.details.deliveryProbability}</p>
    `;
    modalTitle.insertAdjacentHTML("afterend", modalDelivery);
  }

  const colorSelect = optionModal.querySelector("#color");
  const sizeSelect = optionModal.querySelector("#size");

  colorSelect.innerHTML = "<option value='' disabled selected>색상</option>";
  sizeSelect.innerHTML = "<option value='' disabled selected>사이즈</option>";

  if (productData && productData.details.selectOptions.colors.options) {
    productData.details.selectOptions.colors.options.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      colorSelect.appendChild(option);
    });
  }

  if (productData && productData.details.selectOptions.sizes.options) {
    productData.details.selectOptions.sizes.options.forEach((size) => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = size;
      sizeSelect.appendChild(option);
    });
  }

  colorSelect.addEventListener("change", () => {
    modalColor.innerHTML = colorSelect.value;
  });

  sizeSelect.addEventListener("change", () => {
    modalSize.innerHTML = sizeSelect.value;
  });

  const modalAmount = optionModal.querySelector(".modal-amount");
  const modalPrice = optionModal.querySelector("#modal-price");

  modalAmount.value = product.quan;
  modalPrice.innerText = `￦${(
    product.sumPrice * product.quan
  ).toLocaleString()}`;

  const modalSum = optionModal.querySelector(".final__price");
  modalSum.innerHTML = `<span>결제금액</span><span>￦${(
    product.sumPrice * product.quan
  ).toLocaleString()}</span>`;

  const modalAddBtn = optionModal.querySelector(".modal-add");
  const modalMinusBtn = optionModal.querySelector(".modal-minus");

  modalAddBtn.addEventListener("click", () => {
    updateModalQuantity(1, index);
  });

  modalMinusBtn.addEventListener("click", () => {
    updateModalQuantity(-1, index);
  });

  modalClose.addEventListener("click", () => {
    optionModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  const confirmBtn = optionModal.querySelector(
    'input[type="submit"][value="확인"]'
  );
  confirmBtn.addEventListener("click", () => {
    const updatedProduct = {
      ...product,
      selectColor: colorSelect.value,
      selectSize: sizeSelect.value,
      quan: parseInt(modalAmount.value),
    };

    const existingProductIndex = getCartProducts.findIndex(
      (item) =>
        item.id === updatedProduct.id &&
        item.selectColor.toLowerCase().trim() ===
          updatedProduct.selectColor.toLowerCase().trim() &&
        item.selectSize.toLowerCase().trim() ===
          updatedProduct.selectSize.toLowerCase().trim()
    );

    if (existingProductIndex !== -1 && existingProductIndex !== index) {
      getCartProducts[existingProductIndex].quan += updatedProduct.quan;
      getCartProducts.splice(index, 1);
    } else {
      getCartProducts[index] = updatedProduct;
    }

    updateLocalStorage();
    renderCartItems();
    optionModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  optionModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// 모달창에서 수량을 업데이트하는 함수
function updateModalQuantity(delta, index) {
  const optionModal = document.querySelector(".modal__box");
  const modalSum = optionModal.querySelector(".final__price");
  const product = getCartProducts[index];
  let newQuantity = product.quan + delta;

  if (newQuantity < 1) {
    newQuantity = 1;
  }

  product.quan = newQuantity;

  const modalAmount = optionModal.querySelector(".modal-amount");
  const modalPrice = optionModal.querySelector("#modal-price");

  modalAmount.value = newQuantity;
  modalPrice.innerText = `￦${(
    product.sumPrice * newQuantity
  ).toLocaleString()}`;

  modalSum.innerHTML = `<span>결제금액</span><span>￦${(
    product.sumPrice * newQuantity
  ).toLocaleString()}</span>`;

  updateLocalStorage();
  renderCartItems();
}

// 로컬스토리지 업데이트 함수
function updateLocalStorage() {
  if (getCartProducts.length > 0) {
    localStorage.setItem("setCartProducts", JSON.stringify(getCartProducts));
  } else {
    localStorage.removeItem("setCartProducts");
  }
}

// 장바구니가 비어 있을 때 초기 처리
function checkIfCartIsEmpty() {
  if (getCartProducts.length === 0) {
    resetAsideValues(); // 장바구니가 비어 있을 때 aside를 초기화
    selectAllCheckbox.disabled = true; // 장바구니가 비어 있을 때 전체선택 체크박스 비활성화
  } else {
    renderCartItems(); // 장바구니가 비어있지 않다면 항목을 렌더링
    selectAllCheckbox.disabled = false; // 장바구니에 항목이 있으면 전체선택 체크박스 활성화
  }
}

addCheckboxListeners();
checkIfCartIsEmpty();
