<script setup lang="ts">
import { useCounterStore } from '@/features/counter'
import { storeToRefs } from 'pinia'

import styles from './styles.module.scss'

const counter = useCounterStore()

const { count, doubleCount, isEven } = storeToRefs(counter)

const handleIncrement = () => counter.increment(2)
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <p>Is even: {{ isEven ? 'Yes' : 'No' }}</p>

    <button @click="counter.increment()">+1</button>
    <button @click="handleIncrement">+2</button>
    <button @click="counter.decrement()">-1</button>
    <button @click="counter.reset()">Reset</button>
  </div>
</template>
