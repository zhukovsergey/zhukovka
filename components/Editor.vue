<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import ImageUploader from "quill-image-uploader";
import BlotFormatter from "quill-blot-formatter";
import scripts from "../public/uploads/scripts/translit";

function translite() {
  url.value = scripts.translite(title.value);
}
const supabase = useSupabaseClient();
const categoriesfromsupabase = ref();
async function getPosts() {
  const { data } = await supabase
    .from("categories")
    .select()
    .order("id", { ascending: true });

  categoriesfromsupabase.value = data;
  console.log(categoriesfromsupabase.value);
}
onMounted(() => {
  getPosts();
});
const content = ref("");

const modules = [
  {
    name: "imageUploader",
    module: ImageUploader,
    options: {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", file);
          console.log(file);
          $fetch("/api/post/post", {
            method: "POST",
            body: formData,
          }).then((res) => {
            console.log(res);
            resolve(`/uploads/${res}`);
          });
          //   .catch((err) => {
          //     reject("Upload failed");
          //     console.error("Error:", err);
          //   });
        });
      },
    },
  },
  {
    name: "blotFormatter",
    module: BlotFormatter,
    options: {
      /* options */
    },
  },
];

async function onSubmit() {
  const formData = new FormData();
  formData.append("text", content.value);
  formData.append("shorttext", shorttext.value);
  formData.append("title", title.value);
  formData.append("url", url.value);
  formData.append("category", category.value);
  formData.append("mainfile", mainFile.value);

  await $fetch("/api/post/push/post", {
    method: "POST",
    body: formData,
  });
}
const shorttext = ref("");
const mainFile = ref("");
const title = ref("");
const url = ref("");
const category = ref("");
async function uploadMainFile(e) {
  mainFile.value = e.target.files[0];
}
</script>
<template>
  <div class="mx-8 mt-8">
    <ClientOnly>
      <label class="block my-4">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
        >
          Заголовок статьи
        </span>
        <input
          @input="translite"
          type="text"
          class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="Заголовок статьи"
          v-model="title"
        />
      </label>
      <label class="block my-4">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
        >
          url статьи
        </span>
        <input
          type="text"
          disabled
          class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder=""
          v-model="url"
        />
      </label>
      <span
        class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
      >
        Текст статьи
      </span>
      <QuillEditor
        theme="snow"
        v-model:content="content"
        toolbar="full"
        :modules="modules"
        content-type="html"
      />
      <label class="block my-6">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
        >
          Краткое описание статьи
        </span>
        <input
          type="text"
          class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="Краткое описание"
          v-model="shorttext"
        />
      </label>
      <label
        for="category"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Выберите категорию</label
      >
      <select
        v-model="category"
        id="category"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option
          v-for="cat in categoriesfromsupabase"
          v-bind:value="cat.titleofcategory"
        >
          {{ cat.titleofcategory }}
        </option>
      </select>
      <label class="block my-6">
        <input
          type="file"
          accept="image/png, image/jpeg"
          @change="uploadMainFile"
          class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        /><span class="text-xs mx-4">главное фото статьи</span>
      </label>
      <button
        class="bg-indigo-500 hover:bg-indigo-700 text-white p-2 rounded-md mt-2 mx-2"
        @click="onSubmit"
      >
        Отправить
      </button>
    </ClientOnly>
  </div>
</template>
