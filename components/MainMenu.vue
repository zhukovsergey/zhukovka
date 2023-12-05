<template>
  <div
    class="flex justify-between flex-wrap h-auto bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full px-4 py-4 rounded-md text-white font-bold"
  >
    <NuxtLink to="/"
      ><img
        src="/logo/logo.png"
        class="w-[280px] hover:scale-110 transition ease-in-out delay-150 duration-300"
    /></NuxtLink>
    <div class="flex flex-wrap gap-6 items-center">
      <NuxtLink to="/categories" class="flex gap-2 justify-start"
        ><Icon name="bxs:category" color="purple" size="25" /><span
          >Категории</span
        ></NuxtLink
      >
      <NuxtLink to="/" class="flex gap-2 justify-end"
        ><Icon name="ic:baseline-face-3" color="purple" size="25" /><span
          >Обо мне</span
        ></NuxtLink
      >
    </div>
  </div>
</template>

<script setup></script>

<style lang="css" scoped>
span {
  font-size: 18px;
}
</style>
