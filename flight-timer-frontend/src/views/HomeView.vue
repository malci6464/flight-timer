<template>
  <div>Username</div>
  <div>Flight ID:</div>
  <div id="clock">
    <span class="time">{{ time }}</span>

    <div class="btn-container my-2">
      <a id="start" @click="start" class="ring-1 rounded ring-slate-400">Start</a>
      <a id="stop" @click="stop" class="ring-1 rounded ring-slate-400">Stop</a>
      <a id="reset" @click="reset" class="ring-1 rounded ring-slate-400">Reset</a>
    </div>
  </div>
  <button class="bg-blue-300 rounded text-2xl px-4 py-2 m-8 mx-auto" @click="submitFlight">
    Submit flight time
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

let time = ref('00:00.000')

let timeBegan = ref(null)
let timeStopped = ref(null)
let stoppedDuration = ref(0)
let started = ref(null)
let running = ref(false)

function submitFlight() {
  //call backend api to submit flight time to db
  fetch('http://localhost:3000/log-flight-time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pilotName: 'Bob Johnson',
      taskName: 'Task 1',
      flightTime: 28.1
    })
  })
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
  font-size: 4.5em;
}

#clock .text {
  margin-top: 30px;
  font-size: 1em;
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
  font-size: 2em;
  cursor: pointer;
  flex-grow: 1;
  transition: color 0.1s ease-out;
}

#clock .btn-container a:hover {
  color: black;
}
</style>
