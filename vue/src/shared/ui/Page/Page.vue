<script lang="ts" setup>
import styles from './styles.module.scss'
</script>

<template>
  <div :class="styles['container']">
    <div :class="styles['content']">
      <slot />
    </div>
  </div>
</template>
