let productInfoCart = document.querySelector(".product__info");
const getCartProducts = JSON.parse(localStorage.getItem("setCartProducts"));

getCartProducts.forEach((product) => {
  console.log(product);
  const newListItem = document.createElement("ul");
  newListItem.classList.add("product");

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

  const cartProductHTML = `<li class="custom__box">
<div>
  <input
    type="checkbox"
    name="checkbox"
    id="custom__checkbox"
    class="custom__checkbox"
  />
  <label for="custom__checkbox" class="select"></label>
</div>
</li>
<li class="img">
<div>
  <img src="${img}" alt="${title}"/>
</div>
</li>
<li class="product__info">
<div>
  <div class="product__text-up">
    <span>${title}</span>
  </div>
  <div class="product__text-middle">
    <span>${selectColor}</span>
    <span>|</span>
    <span>${selectSize}</span>
  </div>
  <div class="product__text-down">
    <input type="submit" value="옵션변경" class="option" />
    <span>|</span>
    <input type="submit" value="바로구매" />
  </div>
</div>
</li>
<!-- number__input -->
<li class="number__box">
<form class="original__add-minus">
  <input
    type="hidden"
    class="original__sell-price"
    id="original__sell-price"
  />
  <div class="number__input">
    <input
      type="button"
      value="+"
      class="original-add"
      id="original-add"
    />
    <input
      type="text"
      class="original-amount"
      id="original-amount"
      disabled
      size="2"
      value = "${quan}"
    /> 
    <input
      type="button"
      value="-"
      class="original-minus"
      id="original-minus"
    />
  </div>
</form>
</li>
<li class="price__info">
<div>
  <span class="original-price" id="original-price">￦${sumPrice}</span>
  <div class="price__text-down">
    <span class="sale">-${discountRate}%</span>
    <span>￦${discountingPrice}</span>
  </div>
</div>
</li>
<li class="product__close">
<div>
  <span></span>
  <span></span>
</div>
</li>`;

  newListItem.innerHTML = cartProductHTML;
  productInfoCart.appendChild(newListItem);
});

//배너

const banner = document.querySelector(".banner");
const bannerClose = document.querySelector(".banner-close");
const optionSelect = document.querySelector(".option");
const optionModal = document.querySelector(".modal__box");
const modalClose = document.querySelector(".modal__close-box");

// 배너 삭제
if (bannerClose) {
  bannerClose.addEventListener("click", () => {
    banner.classList.remove("active");
  });
}

