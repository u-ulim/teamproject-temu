let getCartProducts = JSON.parse(localStorage.getItem("setCartProducts")) || [];
let addressList = JSON.parse(localStorage.getItem("userAddresses")) || [];

// 쿠폰 및 크레딧 변수 선언
let totalCouponValue = 0; // 쿠폰 사용 금액
let usedCreditValue = 0; // 사용된 크레딧 금액
const totalCredit = 20000; // 보유 크레딧 양을 20,000원으로 설정

// 변수 선언
const bannerClose = document.querySelector(".banner-close");
const form = document.querySelector("#address-form");
const userInfo = document.querySelector(".user__info");
const siSelect = document.querySelector("#trial");
const guKunselect = document.querySelector("#city");
const addressBtn = document.querySelector(".addressbtn");
const addressClose = document.querySelector(".address__close-box");
const addressPlusBtn = document.querySelector("#plus-address");
const addressPlusClose = document.querySelector(".address__close-box-plus");
const addressBackBtn = document.querySelector(".address__back-box");
const zipcodeInput = document.querySelector("#zipcode");
const customsNumberInput = document.querySelector("#customs-number");
const nameInput = document.querySelector("#name");
const phoneNumberInput = document.querySelector("#phone-number");
const detailedAddressInput = document.querySelector("#detailed-address");
const infoDown = document.querySelector(".info__down");
const addressFirstBtn = document.querySelector(".address-plus");
const productInfo = document.querySelector("#product__info-All ul");

let editingItem = null;

// 배너 삭제
if (bannerClose) {
  bannerClose.addEventListener("click", () => {
    const banner = document.querySelector(".banner");
    if (banner) banner.classList.add("active");
  });
}

// 시/도와 시/군/구 선택 기능
const si = [
  { name: "seoul", Kname: "서울특별시" },
  { name: "busan", Kname: "부산광역시" },
  { name: "daegu", Kname: "대구광역시" },
  { name: "incheon", Kname: "인천광역시" },
  { name: "gwangju", Kname: "광주광역시" },
  { name: "daejeon", Kname: "대전광역시" },
  { name: "ulsan", Kname: "울산광역시" },
  { name: "gyeonggi", Kname: "경기도" },
  { name: "gangwon", Kname: "강원특별자치도" },
  { name: "jeollabukdo", Kname: "전북특별자치도" },
  { name: "jeollanamdo", Kname: "전라남도" },
  { name: "chungcheongbukdo", Kname: "충청북도" },
  { name: "chungcheongnamdo", Kname: "충청남도" },
  { name: "jeju", Kname: "제주도" },
];

