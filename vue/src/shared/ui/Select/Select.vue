<script lang="ts" setup>
import { computed } from 'vue'
import styles from './styles.module.scss'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  options: {
    type: Array as () => Array<{ value: string | number, label: string }>,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  hint: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}

const groupClasses = computed(() => [
  styles['select-group'],
  { [styles['select-group--has-hint']]: props.hint && props.disabled }
])
</script>

<template>
  <div :class="groupClasses">
    <label v-if="label" :class="styles['select-label']">{{ label }}</label>
    <select
      :value="modelValue"
      :class="styles['select-control']"
      :disabled="disabled"
      @change="handleChange"
    >
      <option
        v-if="placeholder"
        value=""
        disabled
        hidden
      >
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div v-if="hint && disabled" :class="styles['select-hint']">{{ hint }}</div>
  </div>
</template>
