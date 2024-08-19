// 모달 수량창 변경 -> 가격변경 및 장바구니 동기화
const addMinus = document.querySelector(".modal__add-minus");
const sellPrice = document.querySelector(".modal__sell-price"); // 판매가격
const amount = document.querySelector(".modal-amount"); // 수량
const addBtn = document.querySelector(".modal-add"); // 더하기 버튼
const minusBtn = document.querySelector(".modal-minus"); // 마이너스 버튼
const price = document.querySelector("#modal-price"); // 모달창-옵션창-최종가격

// 장바구니 관련 요소 (장바구니에서 동일한 항목을 업데이트하기 위한 요소)
const cartAmount = document.querySelector(".cart-amount"); // 장바구니 수량
const cartPrice = document.querySelector(".cart-price"); // 장바구니 최종 가격

if (addMinus) {
  let amountVal = parseInt(amount.value) || 1;
  let sellVal = parseInt(sellPrice.value);
  let priceVal = amountVal * sellVal;

  // 초기 가격 설정
  price.innerText = `￦${priceVal}`;

  // 가격 업데이트 및 장바구니 동기화
  const updatePrice = () => {
    priceVal = amountVal * sellVal;
    price.innerText = `￦${priceVal}`;
    if (cartAmount && cartPrice) {
      cartAmount.innerText = amountVal;
      cartPrice.innerText = `￦${priceVal}`;
    }
  };

  // 수량 +
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      amountVal++;
      amount.value = amountVal;
      updatePrice();
    });
  }

  // 수량 -
  if (minusBtn) {
    minusBtn.addEventListener("click", () => {
      if (amountVal > 1) {
        amountVal--;
      } else {
        amountVal = 1;
      }
      amount.value = amountVal;
      updatePrice();
    });
  }
}

// 일반 수량창 변경 -> 가격변경 및 모달 창과 동기화
const oaddMinus = document.querySelector(".original__add-minus");
const osellPrice = document.querySelector(".original__sell-price"); // 판매가격
const oamount = document.querySelector(".original-amount"); // 수량
const oaddBtn = document.querySelector(".original-add"); // 더하기 버튼
const ominusBtn = document.querySelector(".original-minus"); // 마이너스 버튼
const oprice = document.querySelector("#original-price"); // 모달창-옵션창-최종가격

// 모달 창 관련 요소 (모달에서 동일한 항목을 업데이트하기 위한 요소)
const modalAmount = document.querySelector(".modal-amount"); // 모달창 수량
const modalPrice = document.querySelector("#modal-price"); // 모달창 가격

if (oaddMinus) {
  let oamountVal = parseInt(oamount.value) || 1;
  let osellVal = parseInt(osellPrice.value);
  let opriceVal = oamountVal * osellVal;

  // 초기 가격 설정
  oprice.innerText = `￦${opriceVal}`;

  // 가격 업데이트 및 모달 창 동기화
  const updatePrice = () => {
    opriceVal = oamountVal * osellVal;
    oprice.innerText = `￦${opriceVal}`;
    if (modalAmount && modalPrice) {
      modalAmount.value = oamountVal;
      modalPrice.innerText = `￦${opriceVal}`;
    }
  };

  // 수량 +``
  if (oaddBtn) {
    oaddBtn.addEventListener("click", () => {
      oamountVal++;
      oamount.value = oamountVal;
      updatePrice();
    });
  }

  // 수량 -
  if (ominusBtn) {
    ominusBtn.addEventListener("click", () => {
      if (oamountVal > 1) {
        oamountVal--;
      } else {
        oamountVal = 1;
      }
      oamount.value = oamountVal;
      updatePrice();
    });
  }
}
``````;
