const productsURL =
  "https://raw.githubusercontent.com/u-ulim/temu-products/main/test.json";

fetch(productsURL)
  .then((response) => response.json())
  .then((data) => {
    const products = {
      data: data.products.map((item) => ({
        ...item,
      })),
    };

    const createItem = (product) => {
      // 다음부터는 구조분해 할당을 쓸 것.
      // star 카운팅
      let mainReivewStars = "";
      for (let i = 0; i < 5; i++) {
        if (i < Math.round(product.rating)) {
          mainReivewStars += '<li class="active"></li>'; // 'active' 클래스가 있는 별
        } else {
          mainReivewStars += "<li></li>"; // 빈 별
        }
      }

      // number 숫자로 변환
      const price = new Intl.NumberFormat("ko-kr", {}).format(product.price);
      const beforePrice = new Intl.NumberFormat("ko-kr", {}).format(
        product.details.beforePrice
      );
      const credit = new Intl.NumberFormat("ko-kr", {}).format(
        product.details.credit
      );

      // select와 option 변환
      // select와 option을 동적으로 생성하는 함수
      const createSelectOptions = (optionData) => {
        let selectHTML = "";

        // optionData 내의 각각의 select를 순회하며 select 및 option 요소를 생성
        Object.keys(optionData).forEach((key) => {
          const { label, options } = optionData[key];

          // select 태그 시작
          selectHTML += `<select id="${key}" name="${key}">`;

          // 각 옵션을 순회하면서 option 태그 추가
          options.forEach((option) => {
            selectHTML += `<option value="${option}">${option}</option>`;
          });

          // select 태그 닫기
          selectHTML += "</select><br/>";
        });

        return selectHTML;
      };

      // innerHTML으로 ELEMENT들 동적으로 생성
      createDetail.innerHTML = `
      <div class="detail__left-box">
        <main id="main">
        <section id="detail__bradcrumb-container">
          <ul class="detail-bradcrumbs">
            <li>
              <a href="#">${product.details.breadCrumb[0]}</a>
              <i class="fa-solid fa-chevron-right"></i>
            </li>
            <li>
              <a href="#">${product.details.breadCrumb[1]}</a>
              <i class="fa-solid fa-chevron-right"></i>
            </li>
            <li>
              <a href="#">${product.details.breadCrumb[2]}</a>
            </li>
          </ul>
        </section>
        <section id="detail__main-container">
        <div class="detail__main-imgbox">
          <ul class="detail__main-imgs">
            <li>
              <div>
                <img
                  src="${product.details.imgsF}"
                  alt="${product.title}"
                />
              </div>
            </li>
            <li>
              <div>
                <img
                  src="${product.details.imgsS}"
                  alt="${product.title}"
                />
              </div>
            </li>
            <li>
              <div>
                <img
                  src="${product.details.imgsT}"
                  alt="${product.title}"
                />
              </div>
            </li>
            <li>
              <div>
                <img
                  src="${product.details.imgsFour}"
                  alt="${product.title}"
                />
              </div>
            </li>
          </ul>
          <div>
            <img src="${product.thumbnail}" alt="${product.title}" />
          </div>
        </div>
        <div class="detail__main-contentsbox">
          <div class="detail__main-contentsbox-provider">${
            product.details.provider
          }</div>
          <div class="detail__main-contentsbox-title">
            <h1>${product.title}</h1>
            <div>
              <div>
                <i></i>
                <span>${product.reviewCount}</span>
              </div>
              <i></i>
            </div>
          </div>
          <div class="detail__main-contentsbox-reviews">
            <ul>
              ${mainReivewStars}
            </ul>
            <span>${product.reviewCount}개 리뷰</span>
          </div>
          <div class="detail__main-contentsbox-counters">
            <span>${product.discountRate}%</span>
            <strike>${beforePrice}원</strike>
            <div>${product.details.deadlineTime}</div>
          </div>
          <div class="detail__main-contentsbox-price">
            <h2><span>${price}</span>원</h2>
            <i></i>
          </div>
          <div class="detail__main-contentsbox-infotxt">
            Temu 제품 가격은 관세 등을 포함하고 있어 고객에게 추가적인 비용이
            발생하지 않습니다.
          </div>
          <div class="detail__main-contentsbox-delivery-infos">
            <h4>배송</h4>
            <ul>
              <li>무료배송</li>
              <li>
                배송 예정:
                <span class="delivery-date">${
                  product.details.deliveryEstimate
                }</span>,
                ${product.details.deliveryProbability}
              </li>
              <li>
                배송 업체: <span>${product.details.deliveryCompany}</span>
              </li>
              <li><i></i> <span>배송 지연 시 ₩${credit} 크레딧 지급</span></li>
              <li>
                <i></i>
                배송 문제: 상품이 손상된 경우 반품, 30일 이내 미배송시 환불
              </li>
            </ul>
          </div>
          <div class="detail__main-contentsbox-brand">
            <div><i></i>${product.details.provider}</div>
            <button>
              브랜드홈 <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          <div class="detail__main-contentsbox-select">
           
            <h3>주문금액</h3>
            <div>
              <button class="select-cart-btn">장바구니</button>
              <button class="select-buy-btn">바로구매</button>
            </div>
          </div>
        </div>
      </section>
      </main>
      <section id="product-detail__container">
      <div class="product-detail__header">
          <ul>
            <li><a class="active" href="#detail-headers " data-target="detail-headers">상품정보</a></li>
            <li><a href="#reviews__counters" data-target="reviews__counters">리뷰<span>${
              product.reviewCount
            }</span></a></li>
            <li><a href="#reviews__contacts" data-target="reviews__contacts">문의<span>${
              product.details.contactCount
            }</span></a></li>
            <li><a href="#detail__delivery" data-target="detail__delivery">배송/환불</a></li>
            <li><a href="#detail__product-list" data-target="detail__product-list">추천</a></li>
          </ul>
        </div>
        <div class="product-detail__clearance" id="detail-headers">
          <img src="" alt="" />
        </div>
        <div class="product-detail__imgs">
          <div class="product-detail__imgs-main">
            <img src="${product.details.imgsF}" alt="" />
          </div>
          <div class="product-detail__imgs-secon">
            <div>
              <img src="${product.details.imgsS}" alt="" />
            </div>
            <div>
              <img src="${product.details.imgsT}" alt="" />
            </div>
          </div>
          <div class="product-detail__imgs-third">
            <div>
              <img src="${product.details.imgsF}" alt="" />
            </div>
            <div>
              <img src="${product.details.imgsS}" alt="" />
            </div>
            <div>
              <img src="${product.details.imgsT}" />
            </div>
          </div>
        </div>
        <div class="product-detail__reviews" id="detail-reviews">
            <div class="reviews__counters" id="reviews__counters">
              <div class="counters__header">
                <div class="counters__header__left">
                  <span>리뷰</span>
                  <p>${product.reviewCount}</p>
                </div>
                <div class="counters__header__right">
                  <div><i></i>모든 리뷰는 구매 인증 후 작성 되었습니다.</div>
                  <span>리뷰쓰기</span>
                </div>
              </div>
              <div class="reviews__counter">
                <div class="reviews__counter-leftBox">
                  <ul>
                 ${mainReivewStars}
                  </ul>
                  <span>${product.rating}</span>
                </div>
                <div class="reviews__counter-rightBox">
                  <ul>
                    <li>
                      <span>5점</span>
                      <span class="counter-progressbar"></span>
                      <span>${product.details.reviewStarOne}</span>
                    </li>
                    <li>
                      <span>4점</span>
                      <span class="counter-progressbar"></span>
                      <span>${product.details.reviewStarTwo}</span>
                    </li>
                    <li>
                      <span>3점</span>
                      <span class="counter-progressbar"></span>
                      <span>${product.details.reviewStarThree}</span>
                    </li>
                    <li>
                      <span>2점</span>
                      <span class="counter-progressbar"></span>
                      <span>${product.details.reviewStarFour}</span>
                    </li>
                    <li>
                      <span>1점</span>
                      <span class="counter-progressbar"></span>
                      <span>${product.details.reviewStarFive}</span>
                    </li>
                  </ul>
                </div>
              </div>       
              <div class="reviews__comments">
              <div class="comments__header">
                <ul>
                  <li>베스트순</li>
                  <li>최신순</li>
                </ul>
                <div>
                  <select name="별점" id="">
                    <option value="별점">별점</option>
                    <option value="">5점</option>
                    <option value="">4점</option>
                    <option value="">3점</option>
                    <option value="">2점</option>
                    <option value="">1점</option>
                  </select>
                  <select name="국가" id="">
                    <option value="국가">국가</option>
                    <option value="">KR</option>
                    <option value="">CN</option>
                    <option value="">JP</option>
                  </select>
                </div>
              </div>
              <ul class="comments__contents">
               
              </ul>
            </div>  
          </div>
          <div class="product-detail__contacts" id="reviews__contacts">
            <div class="contacts__header">
              <div class="contacts__header__left">
                <span>문의사항</span>
                <p>${product.details.contactCount}</p>
              </div>
              <div class="contacts__header__right">
                <div><i></i>부적절한 단어들을 실시간 모니터링중입니다.</div>
                <span>문의하기</span>
              </div>
            </div>
            <div class="contacts__contents">
              <ul>
                
              </ul>
            </div>
          </div>
          <div class="product-detail__delivery" id="detail__delivery">
            <div class="delivery__header">
              <div class="delivery__header__left">
                <span>배송정보</span>
              </div>
              <div class="delivery__header__right">
                <div class="delivery__header__right-title">
                  <i></i>모든 주문에 무료배송을 포함하고 있습니다
                </div>
                <span>서비스 보증</span>
                <div class="delivery__modal-container">
                  <div>
                    <h3>서비스 보증</h3>
                    <span>X</span>
                    <ul>
                      <li>
                        <div>
                          <div>
                            <i>icon</i>
                            <span>90일 이내 무료 반품</span>
                          </div>
                          <a href="#"
                            >반품 정책 전문 읽기
                            <i>></i>
                          </a>
                        </div>
                        <ul>
                          <li>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Et odio earum velit id, ad obcaecati
                              repellendus accusantium optio eveniet mollitia
                              doloribus corporis veniam quia est, cumque
                              consequuntur! Aliquam, atque nulla!
                            </p>
                          </li>
                          <li>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Et odio earum velit id, ad obcaecati
                              repellendus accusantium optio eveniet mollitia
                              doloribus corporis veniam quia est, cumque
                              consequuntur! Aliquam, atque nulla!
                            </p>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <div>
                          <div>
                            <i>icon</i>
                            <span>30일 이내 가격 조정</span>
                          </div>
                          <a href="#"
                            >가격 정책 전문 읽기
                            <i>></i>
                          </a>
                        </div>
                        <ul>
                          <li>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Et odio earum velit id, ad obcaecati
                              repellendus accusantium optio eveniet mollitia
                              doloribus corporis veniam quia est, cumque
                              consequuntur! Aliquam, atque nulla!
                            </p>
                          </li>
                          <li>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Et odio earum velit id, ad obcaecati
                              repellendus accusantium optio eveniet mollitia
                              doloribus corporis veniam quia est, cumque
                              consequuntur! Aliquam, atque nulla!
                            </p>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="delivery__table">
              <ul>
                <li>
                  <h5>배송 방식</h5>
                  <span>일반택배</span>
                </li>
                <li>
                  <h5>배송 비용</h5>
                  <span>무료배송</span>
                </li>
                <li>
                  <h5>배송 시간</h5>
                  <span>6 ~ 14일</span>
                </li>
              </ul>
            </div>
            <div class="delivery__info">
              <ul>
                <li>
                  <h4>배송옵션</h4>
                  <p>
                    주문하신 상품과 지역에 따라 일반 배송을 선택할 수 있습니다.
                    주문이 최종 배송 단계에서 현지 배송업체로 전달될 수 있으므로
                    일부 단계에서 배송 추적이 제공되지 않을 수 있습니다.
                  </p>
                </li>
                <li>
                  <h4>배송주소</h4>
                  <p>
                    배송 및 배송을 위해 올바른 현재 주소를 제공했는지
                    확인하십시오. P.O를 사용할 수 있습니다. 배송 주소로 상자.
                    하지만 특정 품목은 실제 주소로만 배송될 수 있습니다. 대형
                    제품, 귀중품, 부패하기 쉬운 제품, 연령 제한이 있는 제품 또는
                    개인 운송업체를 통해 배송되는 품목의 경우 실제 우편 주소나
                    서명 확인이 필요할 수 있습니다. 상품 파트너는 제품 목록에
                    P.O.로 제품을 배송할 수 없다고 표시할 수도 있습니다. 상자.
                    군부대 등 보안이 제한된 지역으로는 물품을 배송할 수
                    없습니다.
                  </p>
                </li>
                <li>
                  <h4>배송주소</h4>
                  <p>
                    1) 주문이 성공적으로 결제 및 확정되면 주문 확인 페이지에
                    예상 배송 시간과 배송 비용이 표시됩니다. 또한 주문에 대한
                    예상 처리 시간을 간략하게 설명하는 주문 확인 메시지를 받게
                    됩니다.
                  </p>
                  <br />

                  <p>
                    2) 창고에서 주문을 처리하는 데 1~3일이 소요될 수 있습니다.
                    주문이 발송되면 메시지를 받게 됩니다.
                  </p>
                  <br />
                  <p>
                    3) 발송이 완료되면 택배의 예상 배송 시간을 알려주는 배송
                    알림 메시지를 받게 됩니다. 배송이 준비되면 추적 번호도
                    전달드립니다. 주문 내역의 택배 항목 아래에서 예상 배송
                    시간을 동시에 확인할 수 있습니다.
                  </p>
                  <br />

                  <p>
                    4) 대부분의 경우 주문은 예상 배송 시간 내에 배송됩니다.
                    그러나 실제 배송 날짜는 항공편 일정, 기상 조건 및 기타 외부
                    요인에 의해 영향을 받을 수 있습니다. 가장 최신의 배송 날짜는
                    배송 추적 정보를 참조하시기 바랍니다.
                  </p>
                </li>
                <li>
                  <h4>배달과 관련된 문제</h4>
                  <p>
                    택배가 배송되지 않았거나 추적 정보에 택배가 배달된 것으로
                    표시되지만 받지 못한 경우, 주문일로부터 90일 이내에 즉시
                    고객 센터에 문의하시기 바랍니다.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="product-detail__product-lists" id="detail__product-list">
            <div class="product-lists__header">
              <div class="product-lists__header__left">
                <span>추천</span>
              </div>
              <div class="product-lists__header__right">
                <div>
                  <i></i>이 제품을 선택한 고객들이 자주 봤던 상품입니다.
                </div>
              </div>
            </div>
            <div id="product-list"></div>
          </div>
      </section>
    </div>
    <div class="detail__right-box close">
    <div class="detail__main-contentsbox">
    <div class="detail__main-contentsbox-provider">${
      product.details.provider
    }</div>
    <div class="detail__main-contentsbox-title">
      <h1>${product.title}</h1>
      <div>
        <div>
          <i></i>
          <span>${product.reviewCount}</span>
        </div>
        <i></i>
      </div>
    </div>
    <div class="detail__main-contentsbox-reviews">
      <ul>
        ${mainReivewStars}
      </ul>
      <span>${product.reviewCount}개 리뷰</span>
    </div>
    <div class="detail__main-contentsbox-counters">
      <span>${product.discountRate}%</span>
      <strike>${beforePrice}원</strike>
      <div>${product.details.deadlineTime}</div>
    </div>
    <div class="detail__main-contentsbox-price">
      <h2><span>${price}</span>원</h2>
      <i></i>
    </div>
    <div class="detail__main-contentsbox-infotxt">
      Temu 제품 가격은 관세 등을 포함하고 있어 고객에게 추가적인 비용이
      발생하지 않습니다.
    </div>
    <div class="detail__main-contentsbox-delivery-infos">
      <h4>배송</h4>
      <ul>
        <li>무료배송</li>
        <li>
          배송 예정:
          <span class="delivery-date">${
            product.details.deliveryEstimate
          }</span>,
          ${product.details.deliveryProbability}
        </li>
        <li>
          배송 업체: <span>${product.details.deliveryCompany}</span>
        </li>
        <li><i></i> <span>배송 지연 시 ₩${credit} 크레딧 지급</span></li>
        <li>
          <i></i>
          배송 문제: 상품이 손상된 경우 반품, 30일 이내 미배송시 환불
        </li>
      </ul>
    </div>
    <div class="detail__main-contentsbox-brand">
      <span>구매하기
      <i class="fa-solid fa-chevron-up" aria-hidden="true"></i></span>
      <div><i></i>${product.details.provider}</div>
      <button>
        브랜드홈 <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
    <div class="detail__main-contentsbox-select">
      <form>
        <div class="detail__main-contentsbox-selects">
          ${createSelectOptions(product.details.selectOptions)}
        </div>
        <div class="detail__main-contentsbox-btns">
          <h3>주문금액 <span>${price}원</span></h3>
          <div>
           <button type="submit" class="select-cart-btn">장바구니</button>
            
          </div>
        </div>
      </form>
    </div>
  </div>
  </div>
    `;

      // 마우스 오버시 이미지 체인지
      const detailMainImgs = document.querySelectorAll(
        ".detail__main-imgs > li > div > img"
      );
      const imgChangeHandler = (img) => {
        return (e) => {
          const detailMainImg = document.querySelector(
            ".detail__main-imgbox > div > img"
          );
          detailMainImgs.forEach((img) => {
            img.style.border = "";
          });

          // 페이드 아웃 효과
          detailMainImg.classList.add("fade-out");
          img.style.border = "2px solid #222";

          // 이미지가 페이드 아웃된 후 src를 변경하고 페이드 인 효과를 적용
          setTimeout(() => {
            detailMainImg.src = img.src;
            detailMainImg.classList.remove("fade-out");
          }, 100); // transition 시간과 일치하게 설정
        };
      };

      detailMainImgs.forEach((img) => {
        // img.addEventListener("mouseover", imgChangeHandler(img));
        img.addEventListener("click", imgChangeHandler(img));
      });

      // reviews안에 내용 넣기
      const commentContents = document.querySelector(".comments__contents");
      product.details.reviews.users.forEach((user) => {
        const reviewsLi = document.createElement("li");

        reviewsLi.innerHTML = `
          <div class="comment__profile">
            <div>
              <img src="${user.profileImage}"/>
            </div>
            <p>${user.profileName}</p>
            <span>${user.country}</span>
          </div>
          <div class="comment__stars">
            <ul>
            ${mainReivewStars}
            </ul>
            <div>${user.reviewDate}</div>
          </div>
          <div class="comment__text">
            ${user.comment}
          </div>
        `;
        commentContents.appendChild(reviewsLi);
      });

      // contact안에 내용 넣기
      const contactContents = document.querySelector(
        ".contacts__contents > ul"
      );
      product.details.contacts.users.forEach((user) => {
        const contactLi = document.createElement("li");
        contactLi.innerHTML = `
          <div class="contacts__contents__check">
            <span>구매</span>
            <span>배송</span>
            <span>답변완료</span>
          </div>
          <div class="contacts__contents__info">
            <span>${user.userName}</span> <span>${user.writeDate}</span>
          </div>
          <div class="contacts__contents__question">
            <span>Q</span>
            <i>
            <p>${user.question}</p>
          </div>
          <div class="contacts__contents__answer">
            <span>A</span>
            <div>
              <span>${product.details.provider}</span>
              <p>
              ${user.answer}
              </p>
            </div>
          </div>
        `;
        contactContents.appendChild(contactLi);
      });

      // 상품 추가 시 가격 합산
      let multiplePrice;
      let sumPrice = document.querySelector(
        ".detail__right-box .detail__main-contentsbox-select > form > .detail__main-contentsbox-btns > h3 > span"
      );
      let quan = 1;
      const selectQuantityElement = document.querySelector(
        ".detail__right-box .detail__main-contentsbox-selects >  #selectQuantity"
      );
      selectQuantityElement.addEventListener("change", (e) => {
        quan = e.target.value;

        const priceNoComma = price.replace(/,/g, "");
        multiplePrice = new Intl.NumberFormat("ko-kr", {}).format(
          priceNoComma * quan
        );
        // sumPrice.innerText = price * quan;
        sumPrice.innerText = `${multiplePrice}원`;
      });
      multiplePrice = Number(sumPrice.innerText.replace(/원|,/g, ""));

      // scroll evt
      const rightBoxScrollEvt = () => {
        let lastScrollY = window.scrollY;
        const threshold = 100; // 100px 이상 스크롤 시만 동작
        let isHeaderHidden = false; // 헤더가 숨겨진 상태인지 추적
        let isScrollingDown = false; // 스크롤 방향 추적
        const detailMainContentsbox = document.querySelector(
          ".detail__right-box > .detail__main-contentsbox"
        );
        const productDetailHeader = document.querySelector(
          ".detail__left-box .product-detail__header"
        );

        // right-box 스크롤 처리 로직
        const handleScroll = () => {
          const currentScrollY = window.scrollY;
          // 일정 거리 이상 스크롤할 때만 처리
          if (Math.abs(currentScrollY - lastScrollY) >= threshold) {
            if (currentScrollY > lastScrollY && !isScrollingDown) {
              // 아래로 스크롤: 헤더 숨기기
              detailMainContentsbox.classList.remove("active");
              productDetailHeader.classList.remove("active");
              isHeaderHidden = true;
              isScrollingDown = true;
            } else if (currentScrollY < lastScrollY && isScrollingDown) {
              // 위로 스크롤: 헤더 보이기
              detailMainContentsbox.classList.add("active");
              productDetailHeader.classList.add("active");
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
      rightBoxScrollEvt();

      // detail menu 클릭, 스크롤시, active 및 페이지 내 이동
      const productDetailHeaderMenus = document.querySelectorAll(
        ".product-detail__header > ul > li > a"
      );
      productDetailHeaderMenus.forEach((menu) => {
        menu.addEventListener("click", (e) => {
          e.preventDefault();
          productDetailHeaderMenus.forEach((m) => {
            m.classList.remove("active");
          });

          menu.classList.add("active");
          const targetId = menu.getAttribute("href"); // 예: #section1
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            // 섹션의 위치를 가져옴
            const rect = targetElement.getBoundingClientRect();
            const offsetTop = window.pageYOffset + rect.top - 150; // 50px의 오프셋 적용

            // 부드러운 스크롤을 적용해 정확한 위치로 이동
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });
          }
        });
      });

      //scroll
      const detailMenuSections = document.querySelectorAll(
        "#detail-headers, #reviews__counters, #reviews__contacts, #detail__delivery, #detail__product-list"
      );
      const detailMenuScroll = () => {
        detailMenuSections.forEach((section) => {
          const rect = section.getBoundingClientRect();

          if (rect.top + 200 < window.innerHeight && rect.bottom > 150) {
            // 해당 섹션이 보이면, 메뉴 아이템에 acitve 추가
            productDetailHeaderMenus.forEach((menuItem) => {
              if (menuItem.dataset.target === section.id) {
                menuItem.classList.add("active");
              } else {
                menuItem.classList.remove("active");
              }
            });
          }
        });
      };

      window.addEventListener("scroll", detailMenuScroll);

      //   // cartLocalStorage
      //   let setCartProducts =
      //     JSON.parse(localStorage.getItem("setCartProducts")) || [];
      //   const localStorageSave = () => {
      //     localStorage.setItem(
      //       "setCartProducts",
      //       JSON.stringify(setCartProducts)
      //     );
      //   };

      //   const setCartHandler = (e) => {
      //     e.preventDefault();
      //     const selectColor = document.querySelector("#colors");
      //     const selectSize = document.querySelector("#sizes");
      //     const discountingPrice = product.details.beforePrice - product.price;
      //     const cartProduct = {
      //       id: product.id,
      //       title: product.title,
      //       price: product.price,
      //       quan: quan,
      //       sumPrice: multiplePrice,
      //       img: product.thumbnail,
      //       discountRate: product.discountRate,
      //       beforePrice: product.details.beforePrice,
      //       discountingPrice: discountingPrice,
      //       discountedPrice: discountingPrice * quan,
      //       selectColor: selectColor.value,
      //       selectSize: selectSize.value,
      //     };
      //     setCartProducts.push(cartProduct);
      //     console.log(setCartProducts);
      //     localStorageSave();
      //   };
      //   const form = document.querySelector(
      //     ".detail__right-box .detail__main-contentsbox-select > form"
      //   );
      //   form.addEventListener("submit", setCartHandler);
      // };
      // // cartLocalStorage
      // let setCartProducts =
      //   JSON.parse(localStorage.getItem("setCartProducts")) || [];

      // const localStorageSave = () => {
      //   localStorage.setItem(
      //     "setCartProducts",
      //     JSON.stringify(setCartProducts)
      //   );
      // };
      // const setCartHandler = (e) => {
      //   e.preventDefault();
      //   const selectColor = document.querySelector("#colors");
      //   const selectSize = document.querySelector("#sizes");
      //   const discountingPrice = product.details.beforePrice - product.price;
      //   const cartProduct = {
      //     id: product.id,
      //     title: product.title,
      //     price: product.price, // 판매가격
      //     quan: quan, // 수량
      //     sumPrice: multiplePrice, // 총주문금액 (수량 * price)
      //     img: product.thumbnail, // 이미지
      //     discountRate: product.discountRate, //할인율
      //     beforePrice: product.details.beforePrice, //할인되기전가격
      //     discountingPrice: discountingPrice, //할인이 얼마나 되는지
      //     discountedPrice: discountingPrice * quan, // 할인이 된 가격(*수량)
      //     selectColor: selectColor.value,
      //     selectSize: selectSize.value,
      //   };
      //   setCartProducts.push(cartProduct);
      //   console.log(setCartProducts);
      //   localStorageSave();
      // };


      // cartLocalStorage
      let setCartProducts =
        JSON.parse(localStorage.getItem("setCartProducts")) || [];

      const localStorageSave = () => {
        localStorage.setItem(
          "setCartProducts",
          JSON.stringify(setCartProducts)
        );
      };

      const setCartHandler = (e) => {
        e.preventDefault();
        const selectColor = document.querySelector("#colors");
        const selectSize = document.querySelector("#sizes");
        const discountingPrice = product.details.beforePrice - product.price;

        const cartProduct = {
          id: product.id,
          title: product.title,
          price: product.price, // 판매가격
          quan: Number(quan), // 수량
          sumPrice: Number(product.price * quan), // 총주문금액 (수량 * price)
          img: product.thumbnail, // 이미지
          discountRate: product.discountRate, //할인율
          beforePrice: product.details.beforePrice, //할인되기전가격
          discountingPrice: discountingPrice, //할인이 얼마나 되는지
          discountedPrice: Number(discountingPrice * quan), // 할인이 된 가격(*수량)
          selectColor: selectColor.value,
          selectSize: selectSize.value,
        };

        // 동일한 id, color, size를 가진 제품이 있는지 확인
        const existingProductIndex = setCartProducts.findIndex(
          (item) =>
            item.id === cartProduct.id &&
            item.selectColor === cartProduct.selectColor &&
            item.selectSize === cartProduct.selectSize
        );

        if (existingProductIndex > -1) {
          // 기존 제품이 있으면 수량과 가격 업데이트
          setCartProducts[existingProductIndex].quan += cartProduct.quan;
        } else {
          // 기존 제품이 없으면 새로 추가
          setCartProducts.push(cartProduct);
        }

        console.log(setCartProducts);
        localStorageSave();

        window.location.href = "/html/components/Productcart.html";
      };
      const form = document.querySelector(
        ".detail__right-box .detail__main-contentsbox-select > form"
      );
      form.addEventListener("submit", setCartHandler);

      // option dropdown Evt
      let optionDropDownBtn = document.querySelector(
        ".detail__main-contentsbox-brand > span"
      );
      const boxBrandSpan = document.querySelector(
        ".detail__right-box .detail__main-contentsbox-brand > span"
      );
      optionDropDownBtn.addEventListener("click", () => {
        const detailRightBox = document.querySelector(".detail__right-box");

        if (detailRightBox.classList.contains("close")) {
          detailRightBox.classList.remove("close");
          boxBrandSpan.innerHTML = `
          구매하기 
          <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
          `;
        } else {
          detailRightBox.classList.add("close");
          console.log("h2");
          boxBrandSpan.innerHTML = `
          구매하기 
          <i class="fa-solid fa-chevron-up" aria-hidden="true"></i>
          `;
        }
      });
    };

    // 페이지 이동
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const title = params.get("name");
    // params에서 get은 name으로

    const product = products.data.find(
      (product) => product.category === category && product.title === title
    );
    if (product) {
      createItem(product);
    } else console.log("product not found");
  });
