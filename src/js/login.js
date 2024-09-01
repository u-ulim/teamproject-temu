// 1. 아이디 정보
const userid = document.querySelector(".userid"); // 아이디 정보
const success = document.querySelector(".success"); // 성공메세지
const failure = document.querySelector(".failure"); // 글자 수 실패 메세지
const failureMessage = document.querySelector(".failure__message"); // 영어 또는 숫자 실패 메세지

// 2. 비밀번호 정보
const password = document.querySelector(".password"); // 비밀번호
const confrimPassword = document.querySelector(".confrim__password"); //비밀번호 확인
const passwordMessage = document.querySelector(".password__message"); // 영문, 숫자, 특수분자 미사용
const mismatchMessage = document.querySelector(".mismatch__message"); //비밀번호 불일치
const togglePassword = document.querySelector(".fa-eye-slash"); //비밀번호 숨기는 아이콘
const successPassword = document.querySelector(".success__password"); // 비밀번호 성공
const passwordSuccess = document.querySelector(".password__success"); //비밀번호 확인 성공

// 3. 이메일 유효성 검사
const emailInput = document.querySelector(".email");
const domainSelect = document.querySelector(".control");
const emailSuccess = document.querySelector(".email__success");
const emailFail = document.querySelector(".email__fail");
const emailError = document.querySelector(".email__error");

// 4. 체크박스 
const selectAllCheckbox = document.querySelector("#agree__box .checkbox");
const ageCheckbox = document.querySelector("#age__box .checkbox");
const useCheckbox = document.querySelector("#use__box .checkbox");
const userinfoCheckbox = document.querySelector("#userinfo__box .checkbox");
const marketingCheckbox = document.querySelector("#marketing__box .checkbox");
const eventCheckbox = document.querySelector("#event__box .checkbox");

// 1. 아이디 유효성 검사
// 아이디는 5자 이상이어야 하고, 영어 소문자 및 숫자만 포함해야 합니다.
userid.addEventListener("input", function () {
  const userIdValue = userid.value;
  const idRegex = /^[a-z0-9]+$/; // 영어 소문자와 숫자만 허용하는 정규식

  if (userIdValue.length >= 5 && idRegex.test(userIdValue)) {
    // 유효한 아이디
    success.style.display = "block"; // 성공 메세지 보이기
    failure.style.display = "none"; // 글자 수 실패 메세지 숨기기
    failureMessage.style.display = "none"; // 영어 또는 숫자 실패 메세지 숨기기
  } else {
    success.style.display = "none"; // 성공 메세지 숨기기
    failure.style.display = userIdValue.length < 8 ? "block" : "none"; // 글자 수 실패 메세지 보이기
    failureMessage.style.display = !idRegex.test(userIdValue)
      ? "block"
      : "none"; // 영어 또는 숫자 실패 메세지 보이기
  }
});

// 2. 비밀번호 유효성 검사
// 비밀번호 보이기/숨기기 기능
togglePassword.addEventListener("click", function () {
  // 현재 비밀번호 필드의 타입 확인
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  confrimPassword.setAttribute("type", type);

  // 아이콘 전환
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});

// 비밀번호 확인 검사
confrimPassword.addEventListener("input", function () {
  if (password.value !== confrimPassword.value) {
    passwordSuccess.style.display = "none";
    mismatchMessage.style.display = "block";
  } else {
    passwordSuccess.style.display = "block";
    mismatchMessage.style.display = "none";
  }
});

// 비밀번호 글자 수 확인 검사
password.addEventListener("input", function () {
  const passwordValue = password.value;
  const passwordCriteria =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (passwordValue === "") {
    passwordMessage.textContent = "비밀번호를 입력해 주세요."; // 비밀번호를 입력하지 않은 경우
    passwordMessage.style.display = "block";
    successPassword.style.display = "none";
  } else if (!passwordCriteria.test(passwordValue)) {
    passwordMessage.textContent =
      "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다."; // 조건에 맞지 않은 경우
    passwordMessage.style.display = "block";
    successPassword.style.display = "none";
  } else {
    passwordMessage.style.display = "none";
    successPassword.style.display = "block";
  }
});

// 비밀번호 확인 검사
confrimPassword.addEventListener("input", function () {
  if (confrimPassword.value === "") {
    mismatchMessage.textContent = "비밀번호를 다시 입력해 주세요."; // 비밀번호 확인을 입력하지 않은 경우
    mismatchMessage.style.display = "block";
    passwordSuccess.style.display = "none";
  } else if (password.value !== confrimPassword.value) {
    mismatchMessage.textContent = "비밀번호가 일치하지 않습니다."; // 비밀번호가 일치하지 않는 경우
    mismatchMessage.style.display = "block";
    passwordSuccess.style.display = "none";
  } else {
    mismatchMessage.style.display = "none";
    passwordSuccess.style.display = "block";
  }
});

// 3. 이메일 유효성 검사
function validateEmail() {
  // 요소 선택

  // 이메일 및 도메인 값 가져오기
  const email = emailInput.value.trim();
  const domain = domainSelect.value;

  // 메시지 초기화
  emailSuccess.style.display = "none";
  emailFail.style.display = "none";
  emailError.style.display = "none";

  // 도메인 선택 확인
  if (domain === "none") {
    emailError.style.display = "block";
    return;
  }

  // 이메일 형식 유효성 검사
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailRegex.test(email + "@" + domain);

  // 이메일 길이 및 문자 유효성 검사
  const isValidLength = email.length >= 8;
  const hasLetters = /[a-zA-Z]/.test(email);
  const hasNumbers = /[0-9]/.test(email);

  // 이메일 유효성 검사 및 메시지 표시
  if (isValidEmail && isValidLength && hasLetters && hasNumbers) {
    emailSuccess.style.display = "block";
  } else {
    emailFail.style.display = "block";
  }
}

// 이벤트 리스너 추가
document.querySelector(".email").addEventListener("input", validateEmail);
document.querySelector(".control").addEventListener("change", validateEmail);

// 4. 체크박스
document.addEventListener("DOMContentLoaded", function () {

  const checkboxes = [
    ageCheckbox,
    useCheckbox,
    userinfoCheckbox,
    marketingCheckbox,
    eventCheckbox,
  ];

  // 전체 동의 체크박스 클릭 시 모든 체크박스 체크/언체크
  selectAllCheckbox.addEventListener("change", function () {
    checkboxes.forEach(
      (checkbox) => (checkbox.checked = selectAllCheckbox.checked)
    );
  });

  // 다른 체크박스 클릭 시 전체 동의 체크박스 상태 업데이트
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const allChecked = checkboxes.every((cb) => cb.checked);
      selectAllCheckbox.checked = allChecked;
    });
  });
});
