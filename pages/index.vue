<template>
  <div>
    <h2 class="text-center mb-4">Последние добавленные статьи</h2>
    <div class="flex flex-wrap gap-4 justify-center items-center"></div>
    <Carousel
      :items-to-show="3.8"
      :wrap-around="true"
      :transition="500"
      class="md:block hidden"
    >
      <Slide v-for="slide in swip" :key="slide">
        <div class="carousel__item">
          <NuxtLink
            :to="`/categories/${translite(slide.category)}/${slide.url}`"
            format="webp"
            loading="lazy"
          >
            <div
              class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div class="h-auto">
                <NuxtImg
                  class="rounded-t-lg object-cover h-48 w-96"
                  :src="`${slide.mainimg}`"
                  alt=""
                />
              </div>
              <div class="p-5">
                <a href="#">
                  <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                  >
                    {{ slide.title }}
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {{ slide.shorttext }}
                </p>
                <a
                  href="#"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Подробнее...
                  <svg
                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </NuxtLink>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const swip = ref();

import scripts from "../public/uploads/scripts/translit";
function translite(categoryurl) {
  return scripts.translite(categoryurl);
}
async function getPosts() {
  const { data } = await supabase
    .from("dorams")
    .select()
    .order("created_at", { ascending: true })
    .range(0, 9);

  swip.value = data;
}
onMounted(() => {
  getPosts();
});
</script>

<style></style>
