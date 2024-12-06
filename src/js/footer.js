// footer.html 파일을 로드하여 #footer 안에 삽입
const footerLoad = () => {
  const footerElement = document.getElementById("footer");
  fetch("../../html/components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      footerElement.innerHTML = data;

      // footer 로드가 완료된 이후 이벤트 설정
      setupFooterEvents();
    })
    .catch((error) => console.error("Error loading footer:", error));
};

// footer 이벤트 핸들러 설정 함수
function setupFooterEvents() {
  const homeBtn = document.querySelector(".footer-m__menu-home");
  const categoryBtn = document.querySelector(".footer-m__menu-category");
  const myBtn = document.querySelector(".footer-m__menu-my");
  const cartBtn = document.querySelector(".footer-m__menu-cart");

  let user = JSON.parse(localStorage.getItem("users"));

  // 로그인 상태에 따라  변경
  updateLoginButton(user, myBtn);

  myBtn.addEventListener("click", (e) => {
    const target = e.target.closest("a");
    if (!target) return;

    if (target.id === "logout-btn") {
      e.preventDefault();
      localStorage.removeItem("users"); // user 정보 삭제
      alert("로그아웃 되었습니다.");

      updateLoginButton(user, myBtn);
      window.location.href = "/index.html";
    }
  });

  // 페이지 이동 이벤트
  homeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/index.html";
  });

  categoryBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/index.html";
  });

  // 로그인 상태에 따라 장바구니 페이지 접근 제한
  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      window.location.href = "/html/components/login.html"; // 로그인 페이지로 이동
    } else {
      window.location.href = "/html/components/Productcart.html"; // 장바구니 페이지로 이동
    }
  });
}

// 로그인/로그아웃 버튼
function updateLoginButton(user, myBtn) {
  if (user) {
    myBtn.innerHTML = `
      <a href="#" id="logout-btn">
        <i></i>
        <span>로그아웃</span>
      </a>`;
  } else {
    myBtn.innerHTML = `
      <a href="/html/components/login.html">
        <i></i>
        <span>로그인</span>
      </a>`;
  }
}

footerLoad();
