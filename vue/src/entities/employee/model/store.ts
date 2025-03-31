import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Employees } from "./types";
import { mockEmployees } from "./api";

export const useEmployeeStore = defineStore('employees', () => {
  const employees = ref<Employees>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const getByDepartmentId = computed(() => (deptId: string) => {
    return employees.value.filter(e => e.departmentId === deptId)
  })

  const getById = (id: string) => {
    return employees.value.find(e => e.id === id)
  }

  const loadEmployees = async () => {
    try {
      isLoading.value = true
      employees.value = mockEmployees
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return {
    employees,
    isLoading,
    error,

    getByDepartmentId,

    getById,
    loadEmployees
  }
})
