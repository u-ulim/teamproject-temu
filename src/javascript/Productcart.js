//배너 삭제

const banner = document.querySelector(".banner");
const bannerClose = document.querySelector(".banner-close");

bannerClose.addEventListener("click", () => {
  banner.classList.toggle("active");
});

//옵션변경 시, 모달창 이벤트

const optionSeclect = document.querySelector(".option");
const optionModal = document.querySelector(".modal__box");
const modalClose = document.querySelector(".modal__close-box");

optionSeclect.addEventListener("click", () => {
  optionModal.classList.add("active");
});

modalClose.addEventListener("click", () => {
  optionModal.classList.remove("active");
});

// 모달 수량창 변경 -> 가격변경

const addMinus = document.querySelector(".modal__add-minus");
const sellPrice = document.querySelector(".modal__sell-price"); // 판매가격
const amount = document.querySelector(".modal-amount"); // 수량
const addBtn = document.querySelector(".modal-add"); // 더하기 버튼
const minusBtn = document.querySelector(".modal-minus"); // 마이너스 버튼
const price = document.querySelector("#modal-price"); // 모달창-옵션창-최종가격

// form class가 .modal__add-minus일 때, 변경됨
if (addMinus) {
  let amountVal = amount.value || 1;
  let sellVal = sellPrice.value;
  let priceVal = amountVal * sellVal;

  // 초기 가격 설정
  price.innerText = priceVal;

  // 가격 업데이트
  const updatePrice = () => {
    priceVal = amountVal * sellVal;
    price.innerText = `￦${priceVal}`;
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

// 일반 수량창 변경 -> 가격변경

const oaddMinus = document.querySelector(".original__add-minus");
const osellPrice = document.querySelector(".original__sell-price"); // 판매가격
const oamount = document.querySelector(".original-amount"); // 수량
const oaddBtn = document.querySelector(".original-add"); // 더하기 버튼
const ominusBtn = document.querySelector(".original-minus"); // 마이너스 버튼
const oprice = document.querySelector("#original-price"); // 모달창-옵션창-최종가격

if (oaddMinus) {
  let oamountVal = oamount.value || 1;
  let osellVal = osellPrice.value;
  let opriceVal = oamountVal * osellVal;

  // 초기 가격 설정
  oprice.innerText = opriceVal;

  // 가격 업데이트
  const updatePrice = () => {
    opriceVal = oamountVal * osellVal;
    oprice.innerText = `￦${opriceVal}`;
  };

  // 수량 +
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
