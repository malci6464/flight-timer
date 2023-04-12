<template>
  <div class="text-white">
    <h1 class="text-3xl font-bold m-4 my-12 text-center">All flight data</h1>
    <div class="overflow-x-auto p-2">
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2">ID</th>
            <th class="px-4 py-2">Pilot Name</th>
            <th class="px-4 py-2">Task Name</th>
            <th class="px-4 py-2">Flight Time (s)</th>
            <th class="px-4 py-2">Logged At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="flightTime in flightTimes" :key="flightTime.id">
            <td class="border px-4 py-2 text-center">{{ flightTime.id }}</td>
            <td class="border px-4 py-2 text-center">{{ flightTime.pilot_name }}</td>
            <td class="border px-4 py-2 text-center">{{ flightTime.task_name }}</td>
            <td class="border px-4 py-2 text-center">{{ flightTime.flight_time }}</td>
            <td class="border px-4 py-2 text-center">{{ flightTime.logged_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import type { Ref } from 'vue'
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()

interface FlightTime {
  id: number
  pilot_name: string
  task_name: string
  flight_time: number
  logged_at: string
}

let flightTimes: Ref<FlightTime[]> = ref([])

onBeforeMount(() => {
  getData()
})

async function getData() {
  let res = await fetch(globalStore.backendUrl + 'flight-times')
  const data = await res.json()
  flightTimes.value = data
}
</script>

<style></style>
