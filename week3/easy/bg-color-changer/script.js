const buttons = document.querySelectorAll(".color-btn");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    document.body.style.backgroundColor =
      getComputedStyle(button).backgroundColor;
  });
});
