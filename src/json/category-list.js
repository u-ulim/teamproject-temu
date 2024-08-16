// JSON 데이터 변수
console.log("hi");
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
  })
  .catch((error) => {
    console.log(error);
  });

// 마우스 오버 시 카테고리 리스트 출력
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
