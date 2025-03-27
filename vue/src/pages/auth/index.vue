<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useCityStore, useDepartmentStore } from '@stores'

const cityStore = useCityStore()
const departmentStore = useDepartmentStore()

const { cities, isLoading: cityLoading, error: cityError } = storeToRefs(cityStore)
const { isLoading: deptLoading, error: deptError } = storeToRefs(departmentStore)

const selectedCityId = ref('')

onMounted(async () => {
  await cityStore.loadCities()
  await departmentStore.loadDepartments()

  if (cities.value.length > 0) {
    selectedCityId.value = cities.value[0].id
  }
})

const filteredDepartments = computed(() => {
  if (!selectedCityId.value) return []
  return departmentStore.getByCityId(selectedCityId.value)
})

const error = computed(() => cityError.value || deptError.value)
const isLoading = computed(() => cityLoading.value || deptLoading.value)
</script>

<template>
  <div>
    <div v-if="isLoading">Загрузка городов</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else>
      <label>Город:</label>
      <select v-model="selectedCityId">
        <option
          v-for="city in cities"
          :key="city.id"
          :value="city.id"
        >
          {{ city.name }}
        </option>
      </select>

      <label>Цех:</label>
      <select v-if="selectedCityId && filteredDepartments.length">
        <option
          v-for="department in filteredDepartments"
          :key="department.id"
          :value="department.id"
        >
          {{ department.name }}
        </option>
      </select>

      <div v-else-if="selectedCityId && !filteredDepartments.length">
        Нет доступных цехов
      </div>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
label {
  display: block;
  margin-top: 1rem;
}
select {
  margin-top: 0.5rem;
  min-width: 200px;
}
</style>
