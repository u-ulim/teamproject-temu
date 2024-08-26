const banner = document.querySelector(".banner");
const bannerClose = document.querySelector(".banner-close");

const optionSelect = document.querySelector(".option");
const optionModal = document.querySelector(".modal__box");
const modalClose = document.querySelector(".modal__close-box");

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
