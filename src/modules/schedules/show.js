import dayjs from "dayjs";

const periodMorning = document.getElementById("period-morning")
const periodAfternoon = document.getElementById("period-afternoon")
const periodNight = document.getElementById("period-night")

export function schedulesShow({ dailySchedules }) {
  try {
    periodMorning.innerHTML = "";
    periodAfternoon.innerHTML = "";
    periodNight.innerHTML = "";

    dailySchedules.forEach(schedule => {
      const time = dayjs(schedule.when).format("HH:mm");

      const li = document.createElement("li");
      li.dataset.id = schedule.id
      const strong = document.createElement("strong");
      strong.textContent = time;
      const span = document.createElement("span");
      span.textContent = schedule.name;
      const img = document.createElement("img");
      img.src = "./src/assets/cancel.svg";
      img.alt = "Cancelar";
      img.classList.add("cancel-icon");

      li.appendChild(strong);
      li.appendChild(span);
      li.appendChild(img);

      const hour = dayjs(schedule.when).hour();
      if (hour <= 12) {
        periodMorning.appendChild(li);
      } else if (hour > 12 && hour <= 18) {
        periodAfternoon.appendChild(li);
      } else {
        periodNight.appendChild(li);
      }
    });
  } catch (error) {
    console.error("Erro ao exibir os horários:", error);
  }
}
