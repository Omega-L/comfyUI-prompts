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
        {{ selectedMap }}
      </div>
      <!-- 弹窗 -->
      <Popover ref="op" @hide="onHide" @show="setListBox" @click.stop>
        <div
          ref="listRef"
          v-if="listBox"
          class="flex gap-4 text-[10px]"
        >
          <PromptListBox
            v-for="(value, key) in listBox"
            v-model="selectedMap[key]"
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

import { ref,watch } from "vue";
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
  眼睛: {
    颜色: [
      { name: "眼睛1", code: "AU" },
      { name: "眼睛2", code: "BR" },
      { name: "眼睛3", code: "CN" },
      { name: "眼睛4", code: "EG" },
      { name: "眼睛5", code: "FR" },
      { name: "眼睛6", code: "DE" },
    ]
  }
};

const selectedMap = ref<Record<string, string>>({});

watch(() => selectedMap.value,()=>{
  console.log(selectedMap.value);
  
},{deep: true})

const listBox = ref<Record<string, any[]> | null>(null);
function setListBox() {
  listBox.value = obj[subModule.value as keyof typeof obj] ?? {
    [subModule.value]: null,
  };
}
</script>