const guKun = {
  seoul: [
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ],
  busan: [
    "강서구",
    "기장군",
    "남구",
    "동구",
    "동래구",
    "부산진구",
    "북구",
    "사상구",
    "사하구",
    "서구",
    "서면구",
    "수영구",
    "연제구",
    "영도구",
    "중구",
    "해운대구",
  ],
  daegu: ["남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"],
  incheon: [
    "강화군",
    "옹진군",
    "계양구",
    "남구",
    "동구",
    "미추홀구",
    "부평구",
    "서구",
    "송도구",
    "연수구",
    "중구",
  ],
  gwangju: ["광산구", "남구", "북구", "서구", "동구"],
  daejeon: ["대덕구", "동구", "서구", "유성구", "중구"],
  ulsan: ["남구", "동구", "북구", "중구", "울주군", "울산광역시"],
  gyeonggi: [
    "고양시",
    "과천시",
    "광명시",
    "광주시",
    "구리시",
    "군포시",
    "김포시",
    "남양주시",
    "동두천시",
    "부천시",
    "성남시",
    "수원시",
    "시흥시",
    "안산시",
    "안성시",
    "안양시",
    "양주시",
    "양평군",
    "여주시",
    "오산시",
    "용인시",
    "의왕시",
    "의정부시",
    "이천시",
    "파주시",
    "평택시",
    "포천시",
    "하남시",
    "화성시",
    "가평군",
    "양평군",
    "여주군",
    "연천군",
    "포천군",
  ],
  gangwon: [
    "강릉시",
    "고성군",
    "동해시",
    "삼척시",
    "속초시",
    "원주시",
    "정선군",
    "철원군",
    "춘천시",
    "태백시",
    "평창군",
    "홍천군",
    "화천군",
    "횡성군",
  ],
  jeollabukdo: [
    "군산시",
    "김제시",
    "남원시",
    "전주시",
    "정읍시",
    "익산시",
    "고창군",
    "무주군",
    "부안군",
    "순창군",
    "임실군",
    "진안군",
  ],
  jeollanamdo: [
    "목포시",
    "나주시",
    "여수시",
    "순천시",
    "광양시",
    "강진군",
    "고흥군",
    "곡성군",
    "구례군",
    "담양군",
    "장성군",
    "장흥군",
    "진도군",
    "해남군",
    "화순군",
  ],
  chungcheongbukdo: [
    "제천시",
    "청주시",
    "충주시",
    "괴산군",
    "단양군",
    "보은군",
    "옥천군",
    "영동군",
    "영죽군",
    "음성군",
    "진천군",
  ],
  chungcheongnamdo: [
    "금산군",
    "부여군",
    "서천군",
    "연기군",
    "예산군",
    "청양군",
    "태안군",
  ],
  jeju: ["제주시", "서귀포시"],
};

// 시/도 옵션 생성
si.forEach((area) => {
  const siOption = document.createElement("option");
  siOption.value = area.name;
  siOption.innerText = area.Kname;
  siSelect.appendChild(siOption);
});

// 시/도 변경 시 시/군/구 옵션 업데이트
siSelect.addEventListener("change", function () {
  const siSelected = this.value;
  guKunselect.innerHTML = "<option selected disabled>시/군/구</option>";
  if (guKun[siSelected]) {
    guKun[siSelected].forEach((gu) => {
      const guKunOption = document.createElement("option");
      guKunOption.value = gu;
      guKunOption.innerText = gu;
      guKunselect.appendChild(guKunOption);
    });
  }
});

// 주소 추가 모달창 시, 주소 내용 추가
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const zipcode = zipcodeInput.value;
  const customsNumber = customsNumberInput.value;
  const name = nameInput.value;
  const phoneNumber = phoneNumberInput.value;
  const siSelected = siSelect.value;
  const guKunSelected = guKunselect.value;
  const optionAddress = detailedAddressInput.value;

  if (
    zipcode === "" ||
    customsNumber === "" ||
    name === "" ||
    phoneNumber === "" ||
    siSelected === "" ||
    guKunSelected === ""
  ) {
    alert("빈칸이 있습니다. 확인해주세요");
    return;
  }

  const selectedSiText = siSelect.options[siSelect.selectedIndex].innerText;
  const selectedGuKunText =
    guKunselect.options[guKunselect.selectedIndex].innerText;

  const newIndex = addressList.length;

  const newListItemHTML = `
    <li>
      <span class="username">${name}</span>
      <span class="usernumber"><span>+82</span> ${phoneNumber}</span>
    </li>
    <li>
      <span class="zipcode">${zipcode}</span>
      <span class="useraddress">대한민국 ${selectedSiText} ${selectedGuKunText}</span>
    </li>
    <li>
      <span class="useraddress-option">${optionAddress}</span>
    </li>
    <li>
      <div>
        <label for="useraddress__radio"></label>
        <input type="radio" name="useraddress__radio" id="useraddress__radio" data-index="${newIndex}" />
        <span>기본주소</span>
      </div>
      <div>
        <span class="edit"><i class="fa-regular fa-pen-to-square"></i>편집</span>
        <span class="delete"><i class="fa-regular fa-trash-can"></i>삭제</span>
      </div>
    </li>
  `;

  if (editingItem) {
    editingItem.innerHTML = newListItemHTML;
    editingItem = null;
  } else {
    const newListItem = document.createElement("ul");
    newListItem.innerHTML = newListItemHTML;
    userInfo.appendChild(newListItem);
    addressList.push({
      name,
      phoneNumber,
      zipcode,
      siSelected,
      guKunSelected,
      optionAddress,
    });
    localStorage.setItem("userAddresses", JSON.stringify(addressList));
  }

  userInfo.style.display = "block";
  toggleAddressModal("plus", false);
  toggleAddressModal("main", true);

  form.reset(); // 폼 리셋

  // 주소 업데이트 후, 주소가 없을 때 빈 메시지 표시
  updateAddressInfoDisplay();
});

