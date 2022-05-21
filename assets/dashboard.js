feather.replace();
const filterForm = document.forms.filterData;
const chart = document.getElementById("lineChart");
console.log(chart);

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

    const exercisesData = exercisesTypesLabels.map((item, index) => {
      return {
        [exercisesTypesLabels[index]]: exercisesTypesData.filter((v) => {
          return v === item;
        }).length,
      };
    });

    const dataset = [];
    exercisesData.forEach((item) => dataset.push(...Object.values(item)));
    console.log(dataset);
    userExercises.forEach((item) => {
      const option = document.createElement("option");
      option.textContent = item;
      option.value = item;
      exercisesSelect.appendChild(option);
    });

    const ctx1 = document.getElementById("first-dashboard").getContext("2d");

    const dataTable2 = {
      labels: exercisesTypesLabels,
      datasets: [
        {
          data: dataset,
          label: "Number of exercise sessions by type",
          backgroundColor: ["#EEE4AB", "#EB5353"],
        },
      ],
    };

    const configFile2 = {
      type: "doughnut",
      data: dataTable2,
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    };

    const doughnutChart = new Chart(ctx1, configFile2);
  } catch (err) {
    console.log(err);
  }
};

filterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const exerciseName = e.target.elements.exercises.value;
  const from = e.target.elements.from.value;
  const to = e.target.elements.to.value;
  console.log(from, to);
  try {
    const data = await fetch(`http://localhost:8080/v1/dashboard/userData/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const res = await data.json();
    console.log(new Date(from).getTime());

    const filteredData = res.filter(
      (item) =>
        item.title === exerciseName &&
        new Date(item.created_at).getTime() > new Date(from).getTime() &&
        new Date(item.created_at).getTime() < new Date(to).getTime()
    );

    console.log(new Date(res[0].created_at).getTime());

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
        maintainAspectRatio: true,
        scales: {
          x: {
            ticks: {
              display: false,
              maxRotation: 90,
              minRotation: 75,
              autoSkip: true,
              maxTicksLimit: 5,
            },
          },
        },
      },
    };
    chart.innerHTML = `<canvas id="myChart"></canvas>`;
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, config);
  } catch (err) {
    console.log(err);
  }
});

getUserData();
