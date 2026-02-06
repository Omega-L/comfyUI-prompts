<template>
  <div>
    <PromptsModule module-name="演员" :options="options"></PromptsModule>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PromptsModule from "./PromptsModule.vue";

const options = ref(["角色名", "头发", "脸部", "眼睛", "鼻子", "嘴巴", "耳朵"]);
</script>

<style scoped></style>
