<template>
  <div>
    <Login />
    {{ user?.email }}
  </div>
</template>

<script setup>
const user = useSupabaseUser();
onBeforeMount(async () => {
  // if (user.email) {
  //   await navigateTo("/admin");
  // }
});
</script>

<style lang="scss" scoped></style>
