//1. 로컬스토리지(user 아이디 비교)

const checkIdBtn = document.querySelector("#open");

checkIdBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const enteredId = document.getElementById("email").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find((user) => user.id === enteredId);

  if (foundUser) {
    document.querySelector(".password").style.display = "block";
    document.querySelector(".email").style.display = "none";
  } else {
    alert("아이디가 존재하지 않습니다.");
  }
});

//2. 비밀번호(user 비밀번호 비교)

const checkPwBtn = document.querySelector("#close");

checkPwBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const enteredPw = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const foundUser = users.find((user) => user.password === enteredPw);

  if (foundUser) {
    window.location.href = "/index.html";
  } else {
    alert("아이디와 비밀번호가 일치하지 않습니다.");
    document.querySelector(".password").style.display = "none";
    document.querySelector(".email").style.display = "block";
  }
});
