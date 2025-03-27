import dayjs from "dayjs"
import { apiConfig } from "./api-config"

export async function scheduleFetchByDay({ date }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules`)
      .then((data) => data.json())
    
    const dailySchedules = response.filter((schedule) => {
      return dayjs(date).isSame(schedule.when, "day")
    })

    return dailySchedules
  } catch (error) {
    console.log(error)
    alert("Não foi possível buscar os agendamentos do dia selecionado.")
  }
}