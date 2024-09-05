// product-list.html 파일을 로드하여 #product 안에 삽입
const footerLoad = () => {
  const productList = document.getElementById("footer");
  fetch("../../html/components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      productList.innerHTML = data;
    })
    .catch((error) => console.error("Error loading footer:", error));
};

footerLoad();

// 모바일 버전에서 각각의 버튼을 눌렀을 때, 각각의 페이지로 넘어감

const homeBtn = document.querySelector(".footer-m__menu-home");
const categoryBtn = document.querySelector(".footer-m__menu-category");
const myBtn = document.querySelector(".footer-m__menu-my");
const cartBtn = document.querySelector(".footer-m__menu-cart");

homeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "index.html";
});

categoryBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "index.html";
});

myBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "index.html";
});

cartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "index.html";
});
