import dayjs from "dayjs"
import { scheduleNew } from "../services/schedule-new.js"
import { schedulesDay } from "../schedules/load.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById('date')

// Data atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual e define a data mínima como sendo a data atual
selectedDate.value = inputToday
selectedDate.min = inputToday

form.onsubmit = async (event) => {
  event.preventDefault()

  try {
    const name = clientName.value.trim()
    const hourSelected = document.querySelector(".hour-selected")

    if(!name) {
      return alert("Informe o nome do cliente!")
    }
    if(!hourSelected) {
      return alert("Selecione a hora.")
    }
    
    const [hour] = hourSelected.innerText.split(":")
    const when = dayjs(selectedDate.value).add(hour, "hour")
    const id = new Date().getTime()

    await scheduleNew({
      id: id, 
      name: name, 
      when: when
    })

    await schedulesDay()
    clientName.value = ""
  } catch (error) {
    alert("Não foi possível realizar o agendamento")
    console.log(error)
  }
}