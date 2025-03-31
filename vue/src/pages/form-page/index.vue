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
import { UiSelect } from '@/shared/ui/Select'
import { UiButton } from '@/shared/ui/Button'
import { UiCard } from '@/shared/ui/Card'

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
    console.log(newSchedule)
  } catch (error) {
    console.error('Ошибка при отправке формы:', error)
  }
}
</script>

<template>
  <UiCard>
    <div v-if="isLoading">Загрузка городов</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <template v-else>
      <UiSelect
        v-model="selections.cityId"
        :options="cities.map(city => ({ value: city.id, label: city.name }))"
        label="Город:"
      />

      <UiSelect
        v-model="selections.departmentId"
        :options="filteredDepartments.map(department => ({ value: department.id, label: department.name }))"
        label="Цех:"
        :disabled="!filteredDepartments.length"
        hint="Нет доступных цехов для выбранного города"
      />

      <UiSelect
        v-model="selections.employeeId"
        :options="filteredEmployees.map(employee => ({ value: employee.id, label: `${employee.name} (${employee.position})` }))"
        label="Сотрудник:"
        placeholder="Выберите сотрудника"
        :disabled="!selections.departmentId || !filteredEmployees.length"
        hint="Нет доступных сотрудников в выбранном цехе"
      />

      <UiSelect
        v-model="selections.teamId"
        :options="teams.map(team => ({ value: team.id, label: team.name }))"
        label="Бригада:"
        placeholder="Выберите бригаду"
      />

      <UiSelect
        v-model="selections.shiftId"
        :options="shifts.map(shift => ({ value: shift.id, label: `${shift.name} (${shift.startTime} - ${shift.endTime})` }))"
        label="Смена:"
        placeholder="Выберите смену"
      />

      <div class="form-actions">
        <UiButton
          @click="submitForm"
          :disabled="isLoading"
        >
          Сохранить график
        </UiButton>
      </div>
    </template>
  </UiCard>
</template>

<style scoped>
.form-actions {
  display: flex;
  justify-content: center;
}
</style>
