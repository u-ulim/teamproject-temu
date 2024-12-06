let getCartProducts = JSON.parse(localStorage.getItem("setCartProducts")) || [];
let addressList = JSON.parse(localStorage.getItem("userAddresses")) || [];

// 쿠폰 및 크레딧 변수 선언
let totalCouponValue = 0; // 쿠폰 사용 금액
let usedCreditValue = 0; // 사용된 크레딧 금액
const totalCredit = 20000; // 보유 크레딧 20,000원
let editingIndex = null;

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
const emptyAddressMessage = document.querySelector(".info__down-empty");

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
  guKunselect.innerHTML = "<option selected disabled>시/군/구</option>"; // 초기화
  if (guKun[siSelected]) {
    guKun[siSelected].forEach((gu) => {
      const guKunOption = document.createElement("option");
      guKunOption.value = gu;
      guKunOption.innerText = gu;
      guKunselect.appendChild(guKunOption);
    });
  }
});

// 주소 추가 및 수정
// 주소 추가 및 수정
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const zipcode = zipcodeInput.value;
  const customsNumber = customsNumberInput.value;
  const name = nameInput.value;
  const phoneNumber = phoneNumberInput.value;
  const siSelectedValue = siSelect.value;
  const guKunSelected = guKunselect.value;
  const optionAddress = detailedAddressInput.value;

  // 유효성 검사
  const phoneNumberPattern = /^\d{10,11}$/;
  if (!phoneNumberPattern.test(phoneNumber)) {
    alert("전화번호는 10자리 또는 11자리 숫자여야 합니다.");
    return;
  }

  if (
    !zipcode ||
    !customsNumber ||
    !name ||
    !phoneNumber ||
    !siSelectedValue ||
    !guKunSelected
  ) {
    alert("빈칸이 있습니다. 확인해주세요.");
    return;
  }

  const selectedSiKname =
    si.find((s) => s.name === siSelectedValue)?.Kname || "";

  const updatedAddress = {
    name,
    phoneNumber,
    zipcode,
    siSelected: siSelectedValue,
    siKname: selectedSiKname,
    guKunSelected,
    optionAddress,
  };

  if (editingIndex !== null) {
    // 편집 모드: 기존 항목 업데이트
    addressList[editingIndex] = updatedAddress;

    // 기본 주소와 편집된 주소가 동일하면 기본 주소도 업데이트
    const defaultAddress = JSON.parse(localStorage.getItem("defaultAddress"));
    if (
      defaultAddress &&
      JSON.stringify(addressList[editingIndex]) ===
        JSON.stringify(defaultAddress)
    ) {
      localStorage.setItem("defaultAddress", JSON.stringify(updatedAddress));
    }

    // UI 업데이트 (편집된 항목만 갱신)
    if (editingItem) {
      editingItem.innerHTML = `
        <li>
          <span class="username">${name}</span>
          <span class="usernumber"><span>+82</span> ${phoneNumber}</span>
        </li>
        <li>
          <span class="zipcode">${zipcode}</span>
          <span class="useraddress">대한민국 ${selectedSiKname} ${guKunSelected}</span>
        </li>
        <li>
          <span class="useraddress-option">${optionAddress}</span>
        </li>
        <li>
          <div>
            <input type="radio" name="useraddress__radio" id="useraddress__radio_${editingIndex}" data-index="${editingIndex}" ${
        defaultAddress &&
        JSON.stringify(defaultAddress) === JSON.stringify(updatedAddress)
          ? "checked"
          : ""
      } />
            <label for="useraddress__radio_${editingIndex}">기본주소</label>
          </div>
          <div>
            <span class="edit"><i class="fa-regular fa-pen-to-square"></i>편집</span>
            <span class="delete"><i class="fa-regular fa-trash-can"></i>삭제</span>
          </div>
        </li>
      `;
    }

    editingIndex = null; // 편집 상태 초기화
    editingItem = null; // UI 참조 초기화
  } else {
    // 새 주소 추가
    addressList.push(updatedAddress);
    localStorage.setItem("userAddresses", JSON.stringify(addressList));
    loadAddresses(); // 전체 UI 재로드
  }

  // 기본 주소 설정 모달 조건부 호출
  const defaultAddress = JSON.parse(localStorage.getItem("defaultAddress"));
  if (!defaultAddress) {
    localStorage.setItem("defaultAddress", JSON.stringify(addressList[0]));
    updateAddressInfoDisplay();
  }

  toggleAddressModal("plus", false); // 입력 모달 닫기
  form.reset();
});

