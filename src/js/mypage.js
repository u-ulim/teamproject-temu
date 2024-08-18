// // Accordion Event
// const inner = document.querySelectorAll(".inner");
// firstContent[0].style.display = "flex";

// const titles = document.querySelectorAll(".inner");
// titles.forEach(() => {
//   title.addEventListener("click", () => {
//     document.querySelectorAll(".content").forEach((item) => {
//       item.style.display = "none";
//     });

//     titles.forEach((otherTitle) => {
//       if (otherTitle !== title) {
//         otherTitle.classList.remove("active");
//       }
//     });

//     let content = title.nextElementSibling;
//     if (title.classList.contains("active")) {
//       title.classList.remove("active");
//       content.style.display = "none";
//     } else {
//       title.classList.add("active");
//       content.style.display = "block";
//     }
//   });
// });

// // 모든 '.inner' 요소들을 선택합니다.
// const innerElements = document.querySelectorAll(".inner");

// // 첫 번째 항목의 content를 기본적으로 표시하도록 설정합니다.
// innerElements[0].querySelector(".content").style.display = "block";
// innerElements[0].classList.add("active");

// 각 '.inner' 요소에 대해 이벤트 리스너를 추가합니다.
innerElements.forEach((inner) => {
  const title = inner.querySelector(".title");
  //   const content = inner.querySelector(".content");

  inner.addEventListener("click", () => {
    // 모든 content를 숨기고, active 클래스를 제거합니다.
    innerElements.forEach((inner) => {
      const otherContent = otherInner.querySelector(".inner");
      if (otherInner !== inner) {
        otherContent.style.display = "none";
        otherInner.classList.remove("active");
      }
    });

    // 클릭된 title에 따라 content를 토글합니다.
    if (inner.classList.contains("active")) {
      // fa-chevron-down.style.display = "none";
      fa - chevron - down.classList.remove("active");
    } else {
      content.style.display = "block";
      inner.classList.add("active");
    }
  });
});
