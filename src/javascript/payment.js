// 주소 변경 모달 창 관련 이벤트 내역
// 주소등록 버튼을 누른 후 작성하고 그 값을 로컬스토리지에 저장되어야함

let setAddresstProducts =
  JSON.parse(localStorage.getItem("setAddresstProducts")) || [];

const localStorageSave = () => {
  localStorage.setItem(
    "setAddresstProducts",
    JSON.stringify(setAddresstProducts)
  );
};

//변수선언
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

let editingItem = null;

// 배너 삭제
if (bannerClose) {
  bannerClose.addEventListener("click", () => {
    const banner = document.querySelector(".banner");
    banner.classList.add("active");
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
        <input type="radio" name="useraddress__radio" id="useraddress__radio"/>
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
  }

  userInfo.style.display = "block";
  toggleAddressModal("plus", false);
  toggleAddressModal("main", true);

  form.reset(); // 폼 리셋
});

// 주소 항목 삭제 및 편집
userInfo.addEventListener("click", function (e) {
  if (e.target.closest(".delete")) {
    const listItem = e.target.closest("ul");
    listItem.remove();
    if (userInfo.children.length === 0) {
      userInfo.style.display = "none";
    }
  }

  if (e.target.closest(".edit")) {
    const listItem = e.target.closest("ul");
    nameInput.value = listItem.querySelector(".username").innerText;
    phoneNumberInput.value = listItem
      .querySelector(".usernumber")
      .innerText.replace("+82", "")
      .trim();
    zipcodeInput.value = listItem.querySelector(".zipcode").innerText;
    detailedAddressInput.value = listItem.querySelector(
      ".useraddress-option"
    ).innerText;

    toggleAddressModal("plus", true);
    editingItem = listItem;
  }
});

// 체크박스 클릭 시 info__down 업데이트
userInfo.addEventListener("change", function (e) {
  if (e.target.id === "useraddress__radio") {
    updateInfoDown(e.target.closest("ul"));
  }
});

function updateInfoDown(selectedItem) {
  if (!selectedItem) return;

  const name = selectedItem.querySelector(".username").innerText;
  const phoneNumber = selectedItem.querySelector(".usernumber").innerText;
  const zipcode = selectedItem.querySelector(".zipcode").innerText;
  const address = selectedItem.querySelector(".useraddress").innerText;
  const detailedAddress = selectedItem.querySelector(
    ".useraddress-option"
  ).innerText;

  const infoDownHTML = `
    <ul>
      <li>
        <span>${name}</span>
        <span>${phoneNumber}</span>
      </li>
      <li>${zipcode}  ${address}</li>
      <li>${detailedAddress}</li>
    </ul>
  `;

  if (infoDown) {
    infoDown.innerHTML = infoDownHTML;
  }
  toggleAddressModal("main", false);
}

// 숫자만, 한국어만
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

//모달 이벤트

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

// 모달 이벤트 다시 시작
addModalEventListeners();

//주문상품내역 , 갯수표기
const orderinfoBtn = document.querySelector(".order__title");
const product = document.querySelector(".product__info");
const productInfo = document.querySelectorAll(".product__info ul");
const result = document.querySelector(".order__title h3 span");
const resultAll = document.querySelector(".order__Title h3");
const productInfoLength = productInfo.length;

orderinfoBtn.addEventListener("click", () => {
  product.classList.toggle("active");
  orderinfoBtn.classList.toggle("active");
});

if (productInfoLength !== 0) {
  result.innerText = `${productInfoLength}`;
} else {
  resultAll.style.display.none;
  result.style.display.none;
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

// 체크박스

let agreeAll = document.querySelector("#agreeAll");
let checkboxes = document.querySelectorAll(
  '.consent__list input[type="checkbox"]:not(#agreeAll)'
);

// 전체 동의가 변경되었을 때
if (agreeAll) {
  agreeAll.addEventListener("change", function () {
    let isChecked = agreeAll.checked;
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = isChecked;
    });
  });
}

// 개별 체크박스가 변경되었을 때
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    let allChecked = true;
    checkboxes.forEach(function (checkbox) {
      if (!checkbox.checked) {
        allChecked = false;
      }
    });
    agreeAll.checked = allChecked;
  });
});

// getAddressProduct 빈 화면
function renderCartItems() {
  userInfo.innerHTML = "";

  if (getCartProducts.length === 0) {
    document.querySelector(".empty__product").style.display = "block";
    userInfo.style.display = "none";
    renderAddressItems();
  } else {
    document.querySelector(".empty__product").style.display = "none";
    userInfo.style.display = "block";
  }
}

// getAddressProduct 빈 화면
function checkIfAddressIsEmpty() {
  if (getAddressProduct.length === 0) {
    addressBtn.style.display = none;
    console.log(addressBtn);
  } else {
    renderAddressItems();
    addressBtn.style.display = block;
  }
}

checkIfAddressIsEmpty();
