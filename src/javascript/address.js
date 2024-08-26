const addressBtn = document.querySelector(".addressbtn");
const addressModal = document.querySelector(".address__modal__box");
const addressClose = document.querySelector(".address__close-box");

const addressPlusBtn = document.querySelector("#plus-address");
const addressPlusModal = document.querySelector(".address__modal__box-plus");
const addressPlusClose = document.querySelector(".address__close-box-plus");
const addressBackBtn = document.querySelector(".address__back-box");

// 주소 변경 모달 창
if (addressBtn && addressModal && addressClose) {
  addressBtn.addEventListener("click", () => {
    addressModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  addressClose.addEventListener("click", () => {
    addressModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

// 주소 추가 모달 창
if (addressPlusBtn && addressPlusModal && addressPlusClose) {
  addressPlusBtn.addEventListener("click", () => {
    addressPlusModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  addressPlusClose.addEventListener("click", () => {
    addressPlusModal.classList.remove("active");
    addressModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
}

// 주소 추가 모달 창에서 뒤로 가기 버튼
if (addressBackBtn && addressPlusModal && addressModal) {
  addressBackBtn.addEventListener("click", () => {
    addressPlusModal.classList.remove("active");
    addressModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
}

// 국가/ 시도/ 시군구

let si = [
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

let guKun = {
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

let siSelect = document.querySelector("#trial");
let guKunselect = document.querySelector("#city");

si.forEach((area) => {
  const siOption = document.createElement("option");
  siOption.value = area.name;
  siOption.innerText = area.Kname;
  siSelect.appendChild(siOption);
});

siSelect.addEventListener("change", function () {
  siSelected = this.value;
  guKunselect.innerHTML = "<option selected disabled>시/군/구</option>"; // 초기화를 해주어야한다
  if (guKun[siSelected]) {
    guKun[siSelected].forEach((gu) => {
      const guKunOption = document.createElement("option");
      guKunOption.value = gu;
      guKunOption.innerText = gu;
      guKunselect.appendChild(guKunOption);
    });
  }
});

// 주소 변경 내용

let zipcode = document.querySelector("#zipcode");
let customsNumber = document.querySelector("#customs-number");
let name = document.querySelector("#name");
let phoneNumber = document.querySelector("#phone-number");
let form = document.querySelector("#address-form");
let userInfo = document.querySelector(".user__info");
let optionAddress = document.querySelector("#detailed-address");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    zipcode.value === "" ||
    customsNumber.value === "" ||
    name.value === "" ||
    phoneNumber.value === "" ||
    siSelect.value === "" ||
    guKunselect.value === ""
  ) {
    alert("빈칸이 있습니다. 확인해주세요");
    return;
  }

  const selectedSiText = siSelect.querySelector("option:checked").innerText;
  const selectedGuKunText =
    guKunselect.querySelector("option:checked").innerText;

  const newListItemHTML = `
        <li>
          <span class="username">${name.value}</span>
          <span class="usernumber"><span>+82</span> ${phoneNumber.value}</span>
        </li>
        <li>
          <span class="zipcode">${zipcode.value}</span>
          <span class="useraddress">대한민국 ${selectedSiText} ${selectedGuKunText}</span>
        </li>
        <li>
          <span class="useraddress-option">${optionAddress.value}</span>
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

  const newListItem = document.createElement("ul");

  newListItem.innerHTML = newListItemHTML;
  userInfo.appendChild(newListItem);

  userInfo.style.display = "block";
  addressPlusModal.style.display = "none";
  addressModal.style.display = "block";
});

// user__ info 삭제

userInfo.addEventListener("click", (e) => {
  if (e.target.closest(".delete")) {
    const listItem = e.target.closest("ul");
    listItem.remove();
    if (userInfo.children.length === 0) {
      userInfo.style.display = "none";
    }
  }
});

// user__info 편집

let editingItem = null;

userInfo.addEventListener("click", (e) => {
  if (e.target.closest(".edit")) {
    const listItem = e.target.closest("ul");
    const nameValue = listItem.querySelector(".username").innerText;
    const phoneNumberValue = listItem
      .querySelector(".usernumber")
      .innerText.replace("+82", "")
      .trim();
    const zipcodeValue = listItem.querySelector(".zipcode").innerText;
    const optionAddressValue = listItem.querySelector(
      ".useraddress-option"
    ).innerText;

    name.value = nameValue;
    phoneNumber.value = phoneNumberValue;
    zipcode.value = zipcodeValue;
    optionAddress.value = optionAddressValue;

    addressPlusModal.style.display = "block";

    editingItem = listItem;
  }
});

// 숫자만, 한국어만

function onlyNumber(e) {
  const key = e.key;
  if (
    isNaN(key) &&
    key !== "Backspace" &&
    key !== "Delete" &&
    key !== "ArrowLeft" &&
    key !== "ArrowRight" &&
    key !== "ArrowUp" &&
    key !== "ArrowDown"
  ) {
    e.preventDefault();
    alert("숫자를 적어주세요");
    e.target.value = "";
  }
}

function onlyKorean(e) {
  const key = e.key;
  if (
    !isNaN(key) &&
    key !== "Backspace" &&
    key !== "Delete" &&
    key !== "ArrowLeft" &&
    key !== "ArrowRight" &&
    key !== "ArrowUp" &&
    key !== "ArrowDown"
  ) {
    e.preventDefault();
    alert("한글로 적어주세요");
    e.target.value = "";
  }
}

function allowCustomer(e) {
  const key = e.key;
  const userKey = e.target.value;

  if (userKey.length === 0) {
    if (key !== "P" && key !== "p") {
      e.preventDefault();
      alert("첫 글자는 P 또는 p를 적어주세요.");
      e.target.value = "";
    }
  } else {
    if (
      isNaN(key) &&
      key !== "Backspace" &&
      key !== "Delete" &&
      key !== "ArrowLeft" &&
      key !== "ArrowRight" &&
      key !== "ArrowUp" &&
      key !== "ArrowDown"
    ) {
      e.preventDefault();
      alert("두 번째 글자부터는 숫자만 입력할 수 있습니다.");
      e.target.value = "";
    }
  }
}

phoneNumber.addEventListener("keydown", onlyNumber);
zipcode.addEventListener("keydown", onlyNumber);
name.addEventListener("keydown", onlyKorean);
customsNumber.addEventListener("keydown", allowCustomer);
