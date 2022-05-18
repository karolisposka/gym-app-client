const filterForm = document.forms.filterData;
const chart = document.getElementById("chart");

filterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const exerciseName = e.target.elements.exercises.value;
  try {
    const data = await fetch(`http://localhost:8080/v1/dashboard/test/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const res = await data.json();

    const filteredData = res.filter((item) => item.title === exerciseName);

    const labels = filteredData.map((item) => {
      return new Date(item.created_at).toLocaleString("en-GB", {
        timeZone: "UTC",
      });
    });

    const weights = filteredData.map((item) => {
      return item.weight;
    });

    const reps = filteredData.map((item) => {
      return item.reps;
    });

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: `weight`,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: weights,
        },
        {
          label: `Reps per Set`,
          backgroundColor: "rgb(0, 0, 0)",
          borderColor: "rgb(0, 0, 0)",
          data: reps,
        },
      ],
    };

    const config = {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              maxRotation: 90,
              minRotation: 75,
              autoSkip: true,
              maxTicksLimit: 5,
            },
          },
        },
      },
    };
    chart.innerHTML = `<canvas id="myChart" height="100%" width="80%"></canvas>`;
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, config);
  } catch (err) {
    console.log(err);
  }
});

const getUserData = async () => {
  try {
    const data = await fetch(`http://localhost:8080/v1/dashboard/stats/`, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const res = await data.json();

    const userExercises = Array.from(
      new Set(
        res.map((item) => {
          return item.title;
        })
      )
    );

    const exercisesTypesLabels = Array.from(
      new Set(
        res.map((item) => {
          return item.type;
        })
      )
    );

    const exercisesTypesData = res.map((item) => {
      return item.type;
    });

    console.log(exercisesTypesData);

    console.log(exercisesTypesLabels);
    userExercises.forEach((item) => {
      const option = document.createElement("option");
      option.textContent = item;
      option.value = item;
      exercisesSelect.appendChild(option);
    });

    const ctx1 = document.getElementById("first-dashboard").getContext("2d");
    const ctx2 = document.getElementById("second-dashboard").getContext("2d");

    const labelsTable1 = ["push ups", "blabla", "test"];
    const dataTable2 = {
      labels: exercisesTypesLabels,
      datasets: [
        {
          data: [255, 21],
          label: "Number of exercise sessions by type",
          backgroundColor: ["#EEE4AB", "#EB5353"],
        },
      ],
    };
    const dataTable1 = {
      labels: labelsTable1,
      datasets: [
        {
          data: [255, 21, 22],
          label: "test",
          backgroundColor: ["#EEE4AB", "#EB5353", "rgb(255, 205, 86)"],
        },
      ],
    };
    const configFile1 = {
      type: "doughnut",
      data: dataTable2,
      options: {
        responsive: true,
      },
    };

    const configFile2 = {
      type: "doughnut",
      data: dataTable1,
      options: {
        responsive: true,
      },
    };
    const blalba = new Chart(ctx1, configFile1);
    const blabl2 = new Chart(ctx2, configFile2);
  } catch (err) {
    console.log(err);
  }
};

getUserData();