// 편집 버튼 클릭

// 편집 버튼 클릭
userInfo.addEventListener("click", function (e) {
  if (e.target.closest(".edit")) {
    const listItem = e.target.closest("ul");
    const index = parseInt(
      listItem.querySelector('input[type="radio"]').dataset.index,
      10
    );

    if (isNaN(index) || index < 0 || index >= addressList.length) {
      alert("편집할 주소를 찾을 수 없습니다. 다시 시도해주세요.");
      return;
    }

    const address = addressList[index];
    nameInput.value = address.name || "";
    phoneNumberInput.value = address.phoneNumber || "";
    zipcodeInput.value = address.zipcode || "";
    detailedAddressInput.value = address.optionAddress || "";

    siSelect.innerHTML = "<option selected disabled>시/도</option>";
    si.forEach((area) => {
      const siOption = document.createElement("option");
      siOption.value = area.name;
      siOption.innerText = area.Kname;
      if (area.name === address.siSelected) siOption.selected = true;
      siSelect.appendChild(siOption);
    });

    guKunselect.innerHTML = "<option selected disabled>시/군/구</option>";
    if (guKun[address.siSelected]) {
      guKun[address.siSelected].forEach((gu) => {
        const guOption = document.createElement("option");
        guOption.value = gu;
        guOption.innerText = gu;
        if (gu === address.guKunSelected) guOption.selected = true;
        guKunselect.appendChild(guOption);
      });
    }

    editingIndex = index; // 현재 편집 중인 인덱스 설정
    editingItem = listItem; // 편집 대상 UI 요소 저장
    toggleAddressModal("plus", true);
  }
});

// 기본 주소로 설정한 항목 로컬 스토리지에 저장
userInfo.addEventListener("change", function (e) {
  if (e.target.name === "useraddress__radio") {
    const index = parseInt(e.target.dataset.index, 10);

    if (isNaN(index) || index < 0 || index >= addressList.length) {
      alert("잘못된 주소를 선택했습니다. 다시 시도해주세요.");
      return;
    }

    const selectedAddress = addressList[index];
    localStorage.setItem("defaultAddress", JSON.stringify(selectedAddress));
    updateAddressInfoDisplay(); // 기본 주소 화면에 반영

    toggleAddressModal("main", false); // 기본 주소 선택 후 모달 닫기
  }
});

// 기본 주소 및 UI 동기화 함수
function updateAddressInfoDisplay() {
  const defaultAddress = JSON.parse(localStorage.getItem("defaultAddress"));

  if (addressList.length === 0) {
    emptyAddressMessage.style.display = "block";
    infoDown.style.display = "none";
    if (addressBtn) addressBtn.disabled = true;
  } else {
    emptyAddressMessage.style.display = "none";
    infoDown.style.display = "block";
    if (addressBtn) addressBtn.disabled = false;

    if (defaultAddress) {
      updateInfoDown(defaultAddress);
    }
  }
}

// 삭제 버튼 클릭
userInfo.addEventListener("click", function (e) {
  if (e.target.closest(".delete")) {
    const listItem = e.target.closest("ul");
    const index = parseInt(
      listItem.querySelector('input[type="radio"]').dataset.index,
      10
    );

    if (isNaN(index) || index < 0 || index >= addressList.length) {
      alert("삭제할 주소를 찾을 수 없습니다. 다시 시도해주세요.");
      return;
    }

    addressList.splice(index, 1); // 리스트에서 삭제
    localStorage.setItem("userAddresses", JSON.stringify(addressList));
    loadAddresses(); // UI 갱신
  }
});

// 기본 주소 설정
userInfo.addEventListener("change", function (e) {
  if (e.target.name === "useraddress__radio") {
    const index = parseInt(e.target.dataset.index, 10);

    // index 값 검증
    if (isNaN(index) || index < 0 || index >= addressList.length) {
      console.error("잘못된 index 값:", index);
      alert("잘못된 주소를 선택했습니다. 다시 시도해주세요.");
      return;
    }

    const selectedAddress = addressList[index];

    // 선택된 주소 데이터 검증
    if (!selectedAddress || typeof selectedAddress !== "object") {
      console.error("선택된 주소 데이터가 유효하지 않습니다:", selectedAddress);
      alert("주소 데이터가 유효하지 않습니다. 다시 시도해주세요.");
      return;
    }

    // 기존 기본 주소를 제거
    document
      .querySelectorAll('input[name="useraddress__radio"]:checked')
      .forEach((radio) => {
        if (radio !== e.target) {
          radio.checked = false;
        }
      });

    // 선택된 기본 주소에 체크
    e.target.checked = true;

    // 기본 주소를 로컬 스토리지와 addressList에 동기화
    localStorage.setItem("defaultAddress", JSON.stringify(selectedAddress));
    updateInfoDown(selectedAddress); // 기본 주소 정보 업데이트

    // 모달창 닫기
    toggleAddressModal("main", false);
  }
});

