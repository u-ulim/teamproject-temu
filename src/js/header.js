// header.html 파일을 로드하여 #header 안에 삽입
const headerLoad = () => {
  const header = document.querySelector("#header");
  fetch("../../html/components/header.html")
    .then((response) => response.text())
    .then((data) => {
      header.innerHTML = data;

      // header scroll Evt
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

      // header search Evt
      const searchInput = document.querySelector(".nav__input-wrapper input");
      const searchButton = document.querySelector(".nav__input-wrapper i");

      const searchEvt = () => {
        const searchQuery = searchInput.value.trim();
        if (searchQuery) {
          const url = `/html/components/search-results.html?query=${encodeURIComponent(
            searchQuery
          )}`;
          window.location.href = url;
        } else {
          alert("검색어를 입력하세요!");
        }
      };

      searchButton.addEventListener("click", searchEvt);
      searchInput.addEventListener("keypress", (e) => {
        if (e.key == "Enter") {
          searchEvt();
        }
      });

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

      // category menu Evt
      // JSON 데이터 변수
      const categoryURL =
        "https://raw.githubusercontent.com/u-ulim/temu-products/main/test.json";

      // JSON 데이터 패치하기
      fetch(categoryURL)
        .then((response) => response.json())
        .then((data) => {
          // HTML 요소 선택

          const tabsContainer = document.querySelector(".submenu-tabs ul");
          const contentContainer = document.querySelector(".submenu-content");

          // JSON 데이터를 기반으로 카테고리와 서브 카테고리 생성
          data.categories.forEach((category, index) => {
            // 카테고리 탭 생성
            // console.log(category, index);
            const tabLi = document.createElement("li");
            const tabSpan = document.createElement("span");
            const tabIco = document.createElement("i");
            tabIco.innerHTML = `
            <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>`;
            tabLi.append(tabSpan, tabIco);
            tabSpan.innerText = category.title;

            tabLi.setAttribute("data-tab", `tab-${index}`);
            tabsContainer.appendChild(tabLi);
            // 첫 번째 탭에 active 클래스 추가
            // if (index === 0) {
            //   tab.classList.add("active");
            // }

            // 서브 카테고리 콘텐츠 생성
            const contentDiv = document.createElement("div");
            contentDiv.classList.add("content");
            contentDiv.setAttribute("id", `tab-${index}`);

            // 첫 번째 콘텐츠에 active 클래스 추가
            // if (index === 0) {
            //   contentDiv.classList.add("active");
            // }

            for (const subKey in category.sub) {
              if (category.sub.hasOwnProperty(subKey)) {
                const subCategory = category.sub[subKey];

                const subItem = document.createElement("div");
                subItem.classList.add("sub-item");

                const imgWrapper = document.createElement("div");
                subItem.appendChild(imgWrapper);

                const img = document.createElement("img");
                img.src = subCategory.img;
                imgWrapper.appendChild(img);

                const subtitle = document.createElement("p");
                subtitle.textContent = subCategory.subtitle;
                subItem.appendChild(subtitle);

                contentDiv.appendChild(subItem);
              }
            }
            contentContainer.appendChild(contentDiv);
          });

          // 맵핑 한 데이터 출력
          const createItem = (category) => {};

          // 받아온 데이터 맵핑
          const importData = () => {
            data.categories.map((category) => {
              createItem(category);
            });
          };
          importData();

          // // 마우스 오버 시 카테고리 리스트 출력
          // // const tabs = document.querySelector(".submenu-tabs");
          // const navMenuCategory = document.querySelector(".nav-menu__category");
          // const categoryOverlay = document.querySelector(".category-overlay");
          // // 마우스 오버시 카테고리에 맞게끔 서브 카테고리가 나오게끔 설정
          // document.querySelectorAll(".submenu-tabs li").forEach((tabLi) => {
          //   tabLi.addEventListener("mouseover", function () {
          //     // 모든 탭에서 활성화 클래스 제거
          //     document
          //       .querySelectorAll(".submenu-tabs li")
          //       .forEach((t) => t.classList.remove("active"));

          //     // 현재 탭에 활성화 클래스 추가
          //     this.classList.add("active");

          //     // 모든 콘텐츠에서 활성화 클래스 제거
          //     document
          //       .querySelectorAll(".submenu-content .content")
          //       .forEach((content) => {
          //         content.classList.remove("active");
          //       });

          //     // 현재 탭과 연결된 콘텐츠를 활성화
          //     const tabContentId = this.getAttribute("data-tab");
          //     document.getElementById(tabContentId).classList.add("active");
          //   });
          // });
          // 모든 탭 요소를 선택
          const tabs = document.querySelectorAll(".submenu-tabs li");
          const contents = document.querySelectorAll(
            ".submenu-content .content"
          );

          // 첫 번째 탭과 콘텐츠에 active 클래스 추가
          if (tabs.length > 0) {
            tabs[0].classList.add("active");
          }
          if (contents.length > 0) {
            contents[0].classList.add("active");
          }

          // 마우스 오버 시 카테고리 탭 활성화 및 서브 카테고리 표시
          tabs.forEach((tabLi) => {
            tabLi.addEventListener("mouseover", function () {
              // 모든 탭에서 활성화 클래스 제거
              tabs.forEach((t) => t.classList.remove("active"));

              // 현재 탭에 활성화 클래스 추가
              this.classList.add("active");

              // 모든 콘텐츠에서 활성화 클래스 제거
              contents.forEach((content) => content.classList.remove("active"));

              // 현재 탭과 연결된 콘텐츠를 활성화
              const tabContentId = this.getAttribute("data-tab");
              document.getElementById(tabContentId).classList.add("active");
            });
          });

          // 카테고리 마우스 이벤트 시, 오버레이가 생기고 사라지며 스크롤 제어
          let scrollPosition = 0;
          const navMenuCategory = document.querySelector(".nav-menu__category");
          const categoryOverlay = document.querySelector(".category-overlay");
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
    })
    .catch((error) => console.error("Error loading header:", error));
};

headerLoad();
