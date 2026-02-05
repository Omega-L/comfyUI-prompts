
<template>
    <div class="">
        <Panel toggleable>
            <template #header>
                <div class="flex items-center gap-2 p-0.5">
                    <span class="text-[12px]">演员</span>
                </div>
            </template>
            <template #footer>
                <SelectButton v-model="value" :options="options" size="small" />
            </template>
            <template #icons>
                <SecondaryButton icon="pi pi-cog" severity="secondary" variant="text" rounded size="small" />
            </template>
            <div class="text-[10px] text-comfy-input">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </div>
        </Panel>
    </div>
</template>

<script setup lang="ts">
import SecondaryButton from '@/volt/SecondaryButton.vue';
import Panel from '@/volt/Panel.vue';
import SelectButton from '@/volt/SelectButton.vue';
import { ref } from 'vue';

const value = ref('角色名');
const options = ref(['角色名', '头发', '脸部', '眼睛', '鼻子', '嘴巴', '耳朵']);

</script>
