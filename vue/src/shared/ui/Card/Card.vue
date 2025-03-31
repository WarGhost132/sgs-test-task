<script lang="ts" setup>
import styles from './styles.module.scss'
</script>

<template>
  <div :class="styles['card']">
    <slot />
  </div>
</template>
