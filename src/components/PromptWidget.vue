<template>
  <div class="prompt-container">
    <h1>{{ t("comfyUI-prompt.title") }}</h1>
    <div>
      <MultiSelect
        v-model="selectedCities"
        :options="cities"
        optionLabel="name"
        filter
        placeholder="Select Cities"
        class="w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { ComfyApp } from "@comfyorg/comfyui-frontend-types";
import MultiSelect from "@/volt/MultiSelect.vue";

declare global {
  interface Window {
    app?: ComfyApp;
  }
}

interface ComponentWidget {
  serializeValue?: (node: unknown, index: number) => Promise<unknown>;
}

const props = defineProps<{
  widget: ComponentWidget;
  node: { id: number };
}>();

const { t } = useI18n();

const selectedCities = ref();
const cities = ref([
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
]);

onMounted(() => {
  props.widget.serializeValue = async (node, index) => {
    try {
      console.log("Vue Component: inside vue serializeValue");
      console.log("node", node);
      console.log("index", index);
      console.log(selectedCities.value);
      const text = selectedCities.value
        .map((city: Record<string, any>) => city.name)
        .join(", ");

      return {
        text,
      };
    } catch (error) {
      console.error("Vue Component: Error in serializeValue:", error);
      return { text: null };
    }
  };
});
</script>

<style scoped>
.prompt-container {
  box-sizing: border-box;
}

.prompt-container h1 {
  font-size: 14px;
}
</style>