// 주소 항목 삭제 및 편집
userInfo.addEventListener("click", function (e) {
  if (e.target.closest(".delete")) {
    const listItem = e.target.closest("ul");
    const index = parseInt(
      listItem.querySelector('input[type="radio"]').dataset.index
    );
    addressList.splice(index, 1);
    localStorage.setItem("userAddresses", JSON.stringify(addressList));
    listItem.remove();

    if (userInfo.children.length === 0) {
      userInfo.style.display = "none";
    }

    // 주소 업데이트 후, 주소가 없을 때 빈 메시지 표시
    updateAddressInfoDisplay();
  }

  if (e.target.closest(".edit")) {
    const listItem = e.target.closest("ul");
    const index = parseInt(
      listItem.querySelector('input[type="radio"]').dataset.index
    );
    const address = addressList[index];

    nameInput.value = address.name;
    phoneNumberInput.value = address.phoneNumber;
    zipcodeInput.value = address.zipcode;
    detailedAddressInput.value = address.optionAddress;
    siSelect.value = address.siSelected;
    guKunselect.value = address.guKunSelected;

    toggleAddressModal("plus", true);
    editingItem = listItem;
  }
});

// 기본 주소로 설정한 항목 로컬 스토리지에 저장
userInfo.addEventListener("change", function (e) {
  if (e.target.id === "useraddress__radio") {
    const index = parseInt(e.target.dataset.index);
    localStorage.setItem("defaultAddressIndex", index);
    updateInfoDown(addressList[index]);
  }
});

// 주소 업데이트 상태 확인 및 빈 메시지 표시
function updateAddressInfoDisplay() {
  const addressEmptyMessage = document.querySelector(".info__down-empty");

  if (addressList.length === 0) {
    addressEmptyMessage.style.display = "block"; // 주소가 없을 때만 메시지 표시
    infoDown.style.display = "none";
    if (addressBtn) {
      addressBtn.disabled = true; // 주소 변경 버튼 비활성화
    }
  } else {
    addressEmptyMessage.style.display = "none"; // 주소가 있으면 메시지 숨김
    infoDown.style.display = "block";
    if (addressBtn) {
      addressBtn.disabled = false; // 주소 변경 버튼 활성화
    }
  }
}

// 기본 주소를 info__down에 업데이트
function updateInfoDown(address) {
  if (!address) return;

  const infoDownHTML = `
    <ul>
      <li>
        <span>${address.name}</span>
        <span>+82 ${address.phoneNumber}</span>
      </li>
      <li>${address.zipcode}  대한민국 ${address.siSelected} ${address.guKunSelected}</li>
      <li>${address.optionAddress}</li>
    </ul>
  `;

  if (infoDown) {
    infoDown.innerHTML = infoDownHTML;
  }
  toggleAddressModal("main", false);
}

