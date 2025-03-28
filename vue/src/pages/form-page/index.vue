<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { 
  useCityStore,
  useDepartmentStore,
  useEmployeeStore,
  useShiftStore,
  useTeamStore,
  useWorkScheduleStore
} from '@stores'
import { useRouter } from 'vue-router'

const router = useRouter()

const stores = {
  city: useCityStore(),
  department: useDepartmentStore(),
  employee: useEmployeeStore(),
  team: useTeamStore(),
  shift: useShiftStore(),
  schedule: useWorkScheduleStore()
}

const selections = ref({
  cityId: '',
  departmentId: '',
  employeeId: '',
  teamId: '',
  shiftId: ''
})

onMounted(async () => {
  try {
    await stores.city.loadCities()
    if (stores.city.cities.length) {
      selections.value.cityId = stores.city.cities[0].id
      await loadAllData()
    }
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
})

const loadAllData = async () => {
  await Promise.all([
    stores.department.loadDepartments(),
    stores.employee.loadEmployees(),
    stores.team.loadTeams(),
    stores.shift.loadShifts()
  ])
}

const { cities, isLoading: cityLoading, error: cityError } = storeToRefs(stores.city)
const { isLoading: deptLoading, error: deptError } = storeToRefs(stores.department)
const { isLoading: empLoading, error: empError } = storeToRefs(stores.employee)
const { teams, isLoading: teamsLoading, error: teamsError } = storeToRefs(stores.team)
const { shifts, isLoading: shiftsLoading, error: shiftsError } = storeToRefs(stores.shift)

const getDeptsByCity = stores.department.getByCityId
const getEmpsByDept = stores.employee.getByDepartmentId


const filteredDepartments = computed(() => 
  selections.value.cityId ? getDeptsByCity(selections.value.cityId) : []
)

const filteredEmployees = computed(() => 
  selections.value.departmentId ? getEmpsByDept(selections.value.departmentId) : []
)

const isLoading = computed(() =>
  [cityLoading, deptLoading, empLoading, teamsLoading, shiftsLoading].some(l => l.value)
)

const error = computed(() =>
  [cityError, deptError, empError, teamsError, shiftsError].some(e => e.value)
)

watch(
  () => filteredDepartments.value,
  (departments) => {
    selections.value.departmentId = departments[0]?.id || ''
  },
  { immediate: true }
)

watch(
  () => filteredEmployees.value,
  (employees) => {
    selections.value.employeeId = employees[0]?.id || ''
  },
  { immediate: true }
)

const submitForm = async () => {
  try {
    const newSchedule = await stores.schedule.createSchedule({
      cityId: selections.value.cityId,
      departmentId: selections.value.departmentId,
      employeeId: selections.value.employeeId,
      teamId: selections.value.teamId,
      shiftId: selections.value.shiftId
    })

    router.push('/schedule-view')
  } catch (error) {
    console.error('Ошибка при отправке формы:', error)
  }
}
</script>

<template>
  <div>
    <div v-if="isLoading">Загрузка городов</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <template v-else>
      <div class="form-group">
        <label class="form-label">Город:</label>
        <select 
          v-model="selections.cityId" 
          class="form-select"
        >
          <option
            v-for="city in cities"
            :key="city.id"
            :value="city.id"
          >
            {{ city.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Цех:</label>
        <select 
          v-model="selections.departmentId"
          class="form-select"
          :disabled="!filteredDepartments.length"
        >
          <option
            v-for="department in filteredDepartments"
            :key="department.id"
            :value="department.id"
          >
            {{ department.name }}
          </option>
        </select>
        <div 
          v-if="selections.cityId && !filteredDepartments.length" 
          class="hint"
        >
          Нет доступных цехов для выбранного города
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Сотрудник:</label>
        <select
          v-model="selections.employeeId"
          class="form-select with-placeholder"
          :disabled="!selections.departmentId || !filteredEmployees.length"
        >
          <option value="" disabled hidden>
            Выберите сотрудника
          </option>
          <option
            v-for="employee in filteredEmployees"
            :key="employee.id"
            :value="employee.id"
          >
            {{ employee.name }} ({{ employee.position }})
          </option>
        </select>
        <div 
          v-if="selections.departmentId && !filteredEmployees.length" 
          class="hint"
        >
          Нет доступных сотрудников в выбранном цехе
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Бригада:</label>
        <select 
          v-model="selections.teamId" 
          class="form-select with-placeholder"
        >
          <option value="" disabled hidden>
            Выберите бригаду
          </option>
          <option
            v-for="team in teams"
            :key="team.id"
            :value="team.id"
          >
            {{ team.name }}
            <span v-if="team.description">({{ team.description }})</span>
          </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Смена:</label>
        <select 
          v-model="selections.shiftId" 
          class="form-select with-placeholder"
        >
          <option value="" disabled hidden>
            Выберите смену
          </option>
          <option
            v-for="shift in shifts"
            :key="shift.id"
            :value="shift.id"
          >
            {{ shift.name }} ({{ shift.startTime }} - {{ shift.endTime }})
          </option>
        </select>
      </div>

      <button
        @click="submitForm"
        :disabled="isLoading"
        class="submit-button"
      >
        Сохранить график
      </button>
    </template>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  padding: 1rem;
  text-align: center;
  color: #666;
}

.error {
  padding: 1rem;
  color: #d32f2f;
  background-color: #fde8e8;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-select:focus {
  outline: none;
  border-color: #4285f4;
  box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
}

.form-select:disabled {
  background-color: #f9f9f9;
  color: #999;
  cursor: not-allowed;
}

.form-select.with-placeholder:invalid {
  color: #999;
}

.hint {
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.85rem;
  font-style: italic;
}

.submit-button {
  background: #2196F3;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 2rem;
}

.submit-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
</style>
