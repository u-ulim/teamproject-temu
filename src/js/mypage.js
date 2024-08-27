// const firstContent = document.querySelectorAll(".accordion .inner");
// firstContent[0].style.display = "none";

const titles = document.querySelectorAll("ul");
titles.forEach((title) => {
  title.addEventListener("click", () => {
    const orderIcon = document.querySelector(".leftmenu ul > .my-order > i");

    const df = document.querySelector(".inner > ul");
    df.classList.toggle("active");
    orderIcon.classList.toggle("active");
    console.log(orderIcon);

    // document.querySelectorAll(".inner").forEach((item) => {
    //   item.style.display = "block";
    // });

    // const chevronIcon = myOrderItem.querySelector(".fa-chevron-down");
    // let content = title.nextElementSibling;
    // if (title.classList.contains("active")) {
    //   title.classList.remove("active");
    //   content.style.display = "none";
    // } else {
    //   title.classList.add("active");
    //   content.style.display = "block";
    //   accordionContent.style.display = "none";
    // }
  });
});
