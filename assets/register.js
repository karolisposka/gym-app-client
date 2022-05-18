const form = document.forms.register;

const displayError = (text) => {
  let errorBox = document.querySelector(".error");
  errorBox.classList.add("errorActive");
  Array.from(errorBox.children)[0].textContent = text;
  Array.from(errorBox.children)[1].addEventListener("click", (e) => {
    errorBox.classList.remove("errorActive");
  });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.elements.email.value.trim();
  const password = e.target.elements.password.value;
  try {
    const data = await fetch("http://localhost:8080/v1/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const res = await data.json();

    if (res.msg === "User already exist") {
      return displayError(res.msg);
    }
    return location.replace("index.html");
  } catch (err) {
    console.log(err);
  }
});
