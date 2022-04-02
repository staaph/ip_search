<template>
  <div
    class="opacity-75 absolute mt-10 flex flex-col md:flex-row bg-gray-100 gap-y-3 gap-x-6 px-5 py-4 rounded-xl"
  >
    <!-- Item 1 -->
    <div class="flex flex-col">
      <h3 class="text-xs uppercase text-black font-bold sm:font-normal">
        IP Adress
      </h3>
      <span class="sm:text-2xl">{{ ipInfo.adress }}</span>
    </div>
    <!-- Item 2 -->
    <div class="flex flex-col">
      <h3 class="text-xs uppercase font-bold sm:font-normal">Location</h3>
      <span class="sm:text-2xl">{{ ipInfo.state }}</span>
    </div>
    <!-- Item 3 -->
    <div class="flex flex-col">
      <h3 class="text-xs uppercase font-bold sm:font-normal">Timezone</h3>
      <span class="sm:text-2xl">UTC {{ ipInfo.timezone }}</span>
    </div>
    <!-- Item 4 -->
    <div class="flex flex-col">
      <h3 class="text-xs uppercase font-bold sm:font-normal">Isp</h3>
      <span class="sm:text-2xl">{{ ipInfo.isp }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['ipInfo'],
};
</script>
