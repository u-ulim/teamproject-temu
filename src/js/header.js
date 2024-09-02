// header.html 파일을 로드하여 #header 안에 삽입
const headerLoad = () => {
  const header = document.querySelector("#header");
  fetch("../../html/components/header.html")
    .then((response) => response.text())
    .then((data) => {
      header.innerHTML = data;

      // header scroll evt
      const headerScrollEvt = () => {
        let lastScrollY = window.scrollY;
        const nav = document.querySelector("nav");
        const threshold = 100; // 50px 이상 스크롤 시만 동작
        let isHeaderHidden = false; // 헤더가 숨겨진 상태인지 추적
        let isScrollingDown = false; // 스크롤 방향 추적

        // 스크롤 처리 로직
        const handleScroll = () => {
          const currentScrollY = window.scrollY;

          // 일정 거리 이상 스크롤할 때만 처리
          if (Math.abs(currentScrollY - lastScrollY) >= threshold) {
            if (currentScrollY > lastScrollY && !isScrollingDown) {
              // 아래로 스크롤: 헤더 숨기기
              nav.classList.add("active");
              isHeaderHidden = true;
              isScrollingDown = true;
            } else if (currentScrollY < lastScrollY && isScrollingDown) {
              // 위로 스크롤: 헤더 보이기
              nav.classList.remove("active");
              isHeaderHidden = false;
              isScrollingDown = false;
            }

            // 마지막 스크롤 위치 업데이트
            lastScrollY = currentScrollY;
          }
        };

        // 스크롤 이벤트에 requestAnimationFrame 사용
        window.addEventListener("scroll", () => {
          window.requestAnimationFrame(handleScroll);
        });
      };
      headerScrollEvt();

      // header top rolling banner
      const headerRollingEvt = () => {
        const rollingBanner = () => {
          const prev = document.querySelector(".header-top__prev");
          prev.classList.remove("header-top__prev");

          const current = document.querySelector(".header-top__current");
          current.classList.remove("header-top__current");
          current.classList.add("header-top__prev");

          const nextItem = document.querySelector(".header-top__next");

          if (nextItem.nextElementSibling == null) {
            const firstItem = document.querySelector(
              ".header-top ul li:first-child"
            );
            firstItem.classList.add("header-top__next");
          } else {
            nextItem.nextElementSibling.classList.add("header-top__next");
          }
          nextItem.classList.remove("header-top__next");
          nextItem.classList.add("header-top__current");
        };

        let interval = setInterval(rollingBanner, 5000);

        const items = document.querySelectorAll(".header-top ul li");
        items.forEach((item) => {
          item.addEventListener("mouseover", () => {
            clearInterval(interval);
          });
          item.addEventListener("mouseout", () => {
            interval = setInterval(rollingBanner, 5000);
          });
        });
      };
      headerRollingEvt();

      // header mobile overflow menu
      const hashContent = document.querySelector(".mobile-menu");
      const listClientWidth = hashContent.clientWidth;
      const listScollWidth = hashContent.clientWidth + 200;

      // 최초 터치 및 마우스다운 지점
      let startX = 0;

      // 현재 이동중인 지점
      let nowX = 0;

      // 터치 종료 지점
      let endX = 0;

      // 두번째 터치 지점
      let listX = 0;

      const getClientX = (e) => {
        return e.touches ? e.touches[0].clientX : e.clientX;
      };

      const getTranslateX = () => {
        return parseInt(
          getComputedStyle(hashContent).transform.split(/[^\-0-9]+/g)[5]
        );
      };

      const setTranslateX = (x) => {
        hashContent.style.transform = `translateX(${x}px)`;
      };

      const onScrollMove = (e) => {
        nowX = getClientX(e);
        setTranslateX(listX + nowX - startX);
      };

      const onScrollEnd = (e) => {
        endX = getClientX(e);
        listX = getTranslateX();
        if (listX > 0) {
          setTranslateX(0);
          hashContent.style.transition = `all 0.1s ease`;
          listX = 0;
        } else if (listX < listClientWidth - listScollWidth) {
          setTranslateX(listClientWidth - listScollWidth);
          hashContent.style.transition = `all 0.1s ease`;
          listX = listClientWidth - listScollWidth;
        }

        window.removeEventListener("touchstart", onScrollStart);
        window.removeEventListener("mousedown", onScrollStart);
        window.removeEventListener("touchmove", onScrollMove);
        window.removeEventListener("mousemove", onScrollMove);
        window.removeEventListener("touchend", onScrollEnd);
        window.removeEventListener("mouseup", onScrollEnd);
      };

      const onScrollStart = (e) => {
        startX = getClientX(e);

        window.addEventListener("touchmove", onScrollMove);
        window.addEventListener("mousemove", onScrollMove);
        window.addEventListener("touchend", onScrollEnd);
        window.addEventListener("mouseup", onScrollEnd);
      };

      hashContent.addEventListener("touchstart", onScrollStart);
      hashContent.addEventListener("mousedown", onScrollStart);
    })
    .catch((error) => console.error("Error loading header:", error));
};

headerLoad();
