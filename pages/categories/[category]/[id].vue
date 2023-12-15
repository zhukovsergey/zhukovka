<template>
  <div>
    <div class="flex flex-col justify-center items-center w-[100%] gap-4">
      {{ post }}

      <div class="date flex flex-col justify-start items-start relative">
        <h1>{{ post.title }}</h1>
        <p v-if="post.created_at" class="text-xs text-gray-500">
          {{ formatDate(post.created_at) }}
        </p>
      </div>
      <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700 w-[200px]" />
      <div v-if="post.mainimg" class="w-[80%] flex justify-center items-center">
        <NuxtImg
          :src="`${post.mainimg}`"
          class="mainimg rounded-md"
          sizes="200vw sm:50vw md:600px"
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
      <h2>Новый комментарий</h2>
      <input
        @input="validateName"
        minlength="3"
        required
        type="text"
        placeholder="Введите имя"
        v-model="nameofcommentator"
        class="bg-green-50 border w-[300px] my-4 border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-green-100 dark:border-green-400"
      />
      <p class="text-xs text-red-500">{{ viserror }}</p>
      <textarea
        @input="validateComment"
        minlength="5"
        required
        v-model="comment"
        class="peer block min-h-[auto] w-[30%] rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="exampleFormControlTextarea1"
        rows="4"
        placeholder="Ваш комментарий"
      ></textarea>
      <div class="flex flex-col justify-center gap-2 items-center my-4">
        <p>Проверка что вы человек</p>
        <NuxtTurnstile v-model="token" />
        <p v-if="token" class="text-xs text-indogi-500">Проверка пройдена</p>
        <p v-else class="text-xs text-indogi-500">Проверка не пройдена</p>
      </div>

      <button
        :disabled="!token || !nameofcommentator"
        @click="submitComment"
        class="rounded-md p-2 transition ease-in-out delay-150 duration-300 text-white"
        :class="token && nameofcommentator ? 'bg-indigo-500 text-white' : ''"
      >
        Отправить
      </button>
    </div>
    <h2 class="text-center font-bold text-lg my-4">
      Комментарии
      <span v-if="comments" class="text-gray-600">{{ comments.length }}</span>
    </h2>
    <div
      v-for="(com, index) in comments"
      class="comments w-full flex justify-center items-center gap-2 mb-2"
    >
      <div class="flex flex-col justify-center items-center">
        <div
          class="relative md:w-[600px] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <Icon
            @click="deleteComment(com.id)"
            name="typcn:delete-outline"
            size="24"
            color="indigo"
            class="absolute right-0 top-0 hover:"
          />
          <div class="flex items-center">
            <input
              @change="actComment(com.id, com.isactive)"
              :checked="com.isactive"
              v-model="com.isactive"
              :id="com.id"
              type="checkbox"
              :value="com.isactive"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            <label
              for="checked-checkbox"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Активность</label
            >
          </div>

          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ com.name }}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            {{ com.comment }}
          </p>
          <hr class="h-px mt-4 mb-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <p class="text-xs text-gray-700 dark:text-gray-400">
            {{ formatDate(com.created_at) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const token = ref();
const post = ref([]);
const error = useError();
const route = useRoute();
const comment = ref();
const nameofcommentator = ref();
const viserror = ref();
const comments = ref();

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
  getPost();
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
function validateName() {
  if (nameofcommentator.value.length < 3) {
    viserror.value = "Имя слишком короткое";
  } else {
    viserror.value = "";
  }
}
function validateComment() {
  if (comment.value.length < 3) {
    viserror.value = "Слишком короткий комментарий";
  } else {
    viserror.value = "";
  }
}

async function submitComment() {
  const formData = new FormData();
  formData.append("name", nameofcommentator.value);
  formData.append("comment", comment.value);
  formData.append("token", token.value);
  formData.append("postId", post.value.id);
  await $fetch("/api/post/comment/post/post", {
    method: "POST",
    body: formData,
  });
  comments.value.unshift({
    comment: comment.value,
    name: nameofcommentator.value,
    created_at: new Date(),
  });
  nameofcommentator.value = "";
  comment.value = "";
}

async function actComment(id, act) {
  console.log(id + "  " + act);
  const { data, error } = await supabase
    .from("comments")
    .update({ isactive: act })
    .eq("id", id)
    .select();
}
async function deleteComment(id) {
  const result = confirm("Вы действительно хотите удалить комментарий?");
  if (result) {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    const someArray2 = comments.value.filter((el) => el.id !== id);
    comments.value = someArray2;
    if (error) throw error;
  }
}

async function getPost() {
  console.log(post);
  const { data, error } = await supabase
    .from("comments")

    .select("*")
    .order("created_at", { ascending: false })
    .eq("idofpost", post.value.id);
  console.log(data);
  comments.value = data;
}
let options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
function formatDate(dateStr) {
  return Intl.DateTimeFormat("ru-RU", options).format(new Date(dateStr));
}
</script>

<style lang="css">
svg:hover {
  color: rgb(129, 84, 161) !important;
  cursor: pointer;
}
</style>
