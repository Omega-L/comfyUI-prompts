<template>
  <div>
    <Panel toggleable>
      <template #header>
        <div class="flex items-center gap-2 p-0.5">
          <span class="text-[12px]">{{ moduleName }}</span>
        </div>
      </template>
      <template #footer>
        <div class="w-full bg-surface-100 dark:bg-surface-950 overflow-auto">
          <SelectButton
            v-model="subModule"
            :options="options"
            size="small"
            @change="toggle"
          />
        </div>
      </template>
      <template #icons>
        <SecondaryButton
          icon="pi pi-cog"
          severity="secondary"
          variant="text"
          rounded
          size="small"
        />
      </template>
      <div class="text-[10px] text-comfy-input">
        {{ selectedValue }}
      </div>
      <!-- 弹窗 -->
      <Popover ref="op" @hide="onHide" @click.stop>
        <div ref="listRef" class="flex gap-4 text-[10px]">
          <PromptListBox
            v-for="(value, key) in listBox"
            v-model="selectedValue"
            :options="value"
            :type-name="key"
            :key="key"
          ></PromptListBox>
        </div>
      </Popover>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import SecondaryButton from "@/volt/SecondaryButton.vue";
import Panel from "@/volt/Panel.vue";
import SelectButton from "@/volt/SelectButton.vue";
import Popover from "@/volt/Popover.vue";
import PromptListBox from "./PromptListBox.vue";

import { computed, ref } from "vue";
import { SelectButtonChangeEvent } from "primevue";
import { onClickOutside } from "@vueuse/core";

interface Props {
  moduleName: string;
  options: string[];
}
const props = defineProps<Props>();

const subModule = ref("");

// 弹窗
const op = ref();
const listRef = ref();

let selectButtonChangeEvent: SelectButtonChangeEvent | null = null;

onClickOutside(
  op,
  () => {
    subModule.value = "";
  },
  { ignore: [listRef] },
);
const toggle = (event: SelectButtonChangeEvent) => {
  selectButtonChangeEvent = event;
  op.value.toggle(event.originalEvent);
};
const onHide = () => {
  if (selectButtonChangeEvent?.originalEvent && subModule?.value) {
    op.value.show(selectButtonChangeEvent.originalEvent);
  }
};

// 列表
const obj = {
  角色名: {
    作品名: [
      { name: "作品1", code: "AU" },
      { name: "作品2", code: "BR" },
      { name: "作品3", code: "CN" },
      { name: "作品4", code: "EG" },
      { name: "作品5", code: "FR" },
      { name: "作品6", code: "DE" },
    ],
    角色名: [
      { name: "角色1", code: "AU" },
      { name: "角色2", code: "BR" },
      { name: "角色3", code: "CN" },
      { name: "角色4", code: "EG" },
      { name: "角色5", code: "FR" },
      { name: "角色6", code: "DE" },
    ],
  },
};

const selectedValue = ref(null);

const listBox = computed(() => {
  return (
    obj[subModule.value as keyof typeof obj] ?? {
      [subModule.value]: [{ name: "请选择", code: "" }],
    }
  );
});
</script>
