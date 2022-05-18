const form = document.forms.addSet;
const exerciseTitle = document.getElementById("exerciseTitle");
exerciseTitle.textContent = JSON.parse(localStorage.getItem("exerciseTitle"));

const token = JSON.parse(localStorage.getItem("token"));

if (!token) {
  window.location.replace("http://127.0.0.1:5500/index.html");
}

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
  const weight = Number(e.target.elements.weight.value);
  const reps = Number(e.target.elements.reps.value);
  const sets = Number(e.target.elements.sets.value);
  const exercise_id = Number(JSON.parse(localStorage.getItem("exerciseId")));

  try {
    const res = await fetch("http://localhost:8080/v1/addSet/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify({ weight, reps, sets, exercise_id }),
    });
    const data = await res.json();
    displayError(data.msg);
  } catch (err) {
    console.log(err);
  }
});
