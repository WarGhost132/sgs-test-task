<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {onMounted} from 'vue'
import {useCityStore} from '@stores'

const cityStore = useCityStore()
const { cities, isLoading, error } = storeToRefs(cityStore)

onMounted(() => {
  cityStore.loadCities()
})
</script>

<template>
  <div>
    <div v-if="isLoading">Загрузка городов</div>
    <div v-else-if="error">{{ error }}</div>

    <select v-else>
      <option
        v-for="city in cities"
        :key="city.id"
        :value="city.id"
      >
        {{ city.name }}
      </option>
    </select>
  </div>
</template>
