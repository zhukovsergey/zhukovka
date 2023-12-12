<template>
  <div class="w-full flex flex-col justify-center items-center login">
    <div class="w-[20%] flex flex-col text-center justofy-center items-center">
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Ваш логин</label
      >
      <input
        type="email"
        id="email"
        v-model="login"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name@flowbite.com"
        required
      />
    </div>
    <div class="w-[20%] flex flex-col text-center justofy-center items-center">
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Ваш пароль</label
      >
      <input
        type="password"
        id="password"
        v-model="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />

      <button
        @click="submit"
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const toast = useToast();
const login = ref("");
const password = ref("");

async function submit() {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: login.value,
      password: password.value,
    });

    toast.add({
      id: "update_downloaded",
      title: "Update downloaded.",
      description: "It will be installed on restart. Restart now?",
      icon: "i-heroicons-check-circle",
      timeout: 5000,
    });
    await navigateTo("/login");
    if (error) throw error;
  } catch (e) {
    console.log(e);
  }
}
</script>

<style lang="scss" scoped></style>
