<script setup>
import { ref, onMounted, computed } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
const props = defineProps(['page'])
const events = ref(null)

const page = computed(() => props.page)
onMounted(() => {
  EventService.getEvents(2, page.value)
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events" v-if="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
  <div class="events" v-else>
    <p>No events available or no internet connection</p>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
