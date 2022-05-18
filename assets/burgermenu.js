document.getElementById("burgerMenu").addEventListener("click", (e) => {
  document.querySelector(".navigation").classList.toggle("navigationActive");
  console.log(e.target.classList.replace("feather-menu", "feather-x"));
});
