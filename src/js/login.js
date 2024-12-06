const checkIdBtn = document.querySelector("#open");

checkIdBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const enteredId = document.getElementById("email").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find((user) => user.id === enteredId);

  if (foundUser) {
    // 로그인 성공 시 index.html로 이동
    window.location.href = "/index.html";
  } else {
    // 로그인 실패 시 경고 및 초기화
    alert("아이디와 비밀번호가 일치하지 않습니다.");
    document.querySelector(".password").style.display = "none";
    document.querySelector(".email").style.display = "block";
  }
});

// 비밀번호 확인
const checkPwBtn = document.querySelector("#close");

checkPwBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const enteredId = document.getElementById("email").value;
  const enteredPw = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // 아이디와 비밀번호가 모두 일치하는 사용자 찾기
  const foundUser = users.find(
    (user) => user.id === enteredId && user.password === enteredPw
  );
});
