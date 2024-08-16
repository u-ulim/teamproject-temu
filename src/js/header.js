// product-list.html 파일을 로드하여 #product 안에 삽입
const headerLoad = () => {
  const productList = document.getElementById("header");
  fetch("../../html/components/header.html")
    .then((response) => response.text())
    .then((data) => {
      productList.innerHTML = data;
    })
    .catch((error) => console.error("Error loading header:", error));
};

headerLoad();
