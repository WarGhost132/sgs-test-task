<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { useCityStore, useDepartmentStore, useEmployeeStore } from '@stores'

const cityStore = useCityStore()
const departmentStore = useDepartmentStore()
const employeeStore = useEmployeeStore()

const selectedCityId = ref('')
const selectedDeptId = ref('')

onMounted(async () => {
  await Promise.all([
    cityStore.loadCities(),
    departmentStore.loadDepartments(),
    employeeStore.loadEmployees()
  ])
  if (cities.value.length) selectedCityId.value = cities.value[0].id
})

const { cities, isLoading: cityLoading, error: cityError } = storeToRefs(cityStore)
const { isLoading: deptLoading, error: deptError, getByCityId: getDeptsByCity } = storeToRefs(departmentStore)
const { isLoading: empLoading, error: empError, getByDepartmentId: getEmpsByDept } = storeToRefs(employeeStore)

const filteredDepartments = computed(() => 
  selectedCityId.value ? getDeptsByCity.value(selectedCityId.value) : []
)

const filteredEmployees = computed(() => 
  selectedDeptId.value ? getEmpsByDept.value(selectedDeptId.value) : []
)

watch(filteredDepartments, (depts) => {
  if (depts.length > 0) {
    selectedDeptId.value = depts[0].id
  } else {
    selectedDeptId.value = ''
  }
})

const error = computed(() => cityError.value || deptError.value || empLoading.value)
const isLoading = computed(() => cityLoading.value || deptLoading.value || empError.value)
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
      <select 
        v-model="selectedDeptId"
        :disabled="!selectedCityId || !filteredDepartments.length"
      >
        <option
          v-for="department in filteredDepartments"
          :key="department.id"
          :value="department.id"
        >
          {{ department.name }}
        </option>
      </select>

      <div v-if="selectedCityId && !filteredDepartments.length" class="hint">
        Нет доступных цехов для выбранного города
      </div>

      <label>Сотрудник:</label>
      <select 
        :disabled="!selectedDeptId || !filteredEmployees.length"
      >
        <option
          v-for="employee in filteredEmployees"
          :key="employee.id"
          :value="employee.id"
        >
          {{ employee.name }} {{ employee.position }}
        </option>
      </select>

      <div v-if="selectedDeptId && !filteredEmployees.length" class="hint">
        Нет доступных сотрудников в выбранном цехе
      </div>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  margin-bottom: 1rem;
}
.hint {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
label {
  display: block;
  margin-top: 1rem;
  font-weight: 500;
}
select {
  margin-top: 0.5rem;
  min-width: 250px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
select:disabled {
  opacity: 0.7;
  background-color: #f5f5f5;
}
</style>
