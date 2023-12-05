<template>
  <div class="mx-6">
    <label class="block my-6">
      <span
        class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
      >
        Название категории
      </span>
      <input
        @input="translite"
        type="text"
        class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        placeholder="Название категории"
        v-model="titleofcategory"
      />
    </label>
    <label class="block my-6">
      <span
        class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
      >
        Описание категории
      </span>
      <input
        @input="translite"
        type="text"
        class="mt-1 h-14 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        placeholder="Краткое описание категории"
        v-model="descriptionofcategory"
      />
    </label>
    <label class="block my-6">
      <span
        class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
      >
        Ссылка на категорию (формируется автоматом)
      </span>
      <input
        disabped
        type="text"
        class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        placeholder="Ссылка на категорию"
        v-model="urlofcategory"
      />
    </label>
    <label class="block my-6">
      <input
        type="file"
        accept="image/png, image/jpeg"
        @change="uploadMainFile"
        class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
      /><span class="text-xs mx-4">главное фото статьи</span>
    </label>
    <button
      class="bg-indigo-500 text-white rounded-md p-2 w-[100px]"
      @click="onSubmit"
    >
      Создать
    </button>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
import scripts from "../../../public/uploads/scripts/translit";
function translite() {
  urlofcategory.value = scripts.translite(titleofcategory.value);
}
const titleofcategory = ref("");
const urlofcategory = ref("");
const imgofcategory = ref("");
const descriptionofcategory = ref("");

async function uploadMainFile(e) {
  imgofcategory.value = e.target.files[0];
}

async function onSubmit() {
  const formData = new FormData();
  formData.append("titleofcategory", titleofcategory.value);
  formData.append("urlofcategory", urlofcategory.value);
  formData.append("imgofcategory", imgofcategory.value);
  formData.append("descriptionofcategory", descriptionofcategory.value);

  await $fetch("/api/post/pushcategory/post", {
    method: "POST",
    body: formData,
  });
}
</script>

<style lang="scss" scoped></style>