// 주소 정보 업데이트 함수
function updateAddressInfoDisplay() {
  const defaultAddress = JSON.parse(localStorage.getItem("defaultAddress"));

  if (addressList.length === 0) {
    // 로컬스토리지에 주소가 없으면 emptyAddress 화면 표시 및 버튼 비활성화
    emptyAddressMessage.style.display = "block";
    infoDown.style.display = "none";
    if (addressBtn) {
      addressBtn.disabled = true; // 주소 변경 버튼 비활성화
    }
  } else {
    // 주소가 있으면 emptyAddress 숨기고 주소 정보 및 버튼 활성화
    emptyAddressMessage.style.display = "none";
    infoDown.style.display = "block";
    if (addressBtn) {
      addressBtn.disabled = false; // 주소 변경 버튼 활성화
    }

    if (defaultAddress) {
      updateInfoDown(defaultAddress);
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
      <li>
        ${address.zipcode} 대한민국 ${address.siKname} ${address.guKunSelected}
      </li>
      <li>${address.optionAddress}</li>
    </ul>`;
  infoDown.innerHTML = infoDownHTML;
}

// 주소 목록 로드
function loadAddresses() {
  addressList = JSON.parse(localStorage.getItem("userAddresses")) || [];
  userInfo.innerHTML = ""; // UI 초기화

  addressList.forEach((address, index) => {
    const listItemHTML = `
      <ul>
        <li>
          <span class="username">${address.name}</span>
          <span class="usernumber"><span>+82</span> ${address.phoneNumber}</span>
        </li>
        <li>
          <span class="zipcode">${address.zipcode}</span>
          <span class="useraddress">대한민국 ${address.siKname} ${address.guKunSelected}</span>
        </li>
        <li>
          <span class="useraddress-option">${address.optionAddress}</span>
        </li>
        <li>
          <div>
            <input type="radio" name="useraddress__radio" id="useraddress__radio_${index}" data-index="${index}" />
            <label for="useraddress__radio_${index}">기본주소</label>
          </div>
          <div>
            <span class="edit"><i class="fa-regular fa-pen-to-square"></i>편집</span>
            <span class="delete"><i class="fa-regular fa-trash-can"></i>삭제</span>
          </div>
        </li>
      </ul>
    `;
    userInfo.insertAdjacentHTML("beforeend", listItemHTML);
  });

  updateAddressInfoDisplay(); // 기본 주소 갱신
}

// 주문상품내역, 갯수표기 및 장바구니 렌더링
function renderCartItems() {
  productInfo.innerHTML = "";

  let totalAmount = 0; // 총 금액 초기화
  const productCount = getCartProducts.length;

  getCartProducts.forEach((product) => {
    const {
      img,
      title,
      selectColor,
      selectSize,
      quan,
      discountingPrice,
      price,
    } = product;

    // 원래 가격과 할인된 가격 계산
    const originalTotalPrice = price * quan;
    const discountedTotalPrice = discountingPrice * quan;
    const total = originalTotalPrice - discountedTotalPrice;
    // 상품리스트 HTML
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
            <span>${selectColor || "색상"}</span>
            <span>|</span>
            <span>${selectSize || "사이즈"}</span>
          </div>
          <div class="price__info">
            <span class="general-price">￦${originalTotalPrice.toLocaleString()}</span>
            <span class="discounted-price">￦${discountedTotalPrice.toLocaleString()}</span>
          </div>
        </div>
      </li>
    `;

    productInfo.insertAdjacentHTML("beforeend", productInfoHTML);
    totalAmount += total;
  });

  const productCountElement = document.querySelector(".order__title h3 span");
  productCountElement.innerText = `${productCount}`;

  // Toggle 기능 추가
  const orderTitle = document.querySelector(".order__title");
  const productInfoSection = document.querySelector("#product__info-All ul");

  // 초기 상태로 productInfoSection을 숨기기
  productInfoSection.style.display = "none";

  // orderTitle 클릭 시 productInfoSection의 표시/숨김 전환
  orderTitle.addEventListener("click", () => {
    const isActive = productInfoSection.style.display === "block";
    productInfoSection.style.display = isActive ? "none" : "block";
    orderTitle.classList.toggle("active", !isActive);
  });

  const totalFeePrice = document.querySelector(".total__fee .price");
  if (totalFeePrice) {
    totalFeePrice.innerText = `￦ ${totalAmount.toLocaleString()}`;
  }

  updateFinalPrice(totalAmount);
}

