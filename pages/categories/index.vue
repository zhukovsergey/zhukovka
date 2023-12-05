<template>
  <div class="flex gap-6 flex-row mt-4 mx-6 flex-wrap">
    <div v-for="post in posts" class="w-[200px] mx-6">
      <NuxtLink :to="`/categories/${post.urlofcategory}`">
        <div
          class="block w-[240px] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] transition duration-200 ease-in-out"
        >
          <a href="#!" v-if="post.imgofcategory">
            <div class="relative">
              <div
                class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900"
              >
                20
              </div>
            </div>
            <img class="rounded-t-lg" :src="`${post.imgofcategory}`" alt="" />
          </a>
          <a href="#!" v-else>
            <div class="relative">
              <div
                class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900"
              >
                20
              </div>
            </div>
            <img
              class="rounded-t-lg"
              src="https://tenzip.ru/wa-data/public/site/themes/profitshop/img/defaultjpg?v1682676673"
              alt=""
            />
          </a>
          <div class="p-6">
            <h5
              class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"
            >
              <div v-html="post.titleofcategory" />
            </h5>
            <p
              class="mb-4 text-base text-neutral-600 dark:text-neutral-200 h-[50px] overflow-hidden"
            >
              {{ post.descriptionofcategory }}...
            </p>
            <button
              type="button"
              class="inline-block rounded bg-indigo-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Перейти
            </button>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const posts = ref([]);
async function getPosts() {
  const { data } = await supabase
    .from("categories")
    .select()
    .order("id", { ascending: true });
  posts.value = data;
}
onMounted(() => {
  getPosts();
});
</script>

<style>
img {
  cursor: pointer !important;
}
</style>
