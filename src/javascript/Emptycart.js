//배너 삭제

const banner = document.querySelector(".banner");
const bannerClose = document.querySelector(".banner-close");

bannerClose.addEventListener("click", () => {
  banner.classList.toggle("active");
});
