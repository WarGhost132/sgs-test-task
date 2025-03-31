import { defineStore } from "pinia";
import { ref } from "vue";
import type { WorkSchedule } from "./types";

export const useWorkScheduleStore = defineStore('workSchedule', () => {
  const currentSchedule = ref<WorkSchedule | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const createSchedule = async (data: Omit<WorkSchedule, 'id'>) => {
    try {
      isLoading.value = true
      const newSchedule: WorkSchedule = {
        ...data,
        id: Date.now().toString()
      }

      currentSchedule.value = newSchedule

      return newSchedule
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return {
    currentSchedule,
    isLoading,
    error,
    
    createSchedule
  }
})
