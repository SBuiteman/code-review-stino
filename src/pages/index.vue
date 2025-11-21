<script setup>
</script>

<template>
  <div>
    <LayoutSectionHead>
      <template v-slot:title>Project information</template>
      <template v-slot:desc>Filling in your info</template>
    </LayoutSectionHead>
    <div class="flex flex-col gap-3 mx-auto mt-16 items-center">
      <TeamInfo />
    </div>
  </div>
</template>
