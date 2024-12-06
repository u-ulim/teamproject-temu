const btns = document.querySelector(".main__slide-btn");
const rightBtn = document.querySelector(".main__slide-btn-right");
const leftBtn = document.querySelector(".main__slide-btn-left");
// console.log(btns, rightBtn, leftBtn);

const slides = document.querySelector(".main__slides");
const slide = slides.querySelectorAll("li");
// console.log(slides, slide);

const slideCount = slide.length;

const slideWidth = 447;
const slideMargin = 30;

const mainSlidePg = document.querySelector(".number");
// console.log(slideCount, slideWidth, slideMargin);

let currentIdx = 0;

// 슬라이드의 총 페이지 수
const totalPages = slideCount;

// 페이지네이션 업데이트 함수
const updatePagination = () => {
  let currentPage =
    currentIdx >= 0
      ? (currentIdx % slideCount) + 1
      : slideCount + (currentIdx % slideCount);
  mainSlidePg.innerText = `${currentPage} / ${totalPages}`;
};

// 복제한 5개의 li노드를 왼쪽으로 이동시키기 위한 함수(1)
const updateWidth = () => {
  const currentSlides = document.querySelectorAll(".slides li");
  const newSlideCount = currentSlides.length;
  const newWidth = `${
    (slideWidth + slideMargin) * newSlideCount - slideMargin
  }px`;
  slides.style.width = newWidth;
};

// 복제한 5개의 li노드를 왼쪽으로 이동시키기 위한 함수(2)
const setInitialPos = () => {
  const initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
  slides.style.transform = `translateX(${initialTranslateValue}px)`;
};

// li노드를 복제하기 위한 함수
const makeClone = () => {
  for (let i = 0; i < slideCount; i++) {
    const cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.appendChild(cloneSlide);
  }
  for (let i = slideCount - 1; i >= 0; i--) {
    const cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.prepend(cloneSlide);
  }

  updateWidth();
  setInitialPos();
  setTimeout(() => {
    slides.classList.add("animated");
  }, 100);
};

makeClone();

// 버튼 클릭을 통해서 실제 슬라이드를 출력시켜주는 함수
// --------------------------------------
// const moveSlide = (num) => {
//   // console.log(num);

//   slides.style.left = `${-num * (slideWidth + slideMargin)}px`;
//   currentIdx = num;
//   if (currentIdx === slideCount || currentIdx === -slideCount) {
//     setTimeout(() => {
//       slides.classList.remove("animated");
//       slides.style.left = "0px";
//       currentIdx = 0;
//     }, 500);
//     setTimeout(() => {
//       slides.classList.add("animated");
//     }, 600);
//   }
//   updatePagination(); // 페이지네이션 업데이트
// };

// --------------------------------------

const moveSlide = (num) => {
  slides.style.left = `${-num * (slideWidth + slideMargin)}px`;
  currentIdx = num;

  // currentIdx가 slideCount보다 크거나 -slideCount보다 작으면 초기화
  if (currentIdx >= slideCount) {
    setTimeout(() => {
      slides.classList.remove("animated");
      slides.style.left = "0px";
      currentIdx = 0;
    }, 500);
    setTimeout(() => {
      slides.classList.add("animated");
    }, 600);
  } else if (currentIdx <= -slideCount) {
    setTimeout(() => {
      slides.classList.remove("animated");
      slides.style.left = `${-(slideCount - 1) * (slideWidth + slideMargin)}px`;
      currentIdx = slideCount - 1;
    }, 500);
    setTimeout(() => {
      slides.classList.add("animated");
    }, 600);
  }

  updatePagination(); // 페이지네이션 업데이트
};

// 초기 페이지네이션 상태 업데이트
updatePagination();

// 버튼 클릭 이벤트 함수
// moveSlide(currentIdx + 1);

rightBtn.addEventListener("click", () => {
  // console.log("click");
  moveSlide(currentIdx + 1);
});

