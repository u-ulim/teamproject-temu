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
