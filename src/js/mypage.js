const titles = document.querySelectorAll(".my-order");
titles.forEach((title) => {
  title.addEventListener("click", () => {
    const orderIcon = document.querySelector(".leftmenu ul > .my-order > i");

    const df = document.querySelector(".inner > ul");
    df.classList.toggle("active");
    orderIcon.classList.toggle("active");
    console.log(orderIcon);
  });
});
