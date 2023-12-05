<template>
  <div>
    {{ post }}
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const post = ref([]);
const route = useRoute();
console.log(route.params);
async function getPost() {
  const { data } = await supabase
    .from("dorams")
    .select()
    .order("id", { ascending: true })
    .eq("url", route.params.id);
  post.value = data;
}
onMounted(() => {
  getPost();
});
</script>

<style lang="scss" scoped></style>
