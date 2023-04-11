<template>
  <div>
    <div>
      <button @click="startTimer" :disabled="isTiming">Start</button>
      <button @click="stopTimer" :disabled="!isTiming">Stop</button>
    </div>
    <div v-if="flightTimes.length > 0">
      <h2>Flight Times</h2>
      <table>
        <thead>
          <tr>
            <th>Pilot</th>
            <th>Task</th>
            <th>Date</th>
            <th>Flight Time (s)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(flightTime, index) in flightTimes" :key="index">
            <td>{{ flightTime.pilot }}</td>
            <td>{{ flightTime.task }}</td>
            <td>{{ formatDate(flightTime.date) }}</td>
            <td>{{ flightTime.duration.toFixed(1) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FlightTime {
  pilot: string
  task: string
  date: Date
  duration: number
}

const isTiming = ref(false)
const flightTimes = ref<FlightTime[]>([])
let startTime: Date | null = null
let timerId: number | null = null

function startTimer() {
  if (!isTiming.value) {
    startTime = new Date()
    timerId = setInterval(() => {
      const currentTime = new Date()
      const duration = Math.floor((currentTime.getTime() - startTime!.getTime()) / 100) / 10
      flightTimes.value.push({
        pilot: 'John Doe',
        task: 'Task 1',
        date: new Date(),
        duration
      })
    }, 100)
    isTiming.value = true
  }
}

function stopTimer() {
  if (isTiming.value) {
    clearInterval(timerId!)
    timerId = null
    startTime = null
    isTiming.value = false
  }
}

function formatDate(date: Date) {
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>