// 최종 결제 금액 업데이트
function updateFinalPrice(totalAmount = 0) {
  const couponFeeElement = document.querySelector(".coupon__fee-last");
  const creditFeeElement = document.querySelector(".credit__fee-last");
  const summaryPriceElement = document.querySelector(".summary__price-total");

  const couponFee =
    parseInt(couponFeeElement.innerText.replace(/[^0-9]/g, ""), 10) || 0;
  const creditFee =
    parseInt(creditFeeElement.innerText.replace(/[^0-9]/g, ""), 10) || 0;

  // 쿠폰과 크레딧 적용 후 최종 금액 계산 (소수점 버림)
  let lastPriceAll = Math.floor(totalAmount - couponFee - creditFee);

  summaryPriceElement.innerText = `￦ ${lastPriceAll.toLocaleString()}`;
}

// 쿠폰과 크레딧 이벤트 리스너 설정

function setupDiscountListeners() {
  const couponSelect = document.querySelector("#coupon");
  const creditButton = document.querySelector(".used__credit button");

  couponSelect.addEventListener("change", function () {
    const discountRate = parseFloat(couponSelect.value);
    const totalFeePriceText =
      document.querySelector(".total__fee .price").innerText;
    const totalProductPrice = parseInt(
      totalFeePriceText.replace(/[^0-9]/g, ""),
      10
    );

    let discountAmount = 0;
    if (!isNaN(discountRate)) {
      discountAmount = Math.floor(totalProductPrice * discountRate); // 소수점 버림
    }

    document.querySelector(
      ".coupon__fee-last"
    ).innerText = `- ￦ ${discountAmount.toLocaleString()}`;

    updateFinalPrice(totalProductPrice); // 최종 결제 금액 업데이트
  });

  creditButton.addEventListener("click", function (event) {
    event.preventDefault();
    const totalCredit = 20000; // 크레딧 금액
    document.querySelector(
      ".credit__fee-last"
    ).innerText = `- ￦ ${totalCredit.toLocaleString()}`;

    const totalFeePriceText =
      document.querySelector(".total__fee .price").innerText;
    const totalProductPrice = parseInt(
      totalFeePriceText.replace(/[^0-9]/g, ""),
      10
    );

    updateFinalPrice(totalProductPrice); // 최종 결제 금액 업데이트
  });
}

// 모달 이벤트
function toggleAddressModal(type, show) {
  const modalType =
    type === "plus" ? ".address__modal__box-plus" : ".address__modal__box";

  const modal = document.querySelector(modalType);

  if (modal) {
    modal.classList.toggle("active", show);
    document.body.style.overflow = show ? "hidden" : "auto";
  }
  console.log(modalType);
  console.log(modal);
}

