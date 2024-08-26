//결제창 동의서

const consentBtns = document.querySelectorAll(".consent-title");
consentBtns.forEach((consentBtn) => {
  consentBtn.addEventListener("click", () => {
    document.querySelectorAll(".consent-content").forEach((content) => {
      content.style.display = "none";
    });

    consentBtns.forEach((otherBtn) => {
      if (otherBtn !== consentBtn) {
        otherBtn.classList.remove("active");
      }
    });

    let content = consentBtn.nextElementSibling;

    if (consentBtn.classList.contains("active")) {
      consentBtn.classList.remove("active");
    } else {
      consentBtn.classList.add("active");
      content.style.display = "block";
    }
  });
  ``;
});

//주문상품

let orderinfoBtn = document.querySelector(".order__title");
const product = document.querySelector(".product__info");

orderinfoBtn.addEventListener("click", () => {
  product.classList.toggle("active");
  orderinfoBtn.classList.toggle("active");
});
