<script lang="ts" setup>
import { UiCard } from '@/shared/ui/Card';
import { useCityStore, useDepartmentStore, useEmployeeStore, useShiftStore, useTeamStore, useWorkScheduleStore } from '@stores';
import { storeToRefs } from 'pinia';

import styles from './styles.module.scss'

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
  <UiCard>
    <div v-if="!currentSchedule" :class="styles['empty-state']">
      Нет данных для отображения
    </div>

    <template v-else>
      <div :class="styles['schedule-card']">
        <h3>Основная информация</h3>

        <div :class="styles['info-grid']">
          <div :class="styles['info-row']">
            <span :class="styles['label']">Город:</span>
            <span :class="styles['value']">{{ getName('city', currentSchedule.cityId) }}</span>
          </div>
          <div :class="styles['info-row']">
            <span :class="styles['label']">Цех:</span>
            <span :class="styles['value']">{{ getName('department', currentSchedule.departmentId) }}</span>
          </div>
          <div :class="styles['info-row']">
            <span :class="styles['label']">Сотрудник:</span>
            <span :class="styles['value']">{{ getName('employee', currentSchedule.employeeId) }}</span>
          </div>
          <div :class="styles['info-row']">
            <span :class="styles['label']">Бригада:</span>
            <span :class="styles['value']">{{ getName('team', currentSchedule.teamId) }}</span>
          </div>
          <div :class="styles['info-row']">
            <span :class="styles['label']">Смена:</span>
            <span :class="styles['value']">{{ getName('shift', currentSchedule.shiftId) }}</span>
          </div>
        </div>

        <button @click="$router.push('/')" :class="styles['back-button']">
          Создать новый график
        </button>
      </div>
    </template>
  </UiCard>
</template>
