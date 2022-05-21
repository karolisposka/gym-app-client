const form = document.forms[0];
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get("email");
const token = urlParams.get("token");

if (!email || !token) {
  location.replace("index.html");
}

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
  const password = e.target.elements.newPassword.value;
  try {
    const res = await fetch("http://localhost:8080/v1/users/new-password/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        token,
        password,
      }),
    });
    const data = await res.json();
    console.log(res.status);

    if (res.status !== 200) {
      return displayError(data.msg, res.status);
    }
    return location.replace("index.html");
  } catch (err) {
    console.log(err);
  }
});
