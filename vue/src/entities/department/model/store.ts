import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Department, Departments } from "./types";
import { mockDepartments } from "./api";

export const useDepartmentStore = defineStore('departments', () => {
  const departments = ref<Departments>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const getByCityId = computed(() => (cityId: string) => {
    return departments.value.filter(d => d.cityId === cityId)
  })

  const getById = (id: string): Department | undefined => {
    return departments.value.find(d => d.id === id)
  }

  const loadDepartments = async () => {
    try {
      isLoading.value = true
      departments.value = mockDepartments
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return {
    departments,
    isLoading,
    error,

    getByCityId,
    
    getById,
    loadDepartments
  }
})
