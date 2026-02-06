<template>
  <div>
    <span class="font-medium mb-2">{{ typeName }}</span>
    <Listbox
      :virtualScrollerOptions="{ itemSize: 24 }"
      filter
      optionLabel="name"
      class="w-full"
      listStyle="max-height:250px"
      v-bind="$attrs"
    >
      <template #option="slotProps">
        <div class="flex items-center">
          <span>{{ slotProps.option.name }}</span>
        </div>
      </template>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import Listbox from '@/volt/Listbox.vue';

interface Props {
  typeName:string,
}
defineProps<Props>();

</script>

<style scoped></style>
