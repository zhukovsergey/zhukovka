<template>
  <div
    class="shadow-lg flex justify-between flex-wrap h-auto bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full px-4 py-4 rounded-md text-white font-bold"
  >
    <NuxtLink to="/"
      ><img
        src="/logo/logo.png"
        class="w-[280px] hover:scale-110 transition ease-in-out delay-150 duration-300"
    /></NuxtLink>
    <div class="flex flex-wrap gap-6 items-center">
      <NuxtLink to="/categories" class="flex gap-2 justify-start"
        ><Icon
          name="bxs:category"
          color="purple"
          size="25"
          class="transition ease-in-out delay-150 duration-200"
        /><span
          class="hover:text-indigo-100 transition ease-in-out delay-150 duration-200"
          >Категории</span
        ></NuxtLink
      >

      <NuxtLink to="/" class="flex gap-2 justify-end"
        ><Icon
          name="ic:baseline-face-3"
          color="purple"
          size="25"
          class="transition ease-in-out delay-150 duration-200"
        /><span
          class="hover:text-indigo-100 transition ease-in-out delay-150 duration-200"
          >Обо мне</span
        ></NuxtLink
      >
      <NuxtLink v-if="!user" to="/login" class="flex gap-2 justify-end"
        ><Icon
          name="ic:baseline-face-3"
          color="purple"
          size="25"
          class="transition ease-in-out delay-150 duration-200"
        /><span
          class="hover:text-indigo-100 transition ease-in-out delay-150 duration-200"
          >Войти
        </span></NuxtLink
      >
      <NuxtLink v-else to="/admin" class="flex gap-2 justify-end"
        ><Icon
          name="eos-icons:admin-outlined"
          color="purple"
          size="25"
          class="transition ease-in-out delay-150 duration-200"
        /><span
          v-if="user"
          class="hover:text-indigo-100 transition ease-in-out delay-150 duration-200"
          >{{ user.email }}
        </span></NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
</script>

<style lang="css" scoped>
span {
  font-size: 18px;
}
a:hover svg {
  color: white !important;
}
</style>
