feather.replace();
const token = JSON.parse(localStorage.getItem("token"));

if (!token) {
  window.location.replace("http://127.0.0.1:5500/index.html");
}

const exercisesBlock = document.querySelector(".swiper-wrapper");

const logout = () => {
  localStorage.removeItem("token");
  location.replace("http://127.0.0.1:5500/index.html");
};
document.getElementById("logout").addEventListener("click", () => {
  logout();
});

const displayExercises = (data) => {
  exercisesBlock.innerHTML = "";
  data.forEach((item) => {
    const exercisesBlockItem = document.createElement("div");
    exercisesBlockItem.setAttribute("id", item.id);
    exercisesBlockItem.classList.add("swiper-slide");
    exercisesBlockItem.classList.add("exercise");
    const section = document.createElement("section");
    section.classList.add("section");

    const title = document.createElement("h2");
    title.classList.add("title");
    title.textContent = item.title;
    const type = document.createElement("p");
    type.classList.add("type");
    type.textContent = item.type;
    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = item.description;
    section.append(title, type, description);

    const button = document.createElement("button");
    button.textContent = "Begin exercise session";
    button.classList.add("addButton");
    exercisesBlockItem.append(section, button);

    exercisesBlock.appendChild(exercisesBlockItem);
    button.addEventListener("click", () => {
      localStorage.setItem("exerciseId", item.id);
      localStorage.setItem("exerciseTitle", JSON.stringify(item.title));
      location.replace("add.html");
    });
  });
};

const getExercisesData = async () => {
  try {
    const data = await fetch("http://localhost:8080/v1/exercises/", {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const res = await data.json();
    console.log(res);
    displayExercises(res);
  } catch (err) {
    console.log(err);
  }
};

getExercisesData();
