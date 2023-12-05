<template>
  <div>
    <h1 class="text-center mb-4">{{ catinfo.titleofcategory }}</h1>

    <div class="flex gap-6 mt-8 flex-wrap">
      <div
        v-for="p in posts"
        class="flex flex-col justify-center items-center mx-2 my-2"
      >
        <NuxtLink :to="`${route.params.id}/post/${p.url}`">
          <div
            class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              class="object-cover w-full rounded-t-lg md:h-[200px] md:w-auto md:rounded-none md:rounded-s-lg transition duration-300 ease-in-out hover:scale-110"
              :src="`${p.mainimg}`"
              alt=""
            />
            <div
              class="flex flex-col justify-between p-4 leading-normal w-[200px] md:border-l-2 border-indigo-100"
            >
              <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {{ p.title }}
              </h5>
              <p
                class="mb-3 font-normal text-gray-700 dark:text-gray-400 w-[100px] truncate"
              >
                {{ p.shorttext }}
              </p>
              <p
                class="mb-3 font-normal text-gray-700 dark:text-gray-400 w-auto text-sm"
              >
                {{ formatDate(p.created_at) }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();

const route = useRoute();
console.log(route.params);
const posts = ref([]);
const catinfo = ref("");
async function getPost() {
  const { data } = await supabase
    .from("categories")

    .select(
      "id, titleofcategory, dorams(id,title,url,shorttext, mainimg, created_at) "
    )
    .order("id", { ascending: true })
    .eq("urlofcategory", route.params.id);

  posts.value = data[0].dorams;
  catinfo.value = data[0];
}
onMounted(() => {
  getPost();
});
let options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
function formatDate(dateStr) {
  return Intl.DateTimeFormat("ru-RU", options).format(new Date(dateStr));
}

const dataes = new Intl.DateTimeFormat("ru-RU", options).format(new Date());
console.log(dataes);
</script>

<style lang="scss" scoped></style>
