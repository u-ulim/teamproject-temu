// 배너 삭제
const banner = document.querySelector(".banner");
const bannerClose = document.querySelector(".banner-close");

bannerClose.addEventListener("click", () => {
  banner.classList.toggle("active");
});

// 옵션 변경 시 모달 창

const optionSeclect = document.querySelector(".option");
const optionModal = document.querySelector(".modal__box");
const modalClose = document.querySelector(".modal__close-box");

if (optionSeclect && optionModal && modalClose) {
  optionSeclect.addEventListener("click", () => {
    optionModal.classList.add("active");
  });

  modalClose.addEventListener("click", () => {
    optionModal.classList.remove("active");
  });
}

// 주소 변경 모달 창
const addressBtn = document.querySelector(".addressbtn");
const addressModal = document.querySelector(".address__modal__box");
const addressClose = document.querySelector(".address__close-box");

if (addressBtn && addressModal && addressClose) {
  addressBtn.addEventListener("click", () => {
    addressModal.classList.add("active");
  });

  addressClose.addEventListener("click", () => {
    addressModal.classList.remove("active");
  });
}

// 주소 추가 모달 창
const addressPlusBtn = document.querySelector("#plus-address");
const addressPlusModal = document.querySelector(".address__modal__box-plus");
const addressPlusClose = document.querySelector(".address__close-box-plus");
const addressBackBtn = document.querySelector(".address__back-box");

addressPlusBtn.addEventListener("click", () => {
  addressPlusModal.classList.add("active");
});

addressPlusClose.addEventListener("click", () => {
  addressPlusModal.classList.remove("active");
  addressModal.classList.remove("active");
});

addressBackBtn.addEventListener("click", () => {
  addressPlusModal.classList.remove("active");
  addressModal.classList.add("active");
});
