feather.replace();
const formLogin = document.forms.login;
localStorage.removeItem("token");

const displayError = (text, status) => {
  let errorBox = document.querySelector(".error");
  errorBox.classList.add("errorActive");
  status === 500 || 400
    ? (errorBox.style.background = "red")
    : (errorBox.style.background = green);

  Array.from(errorBox.children)[0].textContent = text;
  Array.from(errorBox.children)[1].addEventListener("click", (e) => {
    errorBox.classList.remove("errorActive");
  });
};

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.elements.email.value.trim();
  const password = e.target.elements.password.value;
  try {
    const data = await fetch(`http://localhost:8080/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const res = await data.json();
    console.log(data.status);
    if (!res.token) {
      return displayError(res.msg, data.status);
    }
    localStorage.setItem("token", JSON.stringify(res.token));
    return window.location.replace("http://127.0.0.1:5500/home.html");
  } catch (err) {
    console.log(err);
  }
  formLogin.reset();
});
