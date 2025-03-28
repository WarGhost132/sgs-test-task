<script lang="ts" setup>
import { useCityStore, useDepartmentStore, useEmployeeStore, useShiftStore, useTeamStore, useWorkScheduleStore } from '@stores';
import { storeToRefs } from 'pinia';

const stores = {
  city: useCityStore(),
  department: useDepartmentStore(),
  employee: useEmployeeStore(),
  team: useTeamStore(),
  shift: useShiftStore(),
  schedule: useWorkScheduleStore()
}
const { currentSchedule } = storeToRefs(stores.schedule)

const getName = (type: string, id: string) => {
  switch (type) {
    case 'city': return stores.city.getCityById(id)?.name
    case 'department': return stores.department.getById(id)?.name
    case 'employee': return stores.employee.getById(id)?.name
    case 'team': return stores.team.getById(id)?.name
    case 'shift': return stores.shift.getById(id)?.name
    default: return id
  }
}
</script>

<template>
  <div class="schedule-view">
    <h2>График работы</h2>

    <div v-if="!currentSchedule" class="empty-state">
      Нет данных для отображения
    </div>

    <template v-else>
      <div class="schedule-card">
        <h3>Основная информация</h3>

        <div class="info-grid">
          <div class="info-row">
            <span class="label">Город:</span>
            <span class="value">{{ getName('city', currentSchedule.cityId) }}</span>
          </div>
          <div class="info-row">
            <span class="label">Цех:</span>
            <span class="value">{{ getName('department', currentSchedule.departmentId) }}</span>
          </div>
          <div class="info-row">
            <span class="label">Сотрудник:</span>
            <span class="value">{{ getName('employee', currentSchedule.employeeId) }}</span>
          </div>
          <div class="info-row">
            <span class="label">Бригада:</span>
            <span class="value">{{ getName('team', currentSchedule.teamId) }}</span>
          </div>
          <div class="info-row">
            <span class="label">Смена:</span>
            <span class="value">{{ getName('shift', currentSchedule.shiftId) }}</span>
          </div>
        </div>

        <button @click="$router.push('/')" class="back-button">
          Создать новый график
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.schedule-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.schedule-card {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.info-row {
  display: flex;
  margin-bottom: 0.5rem;
}

.label {
  font-weight: 500;
  min-width: 120px;
  color: #555;
}

.value {
  color: #333;
}

.back-button {
  background: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
</style>