// 옵션 변경 시 모달 창
if (optionSelect && optionModal && modalClose) {
  optionSelect.addEventListener("click", () => {
    optionModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  modalClose.addEventListener("click", () => {
    optionModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

// 카트창 가격 및 수량 변경 시 모달창에 동일 하게 반영
// 모달창 수량 및 가격 변경 시 확인 버튼 누를 때, 카트창에 반영
// 모달창 수량 및 가격 변경 시 취소 버튼 누를 때, 카트창에 반영하지 않음
// 옵션 변경 시에도 반영되어야함 **

// 카트 창
const oaddBtn = document.querySelector(".original-add");
const ominusBtn = document.querySelector(".original-minus");
const oamount = document.querySelector(".original-amount");
const osellPrice = document.querySelector(".original__sell-price");
const oprice = document.querySelector("#original-price");

// 모달 창
const modalAmount = document.querySelector(".modal-amount");
const modalPrice = document.querySelector("#modal-price");
const confirmBtn = document.querySelector('input[type="submit"][value="확인"]');
const cancelBtn = document.querySelector('input[type="reset"][value="취소"]');
const modalBox = document.querySelector(".modal__box");

// 초기 상태 저장
let initialAmount = parseInt(oamount.value) || 1;
let initialPrice = parseInt(oprice.innerText.replace(/[^0-9]/g, ""));

// 카트 창 수량과 가격 업데이트 함수
function updateCart(amount, price) {
  oamount.value = amount;
  oprice.innerText = `￦${price}`;
}

// 모달 창 수량과 가격 업데이트 함수 ;카트 창에는 반영하지 않음
function updateModal(amount, price) {
  modalAmount.value = amount;
  modalPrice.innerText = `￦${price}`;
}

// 카트 창 수량 증가
oaddBtn.addEventListener("click", function () {
  let amount = parseInt(oamount.value) || 1;
  let price = parseInt(osellPrice.value);
  amount++;
  updateCart(amount, amount * price);
  updateModal(amount, amount * price);
});

// 카트 창 수량 감소
ominusBtn.addEventListener("click", function () {
  let amount = parseInt(oamount.value) || 1;
  let price = parseInt(osellPrice.value);
  if (amount > 1) {
    amount--;
    updateCart(amount, amount * price);
    updateModal(amount, amount * price);
  }
});

function openModal() {
  initialAmount = parseInt(oamount.value) || 1;
  initialPrice = parseInt(oprice.innerText.replace(/[^0-9]/g, ""));

  updateModal(initialAmount, initialPrice);
  modalBox.classList.add("active");
}

// 모달 창 수량 증가
document.querySelector(".modal-add").addEventListener("click", function () {
  let amount = parseInt(modalAmount.value) || 1;
  let price = parseInt(osellPrice.value);
  amount++;
  updateModal(amount, amount * price);
});

// 모달 창 수량 감소
document.querySelector(".modal-minus").addEventListener("click", function () {
  let amount = parseInt(modalAmount.value) || 1;
  let price = parseInt(osellPrice.value);
  if (amount > 1) {
    amount--;
    updateModal(amount, amount * price);
  }
});

confirmBtn.addEventListener("click", function (event) {
  event.preventDefault();

  let finalAmount = parseInt(modalAmount.value) || 1;
  let finalPrice = parseInt(modalPrice.innerText.replace(/[^0-9]/g, ""));

  updateCart(finalAmount, finalPrice);

  modalBox.classList.remove("active");
});

cancelBtn.addEventListener("click", function () {
  modalBox.classList.remove("active");
});

// 장바구니리스트
let selectAllCheckbox = document.querySelector("#custom__box");
let productCheckboxes = document.querySelectorAll(".product .custom__checkbox");
const checkboxNum = productCheckboxes.length;
const productNum = document.querySelector("#item__count");

// 전체 체크 변경
if (selectAllCheckbox) {
  selectAllCheckbox.addEventListener("change", function () {
    let isChecked = selectAllCheckbox.checked;
    productCheckboxes.forEach(function (checkbox) {
      checkbox.checked = isChecked;

      if (selectAllCheckbox.checked) {
        productNum.innerText = `(${checkboxNum})`;
      } else {
        productNum.innerText = "";
      }
    });
  });
}

// 개별 체크박스 변경
productCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    let allChecked = true;

    productCheckboxes.forEach(function (checkbox) {
      if (!checkbox.checked) {
        allChecked = false;
      }
      if (checkbox.checked) {
        productNum.innerText = `(${checkboxNum})`;
      } else {
        productNum.innerText = "";
      }
    });

    selectAllCheckbox.checked = allChecked;
  });
});

// // 상품 삭제 후 빈 카트 이미지
// let deleteSelectedBtn = document.querySelector("button");
// let emptyCartMessage = document.querySelector(".empty__product");
// let productInfo = document.querySelector(".product__info");
// let productClose = document.querySelector(".product__close");
// const itemCount = document.querySelector(".item__count");

// // 툴바에 존재하는 선택삭제 버튼
// deleteSelectedBtn.addEventListener("click", function () {
//   productCheckboxes.forEach(function (checkbox) {
//     if (checkbox.checked) {
//       let cart = checkbox.closest(".product");
//       cart.remove();
//     }
//   });
//   checkIfCartIsEmpty();
// });

// // 삭제 표시
// if (productClose) {
//   productClose.addEventListener("click", function () {
//     let cart2 = productClose.closest(".product");
//     if (cart2) {
//       cart2.remove();
//     }
//     checkIfCartIsEmpty();
//   });
// }

// // 장바구니가 비어있는지
// function checkIfCartIsEmpty() {
//   let productItems = productInfo.querySelectorAll("ul.product");
//   if (productItems.length === 0) {
//     emptyCartMessage.style.display = "block";
//     productInfo.style.display = "none";
//     selectAllCheckbox.checked = false;
//   } else {
//     emptyCartMessage.style.display = "none";
//     productInfo.style.display = "block";
//   }
// }

// checkIfCartIsEmpty();
