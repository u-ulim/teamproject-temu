// document.addEventListener("DOMContentLoaded", function () {
//   const categoryList = document.querySelector(".category__list");
//   const listItems = Array.from(document.querySelectorAll(".category__list li"));
//   const itemWidth = listItems[0].offsetWidth + 30; // 각 항목의 너비 + 간격(30px)

//   // 양쪽에 항목을 복사하여 자연스러운 무한 슬라이드처럼 보이게 함
//   const cloneFirst = listItems.slice(0, 3); // 첫 3개 항목 복사
//   const cloneLast = listItems.slice(-3); // 마지막 3개 항목 복사

//   // 복사한 항목을 리스트 앞과 뒤에 추가
//   cloneFirst.forEach((item) => categoryList.appendChild(item.cloneNode(true)));
//   cloneLast.forEach((item) =>
//     categoryList.insertBefore(item.cloneNode(true), categoryList.firstChild)
//   );

//   let currentIndex = listItems.length; // 처음에 복사된 첫 번째 항목을 넘어서 시작
//   const totalItems = categoryList.children.length;

//   // 슬라이드를 이동시키는 함수
//   const slideItems = (newIndex) => {
//     categoryList.style.transition = "transform 0.5s ease"; // 슬라이드 애니메이션 적용
//     categoryList.style.transform = `translateX(${-newIndex * itemWidth}px)`; // 새로운 위치로 이동
//     currentIndex = newIndex;
//   };

//   // 슬라이드 끝에서 눈속임을 위한 처리
//   const resetSlidePosition = () => {
//     if (currentIndex >= totalItems - 3) {
//       // 끝에 도달하면 처음으로 이동
//       categoryList.style.transition = "none"; // 애니메이션 없이 이동
//       categoryList.style.transform = `translateX(${
//         -listItems.length * itemWidth
//       }px)`;
//       currentIndex = listItems.length;
//       setTimeout(
//         () => (categoryList.style.transition = "transform 0.5s ease"),
//         50
//       ); // 짧은 지연 후 다시 애니메이션 활성화
//     } else if (currentIndex <= 0) {
//       // 처음에 도달하면 끝으로 이동
//       categoryList.style.transition = "none"; // 애니메이션 없이 이동
//       categoryList.style.transform = `translateX(${
//         -listItems.length * itemWidth
//       }px)`;
//       currentIndex = listItems.length;
//       setTimeout(
//         () => (categoryList.style.transition = "transform 0.5s ease"),
//         50
//       ); // 짧은 지연 후 다시 애니메이션 활성화
//     }
//   };

//   // 자동 슬라이드 함수
//   const startAutoSlide = () => {
//     setInterval(() => {
//       slideItems(currentIndex + 1);
//       resetSlidePosition(); // 슬라이드 끝에서 위치 재설정
//     }, 3000); // 3초마다 슬라이드
//   };

//   // 처음에 슬라이드 위치 설정
//   categoryList.style.transform = `translateX(${
//     -listItems.length * itemWidth
//   }px)`;

//   // 자동 슬라이드 시작
//   startAutoSlide();
// });

////////////////

document.addEventListener("DOMContentLoaded", function () {
  // slick slider
  // Slick Slider 초기화
  $(".auto__slider").slick({
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    infinite: true,
  });

  const categoryItems = document.querySelectorAll(".auto__slider li");
  console.log(categoryItems);

  const tabSearchEvt = function (text) {
    const searchQuery = text.replace(/[^\w\sㄱ-힣]|_/g, "").trim();

    if (searchQuery) {
      // 검색어를 LocalStorage에 저장
      localStorage.setItem("searchQuery", searchQuery);

      // 검색 결과 페이지로 이동
      const url = `/html/components/search-results.html?query=${encodeURIComponent(
        searchQuery
      )}`;
      window.location.href = url;
    } else {
      alert("검색어를 입력하세요!");
    }
  };

  categoryItems.forEach((categoryItem) => {
    categoryItem.addEventListener("click", function () {
      console.log(categoryItem);
      const text = this.querySelector("span").innerText;
      console.log(text);
      tabSearchEvt(text);
    });
  });
});
