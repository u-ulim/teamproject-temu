const banner = document.querySelector(".banner");
const bannerClose = document.querySelector(".banner-close");

const optionSelect = document.querySelector(".option");
const optionModal = document.querySelector(".modal__box");
const modalClose = document.querySelector(".modal__close-box");

const addressBtn = document.querySelector(".addressbtn");
const addressModal = document.querySelector(".address__modal__box");
const addressClose = document.querySelector(".address__close-box");

const addressPlusBtn = document.querySelector("#plus-address");
const addressPlusModal = document.querySelector(".address__modal__box-plus");
const addressPlusClose = document.querySelector(".address__close-box-plus");
const addressBackBtn = document.querySelector(".address__back-box");

// 배너 삭제
if (bannerClose) {
  bannerClose.addEventListener("click", () => {
    banner.classList.toggle("active");
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

// 주소 변경 모달 창
if (addressBtn && addressModal && addressClose) {
  addressBtn.addEventListener("click", () => {
    addressModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  addressClose.addEventListener("click", () => {
    addressModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

// 주소 추가 모달 창
if (addressPlusBtn && addressPlusModal && addressPlusClose) {
  addressPlusBtn.addEventListener("click", () => {
    addressPlusModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  addressPlusClose.addEventListener("click", () => {
    addressPlusModal.classList.remove("active");
    addressModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

// 주소 추가 모달 창에서 뒤로 가기 버튼
if (addressBackBtn && addressPlusModal && addressModal) {
  addressBackBtn.addEventListener("click", () => {
    addressPlusModal.classList.remove("active");
    addressModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
}