//  주소 정보 표시
function loadAddresses() {
  if (addressList.length > 0) {
    addressList.forEach((address, index) => {
      const selectedSiText = si.find(
        (s) => s.name === address.siSelected
      ).Kname;
      const selectedGuKunText = address.guKunSelected;

      const newListItemHTML = `
        <li>
          <span class="username">${address.name}</span>
          <span class="usernumber"><span>+82</span> ${address.phoneNumber}</span>
        </li>
        <li>
          <span class="zipcode">${address.zipcode}</span>
          <span class="useraddress">대한민국 ${selectedSiText} ${selectedGuKunText}</span>
        </li>
        <li>
          <span class="useraddress-option">${address.optionAddress}</span>
        </li>
        <li>
          <div>
            <label for="useraddress__radio"></label>
            <input type="radio" name="useraddress__radio" id="useraddress__radio" data-index="${index}"/>
            <span>기본주소</span>
          </div>
          <div>
            <span class="edit"><i class="fa-regular fa-pen-to-square"></i>편집</span>
            <span class="delete"><i class="fa-regular fa-trash-can"></i>삭제</span>
          </div>
        </li>
      `;
      const newListItem = document.createElement("ul");
      newListItem.innerHTML = newListItemHTML;
      userInfo.appendChild(newListItem);
    });

    const defaultIndex = localStorage.getItem("defaultAddressIndex");
    if (defaultIndex !== null && addressList[defaultIndex]) {
      updateInfoDown(addressList[defaultIndex]);
      userInfo.querySelector(
        `input[data-index="${defaultIndex}"]`
      ).checked = true;
    }
    userInfo.style.display = "block";
  } else {
    updateAddressInfoDisplay();
  }
}

// 주문상품내역, 갯수표기 및 장바구니 렌더링
function renderCartItems() {
  productInfo.innerHTML = "";

  let totalAmount = 0;

  getCartProducts.forEach((product) => {
    const {
      img,
      title,
      selectColor,
      selectSize,
      quan,
      sumPrice,
      discountingPrice,
    } = product;

    const discountedTotalPrice = discountingPrice * quan;
    const discountAmount = (sumPrice - discountingPrice) * quan;

    totalAmount = discountAmount - discountedTotalPrice;

    const productInfoHTML = `
      <li class="product">
        <div class="img">
          <div>
            <img src="${img}" alt="${title}" />
          </div>
        </div>
        <div class="product__info">
          <div class="product__title">
            <span>${title}</span>
            <span>(${quan})</span>
          </div>
          <div class="product__option">
            <span>${selectColor}</span>
            <span>|</span>
            <span>${selectSize}</span>
          </div>
          <div class="price__info">
            <span class="general-price">￦${discountAmount.toLocaleString()}</span>
            <span>￦${discountedTotalPrice.toLocaleString()}</span>
          </div>
        </div>
      </li>
    `;

    productInfo.insertAdjacentHTML("beforeend", productInfoHTML);
  });

  // 총 상품 금액
  const totalFeePrice = document.querySelector(".total__fee .price");
  if (totalFeePrice) {
    totalFeePrice.innerText = `￦${totalAmount.toLocaleString()}`;
  }

  // 최종 결제 금액 업데이트
  updateFinalPrice();
}

const productInfoLength = getCartProducts.length;
const result = document.querySelector(".order__title h3 span");
const resultAll = document.querySelector(".order__title h3");

if (productInfoLength !== 0) {
  result.innerText = `${productInfoLength}`;
} else {
  resultAll.style.display = "none";
  result.style.display = "none";
}

const orderTitle = document.querySelector(".order__title");

productInfo.classList.remove("active");
productInfo.style.display = "none";

orderTitle.addEventListener("click", () => {
  const isActive = productInfo.classList.toggle("active");
  productInfo.style.display = isActive ? "block" : "none";
  orderTitle.classList.toggle("active", isActive);
});

// 모달 이벤트
function toggleAddressModal(type, show) {
  const modalType =
    type === "plus" ? ".address__modal__box-plus" : ".address__modal__box";
  const modal = document.querySelector(modalType);

  if (modal) {
    modal.classList.toggle("active", show);
    document.body.style.overflow = show ? "hidden" : "auto";
  }
}

