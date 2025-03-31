<script lang="ts" setup>

</script>

<template>
  <div class="container">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100svh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 100%;
  max-width: 700px;
}
</style>
