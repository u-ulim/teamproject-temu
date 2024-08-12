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

const jaddMinus = document.querySelector(".jeneral__add-minus");
const jsellPrice = document.querySelector(".jeneral__sell-price"); // 판매가격
const jamount = document.querySelector(".jeneral-amount"); // 수량
const jaddBtn = document.querySelector(".jeneral-add"); // 더하기 버튼
const jminusBtn = document.querySelector(".jeneral-minus"); // 마이너스 버튼
const jprice = document.querySelector("#jeneral-price"); // 모달창-옵션창-최종가격

// form class가 .jeneral__add-minus일 때, 변경됨

if (jaddMinus) {
  let jamountVal = jamount.value || 1;
  let jsellVal = jsellPrice.value;
  let jpriceVal = jamountVal * jsellVal;

  // 초기 가격 설정
  jprice.innerText = jpriceVal;

  // 가격 업데이트
  const updatePrice = () => {
    jpriceVal = jamountVal * jsellVal;
    jprice.innerText = `￦${jpriceVal}`;
  };

  // 수량 +
  if (jaddBtn) {
    jaddBtn.addEventListener("click", () => {
      jamountVal++;
      jamount.value = jamountVal;
      updatePrice();
    });
  }

  // 수량 -
  if (jminusBtn) {
    jminusBtn.addEventListener("click", () => {
      if (jamountVal > 1) {
        jamountVal--;
      } else {
        jamountVal = 1;
      }
      jamount.value = jamountVal;
      updatePrice();
    });
  }
}

//주소 변경 모달 창

const addressBtn = document.querySelector(".addressbtn");
const addressModal = document.querySelector(".address__modal__box");
const addressClose = document.querySelector(".address__close-box");

addressBtn.addEventListener("click", () => {
  addressModal.classList.add("active");
});

addressClose.addEventListener("click", () => {
  addressModal.classList.remove("active");
});

// 주소 변경 모달 창 -> 주소 추가 모달 창
