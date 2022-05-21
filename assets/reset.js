feather.replace();

const form = document.forms.reset;

const displayError = (text, status) => {
  let errorBox = document.querySelector(".error");
  errorBox.classList.add("errorActive");
  status === 200
    ? (errorBox.style.background = "green")
    : (errorBox.style.background = "red");

  Array.from(errorBox.children)[0].textContent = text;
  Array.from(errorBox.children)[1].addEventListener("click", (e) => {
    errorBox.classList.remove("errorActive");
  });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.elements.email.value.trim();
  try {
    const data = await fetch("http://localhost:8080/v1/users/reset-password/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const res = await data.json();
    displayError(res.msg, data.status);
  } catch (err) {
    displayError(res.msg, data.status);
  }
});
