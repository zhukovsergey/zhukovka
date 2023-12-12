<script setup>
const props = defineProps({
  error: Object,
});
throw createError({
  statusCode: 404,
  statusMessage: "Page Not Found",
  fatal: true,
});
const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div>
    <h2>{{ error.statusCode }}</h2>
    <button @click="handleError">Clear errors</button>
  </div>
</template>
