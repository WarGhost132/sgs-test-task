import { defineStore } from "pinia";
import { ref } from "vue";
import type { Cities, City } from "./types";
import { mockCities } from "./api";

export const useCityStore = defineStore('cities', () => {
  const cities = ref<Cities>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadCities = async () => {
    try {
      isLoading.value = true
      cities.value = mockCities
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  const getCityById = (id: string): City | undefined => {
    return cities.value.find(city => city.id === id)
  }

  return {
    cities,
    isLoading,
    error,

    loadCities,
    getCityById
  }
})
