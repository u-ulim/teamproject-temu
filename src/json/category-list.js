// JSON 데이터 변수
const categoryURL =
  "https://my-json-server.typicode.com/u-ulim/temu-category/db";

// JSON 데이터 패치하기
fetch(categoryURL)
  .then((response) => response.json())
  .then((data) => {
    // 맵핑 한 데이터 출력
    const createItem = (category) => {};

    // 받아온 데이터 맵핑
    const importData = () => {
      data.categories.map((category) => {
        createItem(category);
      });
    };
    importData();
    // 마우스 오버 시 카테고리 리스트 출력
    const tabs = document.querySelector(".submenu-tabs");
    const navMenuCategory = document.querySelector(".nav-menu__category");
    const categoryOverlay = document.querySelector(".category-overlay");

    // 카테고리 마우스 이벤트 시, 오버레이가 생기고 사라지며 스크롤 제어
<<<<<<< HEAD
<<<<<<< HEAD
    let scrollPosition = 0;
=======
>>>>>>> origin/feature-js
=======
>>>>>>> 072d7761d9bf401ee4a7a5ddf73b5e6abf97f6c1
    navMenuCategory.addEventListener("mouseenter", () => {
      navMenuCategory.classList.add("active");
      document.body.style.overflow = "hidden";
    });
    categoryOverlay.addEventListener("mouseenter", () => {
      navMenuCategory.classList.remove("active");
      document.body.style.overflow = "";
    });

    navMenuCategory.addEventListener("mouseleave", () => {
      navMenuCategory.classList.remove("active");
      document.body.style.overflow = "";
    });

    // 마우스 오버시 카테고리에 맞게끔 서브 카테고리가 나오게끔 설정
    document.querySelectorAll(".submenu-tabs li").forEach((tab) => {
      tab.addEventListener("mouseover", function () {
        // 모든 탭에서 활성화 클래스 제거
        document
          .querySelectorAll(".submenu-tabs li")
          .forEach((t) => t.classList.remove("active"));

        // 현재 탭에 활성화 클래스 추가
        this.classList.add("active");

        // 모든 콘텐츠에서 활성화 클래스 제거
        document
          .querySelectorAll(".submenu-content .content")
          .forEach((content) => {
            content.classList.remove("active");
          });

        // 현재 탭과 연결된 콘텐츠를 활성화
        const tabContentId = this.getAttribute("data-tab");
        document.getElementById(tabContentId).classList.add("active");
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
