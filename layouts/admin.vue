<template>
  <div class="flex flex-wrap">
    <MainMenu></MainMenu>
    <div class="flex w-full flex-wrap">
      <div class="border-r-2">
        <nav class="flex flex-col mt-[50px] ml-4 text-xl gap-4 w-[200px]">
          <NuxtLink to="/admin/newcategory">Добавить категорию</NuxtLink>
          <NuxtLink to="/admin/newpost">Добавить статью</NuxtLink>
        </nav>
      </div>
      <div class="mt-[30px] w-[80%]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
