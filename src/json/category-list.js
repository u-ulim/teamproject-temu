// JSON 데이터 변수
const categoryURL =
  "https://raw.githubusercontent.com/u-ulim/temu-products/main/test.json";

// JSON 데이터 패치하기
fetch(categoryURL)
  .then((response) => response.json())
  .then((data) => {
    // 맵핑 한 데이터 출력
    const createItem = (category) => {
      console.log(category);
    };

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
    
    // 카테고리 마우스 이벤트 시, 오버레이가 생기고 사라지며 스크롤 제어
    let scrollPosition = 0;
    navMenuCategory.addEventListener("mouseenter", () => {
      // 현재 스크롤 위치를 저장합니다.
      scrollPosition = window.pageYOffset;

      // body를 고정하고 현재 스크롤 위치에 유지합니다.
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll"; // 스크롤바 유지

      navMenuCategory.classList.add("active");
    });

    categoryOverlay.addEventListener("mouseenter", () => {
      navMenuCategory.classList.remove("active");

      // body의 고정된 위치를 해제하고 스크롤 위치로 이동합니다.
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflowY = ""; // 원래 상태로 되돌림

      window.scrollTo(0, scrollPosition);
    });

    navMenuCategory.addEventListener("mouseleave", () => {
      navMenuCategory.classList.remove("active");

      // body의 고정된 위치를 해제하고 스크롤 위치로 이동합니다.
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflowY = ""; // 원래 상태로 되돌림

      window.scrollTo(0, scrollPosition);
    });
  })
  .catch((error) => {
    console.log(error);
  });
