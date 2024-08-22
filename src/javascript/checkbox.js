// 전체체크 표시 -> 모든 ul 태그 표시
// 전체체크 해제 -> 모든 ul 태그 전체 해제
// 모든 ul 체크 -> 전체 체크 표시
// ul 하나라도 체크 안됨 -> 전체 체크 표시 해제

// 개별 체크 박스 표시에 따라 전체체크박스 갯수 변경
// 개별 체크 박스 표시 갯수
// 갯수에 따라 innertext 변경

// 장바구니리스트
let selectAllCheckbox = document.querySelector("#custom__box");
let productCheckboxes = document.querySelectorAll(".product .custom__checkbox");
const checkboxNum = productCheckboxes.length;
const productNum = document.querySelector("#item__count");

// 전체 체크 변경
if (selectAllCheckbox) {
  selectAllCheckbox.addEventListener("change", function () {
    let isChecked = selectAllCheckbox.checked;
    productCheckboxes.forEach(function (checkbox) {
      checkbox.checked = isChecked;

      if (selectAllCheckbox.checked) {
        productNum.innerText = `(${checkboxNum})`;
      } else {
        productNum.innerText = "";
      }
    });
  });
}

// 개별 체크박스 변경
productCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    let allChecked = true;

    productCheckboxes.forEach(function (checkbox) {
      if (!checkbox.checked) {
        allChecked = false;
      }
      if (checkbox.checked) {
        productNum.innerText = `(${checkboxNum})`;
      } else {
        productNum.innerText = "";
      }
    });

    selectAllCheckbox.checked = allChecked;
  });
});

// 테무의 나무 심기는 필수가 아님 구분해서 체크하기

// 동의서
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

// 전체 체크 박스 표시 또는 개별 체크 박스 표시 해서 선택삭제 누를 때 -> 삭제 실행
// Ul의 개별 체크 박스 표시 한 후, 선택 삭제 누르면 삭제 실행
// 엑스표 눌러도 Ul 삭제

// 장바구니 리스트 모두 삭제되었을 때, 빈카트 나와야한다..
// div안에 있는 ul의 갯수가 0이 되었을 때, 내가 준비한 코드가 실행되어야한다.
// 그럼 먼저 다 삭제 되어야한다.. -> 체크박스 내에서 삭제할 수 있도록 조절

// 상품리스트(ul) 자바스크립트로 조절 -> json 정보 받고서 진행 .. 휴 ㅇ-ㅇ

// 상품 삭제 후 빈 카트 이미지
let deleteSelectedBtn = document.querySelector("button");
let emptyCartMessage = document.querySelector(".empty__product");
let productInfo = document.querySelector(".product__info");
let productClose = document.querySelector(".product__close");
const itemCount = document.querySelector(".item__count");

// 툴바에 존재하는 선택삭제 버튼
deleteSelectedBtn.addEventListener("click", function () {
  productCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      let product = checkbox.closest(".product");
      product.remove();
    }
  });
  checkIfCartIsEmpty();
});

// 삭제 표시  -> 지금은 되는데 가상의 ul들이 많아질때는 바꿔야겠지..? All로 ??
if (productClose) {
  productClose.addEventListener("click", function () {
    let product = productClose.closest(".product");
    if (product) {
      product.remove();
    }
    checkIfCartIsEmpty();
  });
}

// 장바구니가 비어있는지
function checkIfCartIsEmpty() {
  let productItems = productInfo.querySelectorAll("ul.product");
  if (productItems.length === 0) {
    emptyCartMessage.style.display = "block";
    productInfo.style.display = "none";
    selectAllCheckbox.checked = false;
  } else {
    emptyCartMessage.style.display = "none";
    productInfo.style.display = "block";
  }
}

checkIfCartIsEmpty();
