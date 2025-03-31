<script lang="ts" setup>
import styles from './styles.module.scss'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event: Event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="`${styles['button-primary']} ${disabled ? styles['button-primary--disabled'] : ''}`"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
