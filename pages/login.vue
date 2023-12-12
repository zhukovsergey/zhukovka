<template>
  <div>
    <Login />
  </div>
</template>

<script setup>
const user = useSupabaseUser();
onBeforeMount(async () => {
  if (user) {
    await navigateTo("/admin");
  }
});
</script>

<style lang="scss" scoped></style>
