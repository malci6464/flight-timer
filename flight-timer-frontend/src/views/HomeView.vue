<template>
  <div class="p-4 flex flex-col justify-center">
    <div class="flex flex-col space-y-2 max-w-lg mb-12 mx-auto justify-center">
      <label class="text-gray-200 font-medium" for="username">Username:</label>
      <input
        class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
        type="text"
        id="username"
        v-model="userName"
      />

      <label class="text-gray-200 font-medium" for="flight-name">Flight name:</label>
      <input
        class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
        type="text"
        id="flight-name"
        v-model="flightName"
      />
    </div>
    <div id="clock" class="my-12">
      <span class="time">{{ time }}</span>

      <div class="btn-container my-2 text-sm">
        <a id="start" @click="start" class="ring-1 rounded ring-slate-400">Start</a>
        <a id="stop" @click="stop" class="ring-1 rounded ring-slate-400">Stop</a>
        <a id="reset" @click="reset" class="ring-1 rounded ring-slate-400">Reset</a>
      </div>
    </div>
    <button class="bg-blue-300 rounded text-2xl px-4 py-2 m-8 mx-auto" @click="submitFlight">
      Submit flight time
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()

let time = ref('00:00.000')

let timeBegan = ref(null)
let timeStopped = ref(null)
let stoppedDuration = ref(0)
let started = ref(null)
let running = ref(false)

let userName = ref('')
let flightName = ref('')

function convertToFloatForDb(stringVal: string) {
  const [minutes, seconds] = stringVal.split(':')
  const timeInSeconds = parseInt(minutes) * 60 + parseFloat(seconds)
  console.log(timeInSeconds)
  return timeInSeconds
}

async function submitFlight() {
  //todo - check for valid data

  let flightTimeInSecs = convertToFloatForDb(time.value)
  if (userName.value === '' || flightName.value === '' || time.value === '00:00.000') {
    console.log('invalid data')
  } else {
    //todo show success fail popup
    //call backend api to submit flight time to db
    fetch(globalStore.backendUrl + 'log-flight-time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pilotName: userName.value,
        taskName: flightName.value,
        flightTime: flightTimeInSecs
      })
    })
  }
}

function start() {
  if (running.value) return

  if (timeBegan.value === null) {
    reset()
    timeBegan.value = new Date()
  }

  if (timeStopped.value !== null) {
    stoppedDuration.value += new Date() - timeStopped.value
  }

  started.value = setInterval(clockRunning, 10)
  running.value = true
}

function stop() {
  running.value = false
  timeStopped.value = new Date()
  clearInterval(started.value)
}

function reset() {
  running.value = false
  clearInterval(started.value)
  stoppedDuration.value = 0
  timeBegan.value = null
  timeStopped.value = null
  time.value = '00:00.0'
}

function clockRunning() {
  var currentTime = new Date(),
    timeElapsed = new Date(currentTime - timeBegan.value - stoppedDuration.value),
    // hour = timeElapsed.getUTCHours(),
    min = timeElapsed.getUTCMinutes(),
    sec = timeElapsed.getUTCSeconds(),
    ms = Math.floor(timeElapsed.getUTCMilliseconds() / 100)

  time.value =
    // zeroPrefix(hour, 2) +
    // ':' +
    zeroPrefix(min, 2) + ':' + zeroPrefix(sec, 2) + '.' + zeroPrefix(ms, 1)
}

function zeroPrefix(num, digit) {
  var zero = ''
  for (var i = 0; i < digit; i++) {
    zero += '0'
  }
  return (zero + num).slice(-digit)
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

#clock {
  order: 0;
  flex: 0 1 auto;
  align-self: center;
  color: rgb(200, 200, 200);
}

#clock .time {
  font-size: 2.5em;
}

#clock .text {
  margin-top: 30px;
  font-size: 0.5em;
  color: rgba(200, 200, 200, 0.4);
  text-align: center;
}

#clock .text a {
  text-decoration: none;
  color: inherit;
  transition: color 0.1s ease-out;
}

#clock .text a:hover {
  color: rgb(200, 200, 200);
}

#clock .btn-container a {
  text-align: center;
  font-family: 'Share Tech Mono', sans-serif;
  background: transparent;
  border: none;
  color: rgb(200, 200, 200);
  padding: 10px 15px;
  margin: 0 10px;
  text-transform: uppercase;
  font-size: 1.5em;
  cursor: pointer;
  flex-grow: 1;
  transition: color 0.1s ease-out;
}

#clock .btn-container a:hover {
  color: black;
}
</style>