leftBtn.addEventListener("click", () => {
  console.log("click");
  moveSlide(currentIdx - 1);
  // mainSlidePg.innerText = `${currentIdx + 1} / 4`;
});

// 자동슬라이드 및 정지기능 함수

let timer = undefined;

const autoSlide = () => {
  if (timer === undefined) {
    timer = setInterval(() => {
      moveSlide(currentIdx + 1);
    }, 3000);
  }
};

autoSlide();

const stopSlide = () => {
  clearInterval(timer);
  timer = undefined;
};

slides.addEventListener("mouseenter", () => {
  stopSlide();
});

slides.addEventListener("mouseleave", () => {
  autoSlide();
});

btns.addEventListener("mouseenter", () => {
  stopSlide();
});

btns.addEventListener("mouseleave", () => {
  autoSlide();
});

const cartItemFirst = document.querySelector(
  ".cart__wrapper .cart__item-first"
);
const cartItemSecon = document.querySelector(
  ".cart__wrapper .cart__item-second"
);
const cartItemThird = document.querySelector(
  ".cart__wrapper .cart__item-third"
);

const goToCartPageHandler = (e) => {
  console.log(e.target.value);
};

const cartItems = document.querySelectorAll(
  ".cart__wrapper .cart__item-first, .cart__wrapper .cart__item-second, .cart__wrapper .cart__item-third"
);

cartItems.forEach((cartItem) => {
  cartItem.addEventListener("click", (e) => {
    const user = JSON.parse(localStorage.getItem("users"));

    if (!user) {
      e.preventDefault();
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      window.location.href = "/html/components/login.html";
    } else {
      // user 정보가 있으면 카트 페이지로 이동
      window.location.href = "/html/components/Productcart.html";
    }
  });
});

// 화면 크기 확인
if (window.innerWidth <= 768) {
  const cartContent = document.querySelector(".cart__wrapper");

  // 래퍼의 넓이 정보
  const containerClientWidth = cartContent.clientWidth;
  const containerScrollWidth = cartContent.scrollWidth;

  let startX = 0; // 터치 시작 지점
  let nowX = 0; // 현재 이동 중인 지점
  let endX = 0; // 터치 종료 지점
  let scrollX = 0; // 스크롤 위치
  let isDragging = false; // 드래그 상태 확인

  console.log(startX);

  // 터치 및 마우스 이벤트에서 X 위치 가져오기
  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  // X 좌표를 기준으로 이동 거리 계산
  const onScrollMove = (e) => {
    if (!isDragging) return;

    nowX = getClientX(e);
    const diff = nowX - startX; // 이동 거리
    const newScrollX = scrollX - diff; // 새로운 스크롤 위치 계산

    // 경계값 처리
    if (newScrollX <= 0) {
      cartContent.scrollLeft = 0;
    } else if (newScrollX >= containerScrollWidth - containerClientWidth) {
      cartContent.scrollLeft = containerScrollWidth - containerClientWidth;
    } else {
      cartContent.scrollLeft = newScrollX;
    }
  };

  // 드래그 종료 처리
  const onScrollEnd = () => {
    isDragging = false;
    scrollX = cartContent.scrollLeft; // 현재 스크롤 위치 저장
    window.removeEventListener("touchmove", onScrollMove);
    window.removeEventListener("mousemove", onScrollMove);
    window.removeEventListener("touchend", onScrollEnd);
    window.removeEventListener("mouseup", onScrollEnd);
  };

  // 드래그 시작 처리
  const onScrollStart = (e) => {
    startX = getClientX(e); // 터치 시작 위치 저장
    isDragging = true;
    window.addEventListener("touchmove", onScrollMove);
    window.addEventListener("mousemove", onScrollMove);
    window.addEventListener("touchend", onScrollEnd);
    window.addEventListener("mouseup", onScrollEnd);
  };

  // 터치 및 마우스 이벤트 추가
  if (cartContent) {
    cartContent.addEventListener("touchstart", onScrollStart);
    cartContent.addEventListener("mousedown", onScrollStart);
  }
}
