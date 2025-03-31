import { defineStore } from "pinia";
import { ref } from "vue";
import type { Team, Teams } from "./types";
import { mockTeams } from "./api";

export const useTeamStore = defineStore('teams', () => {
  const teams = ref<Teams>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const getById = (id: string): Team | undefined => {
    return teams.value.find(team => team.id === id)
  }

  const loadTeams = async () => {
    try {
      isLoading.value = true
      teams.value = mockTeams
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return {
    teams,
    isLoading,
    error,

    getById,
    loadTeams
  }
})