function addModalEventListeners() {
  if (addressBtn) {
    addressBtn.addEventListener("click", () =>
      toggleAddressModal("main", true)
    );
  }

  if (addressClose) {
    addressClose.addEventListener("click", () =>
      toggleAddressModal("main", false)
    );
  }

  if (addressPlusBtn) {
    addressPlusBtn.addEventListener("click", () =>
      toggleAddressModal("plus", true)
    );
  }

  if (addressPlusClose) {
    addressPlusClose.addEventListener("click", () => {
      toggleAddressModal("plus", false);
      toggleAddressModal("main", false);
    });
  }

  if (addressBackBtn) {
    addressBackBtn.addEventListener("click", () => {
      toggleAddressModal("plus", false);
      toggleAddressModal("main", true);
    });
  }

  if (addressFirstBtn) {
    addressFirstBtn.addEventListener("click", () => {
      toggleAddressModal("plus", true);
    });
  }
}

// 숫자만, 한국어만 입력 가능하도록 제어
phoneNumberInput.addEventListener("keydown", onlyNumber);
zipcodeInput.addEventListener("keydown", onlyNumber);
nameInput.addEventListener("keydown", onlyKorean);
customsNumberInput.addEventListener("keydown", allowCustomer);

function onlyNumber(e) {
  const key = e.key;
  if (
    isNaN(key) &&
    ![
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ].includes(key)
  ) {
    e.preventDefault();
    alert("숫자를 적어주세요");
  }
}

function onlyKorean(e) {
  const key = e.key;
  if (
    !isNaN(key) &&
    ![
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ].includes(key)
  ) {
    e.preventDefault();
    alert("한글로 적어주세요");
  }
}

function allowCustomer(e) {
  const key = e.key;
  const userKey = e.target.value;

  if (userKey.length === 0 && key.toLowerCase() !== "p") {
    e.preventDefault();
    alert("첫 글자는 P 또는 p를 적어주세요.");
  } else if (
    isNaN(key) &&
    ![
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ].includes(key)
  ) {
    e.preventDefault();
    alert("두 번째 글자부터는 숫자만 입력할 수 있습니다.");
  }
}

// 쿠폰
function setupCouponOptions() {
  const couponSelect = document.querySelector("#coupon");

  // 기존 쿠폰 옵션 제거
  couponSelect.innerHTML = "";

  // 기본 옵션 추가
  const defaultOption = document.createElement("option");
  defaultOption.innerText = "쿠폰을 선택하세요";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  couponSelect.appendChild(defaultOption);

  // 새로운 쿠폰 목록
  const coupons = [
    { name: "가을 맞이 5% 할인 쿠폰", discount: 0.05 },
    { name: "추석 특별 7% 할인 쿠폰", discount: 0.07 },
    { name: "환절기 준비 10% 할인 쿠폰", discount: 0.1 },
  ];

  // 쿠폰 옵션 생성
  coupons.forEach((coupon) => {
    const option = document.createElement("option");
    option.value = coupon.discount;
    option.innerText = coupon.name;
    couponSelect.appendChild(option);
  });

  // 쿠폰 선택 시 할인 금액 계산 및 표시
  couponSelect.addEventListener("change", function () {
    const discountRate = parseFloat(couponSelect.value);
    const totalProductPriceText =
      document.querySelector(".total__fee .price").innerText;
    const totalProductPrice = parseInt(
      totalProductPriceText.replace(/[^0-9]/g, ""),
      10
    );

    let discountAmount = 0;
    if (!isNaN(discountRate) && !isNaN(totalProductPrice)) {
      discountAmount = totalProductPrice * discountRate;
    }

    // 쿠폰 할인 금액 표시
    document.querySelector(
      ".coupon__fee-last"
    ).innerText = `- ₩${discountAmount.toLocaleString()}`;

    // 최종 결제 금액 업데이트
    updateFinalPrice();
  });

  // 초기 쿠폰 할인 금액을 0으로 설정
  document.querySelector(".coupon__fee-last").innerText = `₩ 0`;
}

// 크레딧

