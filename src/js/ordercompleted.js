let getCartProducts = JSON.parse(localStorage.getItem("setCartProducts")) || [];
let addressList = JSON.parse(localStorage.getItem("defaultAddress")) || null;
const productInfo = document.querySelector(".shopping__info");
const addressInfo = document.querySelector(".info__down");

// 현재 날짜 & 배송날짜
const today = new Date();
const startDate = new Date(today);
startDate.setDate(today.getDate() + 1);
const endDate = new Date(today);
endDate.setDate(today.getDate() + 10);

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${month}월 ${day}일`;
};

const deliveryStart = formatDate(startDate);
const deliveryEnd = formatDate(endDate);

// 상품리스트
if (getCartProducts.length > 0) {
  let createProduct = `
    <ul>
      <li>
        <a href="#none">
          <img src="${getCartProducts[0].img}" alt="${getCartProducts[0].title}" />
        </a>
        <div>
          <span>주문상품 (${getCartProducts.length}건)</span>
          <span>배송날짜 ${deliveryStart} - ${deliveryEnd}</span>
        </div>
      </li>
      <li>
        <button>주문 / 배송</button>
      </li>
    </ul>
  `;
  productInfo.innerHTML = createProduct;
}

// 주소리스트
if (addressList) {
  let createAddress = `
    <ul>
      <li>${addressList.name}</li>
      <li>82+ ${addressList.phoneNumber}</li>
      <li>${addressList.zipcode} 대한민국 ${addressList.siSelected} ${addressList.guKunSelected} ${addressList.optionAddress}</li>
    </ul>
  `;
  addressInfo.innerHTML = createAddress;
}
