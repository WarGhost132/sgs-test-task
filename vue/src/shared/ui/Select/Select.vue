<script lang="ts" setup>
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
</script>

<template>
  <div class="form-group">
    <label v-if="label" class="form-label">{{ label }}</label>
    <select
      :value="modelValue"
      class="form-select"
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
    <div v-if="hint && disabled" class="hint">{{ hint }}</div>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-select:focus {
  outline: none;
  border-color: #4285f4;
  box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
}

.form-select:disabled {
  background-color: #f9f9f9;
  color: #999;
  cursor: not-allowed;
}

.hint {
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.85rem;
  font-style: italic;
}
</style>
