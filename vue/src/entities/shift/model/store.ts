import { defineStore } from "pinia";
import { ref } from "vue";
import type { Shift, Shifts } from "./types";
import { mockShifts } from "./api";

export const useShiftStore = defineStore('shifts', () => {
  const shifts = ref<Shifts>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const getById = (id: string): Shift | undefined => {
    return shifts.value.find(shift => shift.id === id)
  }

  const loadShifts = async () => {
    try {
      isLoading.value = true
      shifts.value = mockShifts
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return {
    shifts,
    isLoading,
    error,
    
    getById,
    loadShifts
  }
})
