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
