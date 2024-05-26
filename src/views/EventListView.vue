<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
const props = defineProps(['page'])
const events = ref(null)
const totalEvents = ref(0)
const totalPages = ref(0)
const page = computed(() => props.page)

const hasNextPage = computed(() => {
  return page.value < totalPages.value
})
onMounted(() => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(2, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
        totalPages.value = Math.ceil(totalEvents.value / 2)
      })
      .catch((error) => {
        console.log(error)
      })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events" v-if="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <span style="flex: 1">
      <router-link
        id="page-prev"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-show="page != 1"
        >Prev page</router-link
      >
    </span>
      <router-link
        v-for="n in totalPages"
        :to="{ name: 'event-list', query: { page: n } }"
        >{{ n }}</router-link
      >
      <span style="flex: 1">
      <router-link
        id="page-next"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-show="hasNextPage"
        >Next page</router-link
      >
    </span>
    </div>
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
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
