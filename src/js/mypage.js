const firstContent = document.querySelectorAll(".accordion .inner");
firstContent[0].style.display = "block";

const titles = document.querySelectorAll("ul");
titles.forEach((title) => {
  title.addEventListener("click", () => {
    document.querySelectorAll(".inner").forEach((item) => {
      item.style.display = "none";
    });

    titles.forEach((otherTitle) => {
      if (otherTitle !== title) {
        otherTitle.classList.remove("active");
      }
    });

    const chevronIcon = myOrderItem.querySelector(".fa-chevron-down");
    let content = title.nextElementSibling;
    if (title.classList.contains("active")) {
      title.classList.remove("active");
      content.style.display = "none";
    } else {
      title.classList.add("active");
      content.style.display = "block";
      accordionContent.style.display = "none";
    }
  });
});