function addModalEventListeners() {
  if (addressBtn) {
    addressBtn.addEventListener("click", () => {
      toggleAddressModal("main", true);
    });
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

// 숫자만 허용
function onlyNumber(e) {
  const allowedValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자 이외 제거
  if (e.target.value !== allowedValue) {
    e.target.value = allowedValue; // 잘못된 입력 제거
    alert("숫자만 입력할 수 있습니다.");
  }
}

// 한글만 허용
function onlyKorean(e) {
  const allowedValue = e.target.value.replace(/[^가-힣]/g, ""); // 한글 이외 제거
  if (e.target.value !== allowedValue) {
    e.target.value = allowedValue; // 잘못된 입력 제거
    alert("한글만 입력할 수 있습니다.");
  }
}

// 첫 글자가 'P'로 시작하도록 강제
function validateFirstCharacter(e) {
  const value = e.target.value;

  // 첫 글자가 'P'가 아닌 경우 수정
  if (value.length > 0 && value[0].toUpperCase() !== "P") {
    e.target.value = "P" + value.slice(1); // 첫 글자를 'P'로 강제 변경
    alert("첫 글자는 'P'로 시작해야 합니다.");
  }
}

// 이벤트 리스너 설정
phoneNumberInput.addEventListener("input", onlyNumber); // 숫자만
zipcodeInput.addEventListener("input", onlyNumber); // 숫자만
nameInput.addEventListener("input", onlyKorean); // 한글만
customsNumberInput.addEventListener("input", validateFirstCharacter); // 첫 글자 'P' 확인

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

  // 새로운 쿠폰 목록과 최소 사용 금액
  const coupons = [
    { name: "5% 할인 쿠폰 - 첫 구매 감사", discount: 0.05, minAmount: 30000 },
    { name: "7% 할인 쿠폰 - VIP 전용", discount: 0.07, minAmount: 50000 },
    { name: "10% 할인 쿠폰 - 특별 혜택", discount: 0.1, minAmount: 100000 },
  ];

  // 구매 합계 금액 가져오기
  const totalProductPriceText =
    document.querySelector(".total__fee .price").innerText;
  const totalProductPrice = parseInt(
    totalProductPriceText.replace(/[^0-9]/g, ""),
    10
  );

  coupons.forEach((coupon) => {
    const option = document.createElement("option");
    option.value = coupon.discount;
    option.innerText = coupon.name;
    option.classList.add("dynamic-option");

    // 최소 금액 조건에 따라 활성화/비활성화
    if (totalProductPrice >= coupon.minAmount) {
      option.disabled = false;
    } else {
      option.disabled = true;
      option.innerText += ` (₩${coupon.minAmount.toLocaleString()} 이상 구매 시 사용 가능)`;
    }

    couponSelect.appendChild(option);
  });

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

    document.querySelector(
      ".coupon__fee-last"
    ).innerText = `- ₩ ${discountAmount.toLocaleString()}`;

    updateFinalPrice();
  });

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

  // 결제 금액 확인 함수
  const getFinalPrice = () => {
    const finalPriceElement = document.querySelector(".final__price span");
    const finalPrice = finalPriceElement
      ? Number(finalPriceElement.innerText.replace(/[₩,]/g, ""))
      : 0;
    return finalPrice;
  };

  // 버튼 클릭 이벤트
  fullCreditButton.addEventListener("click", function (event) {
    event.preventDefault();

    const finalPrice = getFinalPrice();

    if (finalPrice < 50000) {
      alert("결제 금액이 50,000원 미만인 경우 크레딧을 사용할 수 없습니다.");
      return;
    }

    const formattedCredit = `- ₩ ${totalCredit.toLocaleString()}`;
    creditInput.value = formattedCredit;
    creditFeeElement.innerText = formattedCredit;
    updateFinalPrice();
  });

  creditInput.addEventListener("focusout", function () {
    creditInput.value = creditInput.value || `₩ 0`;
  });
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
    '.consent__list input[type="checkbox"]:not(#agreeAll)'
  ); // #agreeAll 제외
  const radioButtons = document.querySelectorAll('input[name="radio"]');
  const checkoutButton = document.querySelector(".checkout__button");
  const treePlanting = document.querySelector("#treePlanting"); //  체크박스

  // 체크박스 및 라디오 버튼 상태에 따라 결제 버튼 활성화
  function toggleCheckoutButton() {
    const allCheckboxChecked = Array.from(checkboxes).every(
      (checkbox) => checkbox.checked
    );
    const radioChecked = Array.from(radioButtons).some(
      (radio) => radio.checked
    );

    checkoutButton.disabled = !(allCheckboxChecked && radioChecked);
  }

  // 전체 동의 버튼 이벤트
  agreeAll.addEventListener("change", function () {
    const isChecked = agreeAll.checked;

    // 모든 체크박스 상태 업데이트
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = isChecked;
    });

    toggleCheckoutButton();
  });

  // 개별 체크박스 변경 이벤트
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      // 모든 체크박스가 체크되었는지 확인하여 agreeAll 상태 업데이트
      const allChecked = Array.from(checkboxes).every(
        (checkbox) => checkbox.checked
      );
      agreeAll.checked = allChecked;

      toggleCheckoutButton();
    });
  });

  // 라디오 버튼 변경 이벤트
  radioButtons.forEach(function (radio) {
    radio.addEventListener("change", toggleCheckoutButton);
  });

  // 결제 버튼 클릭 이벤트
  checkoutButton.addEventListener("click", function () {
    if (!checkoutButton.disabled) {
      window.location.href = "/html/components/Ordercompleted.html";
    }
  });

  // 초기 상태 업데이트
  toggleCheckoutButton();
}

addModalEventListeners();
renderCartItems();
loadAddresses();
setupCouponOptions();
setupCreditListener();
setupCheckboxListeners();
setupDiscountListeners();
updateFinalPrice();
