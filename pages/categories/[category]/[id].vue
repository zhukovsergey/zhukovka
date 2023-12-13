<template>
  <div>
    <div class="flex flex-col justify-center items-center w-[100%] gap-4">
      <h1>{{ post.title }}</h1>
      <div v-if="post.mainimg" class="w-[80%] flex justify-center items-center">
        <NuxtImg
          :src="`${post.mainimg}`"
          class="mainimg rounded-md"
          sizes="200vw sm:50vw md:500px"
          format="webp"
          quality="80"
        />
      </div>
      <div
        v-html="post.text"
        class="w-[80%] flex flex-col gap-4 justify-center items-center"
      ></div>
    </div>
    <div class="comment flex flex-col justify-center items-center border-t-2">
      <h2>Блок комментариев</h2>
      <input
        type="text"
        placeholder="Введите имя"
        v-model="nameofcommentator"
        class="w-[300px]"
      />
      <textarea
        v-model="comment"
        class="peer block min-h-[auto] w-[30%] rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="exampleFormControlTextarea1"
        rows="4"
        placeholder="Ваш комментарий"
      ></textarea>

      <div>Напишите цифру {{ simplecaptcha[randNumber].name }} прописью</div>
      <input
        @input="transform"
        type="text"
        class="w-[300px]"
        v-model="reqcaptcha"
      />
      <div v-if="reqcaptcha == simplecaptcha[randNumber].otvet">отлично</div>
      <div v-else>Гавно</div>
      <button
        :disabled="reqcaptcha !== simplecaptcha[randNumber].otvet"
        @click="console.log('yes')"
        class="rounded-md p-2 transition ease-in-out delay-150 duration-300"
        :class="
          reqcaptcha !== simplecaptcha[randNumber].otvet
            ? 'bg-indigo-100 text-gray-800'
            : 'bg-indigo-500 text-white'
        "
      >
        Отправить
      </button>
      {{ reqcaptcha }}
    </div>
  </div>
</template>

<script setup>
const post = ref([]);
const error = useError();
const route = useRoute();
const comment = ref();
const reqcaptcha = ref();
const nameofcommentator = ref();
function transform() {
  reqcaptcha.value = reqcaptcha.value.toLowerCase();
}

const simplecaptcha = ref([
  { name: "33", otvet: "тридцать три" },
  { name: "45", otvet: "сорок пять" },
  { name: "23", otvet: "двадцать три" },
]);

const randNumber = Math.floor(Math.random() * 3);

onBeforeMount(async () => {
  const { data, error } = await $fetch(`/api/get/post/${route.params.id}`)
    .then((data) => (post.value = data.data[0]))
    .catch((error) => {
      console.log(error + "Ошибка");
      showError({
        statusCode: 404,
        statusMessage: "Page Not Found",
      });
      return createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
        fatal: true,
      });
    });
});
useHead(() => ({
  title: post.value.title + "- Zhukovka Блог",
  meta: [{ name: "description", content: post.value.shorttext }],
  link: [
    {
      rel: "canonical",
      href: "https://localhost:3000" + route.path,
    },
  ],
}));
</script>

<style lang="scss" scoped></style>
