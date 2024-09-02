// product-list.html 파일을 로드하여 #product 안에 삽입
const productListLoad = () => {
  const productList = document.getElementById("product-list");
  fetch("../../html/components/product-list.html")
    .then((response) => response.text())
    .then((data) => {
      productList.innerHTML = data;
      console.log(data);
    })
    .catch((error) => console.error("Error loading header:", error));
};

productListLoad();

console.log(createDetail)