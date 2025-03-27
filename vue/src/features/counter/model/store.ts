import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const lastChanged = ref<Date | null>(null)

  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)

  const increment = (amount = 1) => {
    count.value += amount
    lastChanged.value = new Date()
  }

  const decrement = () => {
    count.value--
    lastChanged.value = new Date()
  }

  const reset = () => {
    count.value = 0
    lastChanged.value = null
  }

  return {
    count,
    lastChanged,

    doubleCount,
    isEven,

    increment,
    decrement,
    reset
  }
})