function setupCreditListener() {
  const creditInput = document.querySelector("#used__credit__box");
  const creditFeeElement = document.querySelector(".credit__fee-last");

  creditInput.readOnly = true;

  creditInput.value = "₩ 0";
  creditFeeElement.innerText = "₩ 0";

  const fullCreditButton = document.querySelector(".used__credit button");

  fullCreditButton.addEventListener("click", function (event) {
    event.preventDefault();
    const formattedCredit = `- ₩${totalCredit.toLocaleString()}`;
    creditInput.value = formattedCredit;
    creditFeeElement.innerText = formattedCredit;
    updateFinalPrice();
  });

  creditInput.addEventListener("focusout", function () {
    creditInput.value = creditInput.value || `₩ 0`;
  });
}

// 최종 결제 금액 업데이트 함수
function updateFinalPrice() {
  const totalFeePriceElement = document.querySelector(".total__fee .price");
  const couponFeeElement = document.querySelector(".coupon__fee-last");
  const creditFeeElement = document.querySelector(".credit__fee-last");
  const summaryPriceElement = document.querySelector(".summary__price-total");

  const totalProductPrice = parseInt(
    totalFeePriceElement.innerText.replace(/[^0-9]/g, ""),
    10
  );

  let lastPriceAll = totalProductPrice;

  if (couponFeeElement) {
    const couponFee =
      parseInt(couponFeeElement.innerText.replace(/[^0-9]/g, ""), 10) || 0;
    lastPriceAll -= couponFee;
  }

  if (creditFeeElement) {
    const creditFee =
      parseInt(creditFeeElement.innerText.replace(/[^0-9]/g, ""), 10) || 0;
    lastPriceAll -= creditFee;
  }

  summaryPriceElement.innerText = `₩${lastPriceAll.toLocaleString()}`;
}

//결제창 동의서 - 아코디언
const consentBtns = document.querySelectorAll(".consent-title");
consentBtns.forEach((consentBtn) => {
  consentBtn.addEventListener("click", () => {
    document.querySelectorAll(".consent-content").forEach((content) => {
      content.style.display = "none";
    });

    consentBtns.forEach((otherBtn) => {
      if (otherBtn !== consentBtn) {
        otherBtn.classList.remove("active");
      }
    });

    let content = consentBtn.nextElementSibling;

    if (consentBtn.classList.contains("active")) {
      consentBtn.classList.remove("active");
    } else {
      consentBtn.classList.add("active");
      content.style.display = "block";
    }
  });
});

// 체크박스 동의 및 결제 버튼 활성화
function setupCheckboxListeners() {
  const agreeAll = document.querySelector("#agreeAll");
  const checkboxes = document.querySelectorAll(
    '.consent__list input[type="checkbox"]:not(#agreeAll, #treePlanting)'
  );
  const radioButtons = document.querySelectorAll('input[name="radio"]');
  const checkoutButton = document.querySelector(".checkout__button");

  function toggleCheckoutButton() {
    const allCheckboxChecked = Array.from(checkboxes).every(
      (checkbox) => checkbox.checked
    );
    const radioChecked = Array.from(radioButtons).some(
      (radio) => radio.checked
    );

    checkoutButton.disabled = !(allCheckboxChecked && radioChecked);
  }

  if (agreeAll) {
    agreeAll.addEventListener("change", function () {
      const isChecked = agreeAll.checked;
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = isChecked;
      });
      toggleCheckoutButton();
    });
  }

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", toggleCheckoutButton);
  });

  radioButtons.forEach(function (radio) {
    radio.addEventListener("change", toggleCheckoutButton);
  });

  checkoutButton.addEventListener("click", function () {
    if (!checkoutButton.disabled) {
      window.location.href =
        "http://127.0.0.1:5501/html/components/Ordercompleted.html";
    }
  });

  toggleCheckoutButton();
}

addModalEventListeners();
renderCartItems();
loadAddresses();
setupCouponOptions();
setupCreditListener();
setupCheckboxListeners();
updateFinalPrice();
