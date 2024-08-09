//옵션변경 모달창

const optionSeclect = document.querySelector(".option");
const optionModal = document.querySelector(".modal__box");
const modalClose = document.querySelector(".modal__close-box");

optionSeclect.addEventListener("click", () => {
  optionModal.classList.add("active");
});

modalClose.addEventListener("click", () => {
  optionModal.classList.remove("active");
});

// 옵션 선택 시 -> 옵션창 내용 변경되어야한다.(모달창밖)
// 옵션 선택 시 -> 새로운 옵션창이 나와야한다.
// 수량 증가 및 감소 되어야한다.
// 옵션창 삭제 될 수 있어야한다.
// 새로운 변경 내용 발생 시, 옵션창 추가 되어야한다.

// 옵션 선택 시, 옵션창 내용 변경

// select box value 알아내기
// color, size 알아내기

//색상가져오기

const form = document.querySelector("form");
const productOption = document.querySelector(".product-info-option");
const userColor = document.querySelector("#color");
const userSize = document.querySelector("#size");

form.addEventListener("input", (e) => {});
