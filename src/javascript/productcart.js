// 배너 삭제 기능
const banner = document.querySelector(".banner");
const bannerClose = document.querySelector(".banner-close");

// 배너 닫기 버튼 클릭 시 배너 숨기기
if (bannerClose) {
  bannerClose.addEventListener("click", () => {
    banner.style.display = "none";
  });
}

const productInfoCart = document.querySelector(".product__info");
const selectAllCheckbox = document.querySelector("#custom__box");
const productNum = document.querySelector("#item__count");

let productCheckboxes;
let getCartProducts = JSON.parse(localStorage.getItem("setCartProducts")) || [];
const productsURL =
  "https://raw.githubusercontent.com/u-ulim/temu-products/main/test.json";

// 제품 데이터 가져오기
fetch(productsURL)
  .then((response) => response.json())
  .then((data) => {
    productsData = data.products;
    renderCartItems(); // 장바구니 항목을 렌더링
  });

// 장바구니에 제품 추가 함수
function addToCart(newProduct) {
  const existingProductIndex = getCartProducts.findIndex(
    (product) =>
      product.id === newProduct.id &&
      product.selectColor.toLowerCase().trim() ===
        newProduct.selectColor.toLowerCase().trim() &&
      product.selectSize.toLowerCase().trim() ===
        newProduct.selectSize.toLowerCase().trim()
  );

  if (existingProductIndex !== -1) {
    // 기존 제품의 수량을 업데이트
    getCartProducts[existingProductIndex].quan += newProduct.quan;
  } else {
    // 새로운 제품 추가
    getCartProducts.push(newProduct);
  }

  updateLocalStorage();
  renderCartItems();
}

// 장바구니 항목을 화면에 표시
function renderCartItems() {
  productInfoCart.innerHTML = "";

  if (getCartProducts.length === 0) {
    document.querySelector(".empty__product").style.display = "block";
    productInfoCart.style.display = "none";
    return;
  } else {
    document.querySelector(".empty__product").style.display = "none";
    productInfoCart.style.display = "block";
  }

  getCartProducts.forEach((product, index) => {
    const {
      img,
      title,
      selectColor,
      selectSize,
      quan,
      discountRate,
      sumPrice,
      discountingPrice,
    } = product;
    const originalTotalPrice = sumPrice * quan;
    const discountedTotalPrice = discountingPrice * quan;

    // 장바구니
    const cartProductHTML = `
      <ul class="product">
        <li class="custom__box">
          <div>
            <input type="checkbox" name="checkbox" id="custom__checkbox_${index}" class="custom__checkbox" data-index="${index}" />
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
            }</span><span>|</span><span>${selectSize || "사이즈"}</span></div>
            <div class="product__text-down">
              <input type="button" value="옵션변경" class="option" data-index="${index}" />
              <span>|</span>
              <input type="button" value="바로구매" />
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
  });

  addEventListeners();
  updateSelectAllCheckbox();
}

function addEventListeners() {
  document.querySelectorAll(".original-add").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      updateQuantity(index, 1);
    });
  });

  document.querySelectorAll(".original-minus").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      updateQuantity(index, -1);
    });
  });

  document.querySelectorAll(".product__close i").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      removeCartItem(index);
    });
  });

  document.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      openModal(index);
    });
  });

  const deleteSelectedBtn = document.querySelector("button");
  deleteSelectedBtn.addEventListener("click", () => {
    const selectedIndexes = [];
    document
      .querySelectorAll(".custom__checkbox:checked")
      .forEach((checkbox) => {
        selectedIndexes.push(checkbox.getAttribute("data-index"));
      });
    deleteSelectedItems(selectedIndexes);
  });
}

// 수량 업데이트 함수
function updateQuantity(index, delta) {
  let product = getCartProducts[index];
  let newQuantity = product.quan + delta;

  if (newQuantity < 1) {
    newQuantity = 1;
  }

  product.quan = newQuantity;
  updateLocalStorage();
  renderCartItems();
}

// 상품 삭제
function removeCartItem(index) {
  getCartProducts.splice(index, 1);
  updateLocalStorage();
  renderCartItems();
  checkIfCartIsEmpty();
}

// 선택 삭제
function deleteSelectedItems(indexes) {
  getCartProducts = getCartProducts.filter(
    (_, index) => !indexes.includes(index.toString())
  );
  updateLocalStorage();
  renderCartItems();
  checkIfCartIsEmpty();
}

// 로컬스토리지 업데이트 함수
function updateLocalStorage() {
  if (getCartProducts.length > 0) {
    localStorage.setItem("setCartProducts", JSON.stringify(getCartProducts));
  } else {
    localStorage.removeItem("setCartProducts");
  }
}

// 옵션 변경 모달창 열기
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

// 전체 선택 체크박스 상태 업데이트 함수
function updateSelectAllCheckbox() {
  productCheckboxes = document.querySelectorAll(".product .custom__checkbox");

  if (productCheckboxes.length === 0) {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.disabled = true;
    productNum.innerText = "";
  } else {
    selectAllCheckbox.disabled = false;

    const checkedCheckboxes = Array.from(productCheckboxes).filter(
      (checkbox) => checkbox.checked
    );

    selectAllCheckbox.checked =
      checkedCheckboxes.length === productCheckboxes.length;
    productNum.innerText =
      checkedCheckboxes.length > 0 ? `(${checkedCheckboxes.length})` : "";
  }
}

// 전체 선택 체크박스 이벤트
if (selectAllCheckbox) {
  selectAllCheckbox.addEventListener("change", () => {
    let isChecked = selectAllCheckbox.checked;
    productCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });

    updateSelectAllCheckbox();
  });
}

// 개별 체크박스 변경 이벤트
function addCheckboxListeners() {
  productCheckboxes = document.querySelectorAll(".product .custom__checkbox");

  productCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateSelectAllCheckbox();
    });
  });
}

addCheckboxListeners();

// 장바구니가 비었을 때 처리
function checkIfCartIsEmpty() {
  const emptyCartMessage = document.querySelector(".empty__product");
  if (getCartProducts.length === 0) {
    emptyCartMessage.style.display = "block";
    productInfoCart.style.display = "none";
  } else {
    emptyCartMessage.style.display = "none";
    productInfoCart.style.display = "block";
  }
}

checkIfCartIsEmpty();
