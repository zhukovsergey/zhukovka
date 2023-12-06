<template>
  <div>
    {{ post }}
  </div>
</template>

<script setup>
const post = ref([]);

const route = useRoute();

onBeforeMount(async () => {
  const { data, error } = await $fetch(`/api/get/post/${route.params.id}`).then(
    (data) => (post.value = data)
  );
  // .catch((error) => {
  //   console.log(error + "Ошибка");
  //   throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
  // });
});
</script>

<style lang="scss" scoped></style>
