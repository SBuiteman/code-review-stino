<script setup lang="ts">
import type { RatingQuestion } from '~/types/review';

const modelValue = defineModel();

const { options } = defineProps<{
  options?: RatingQuestion['options']
}>()

const TIERS = [
  { code: 'A', name: 'Exemplary', score: 6, color: '#386641', textColor: 'white' },
  { code: 'B ', name: 'Great', score: 5, color: '#6a994e', textColor: 'white' },
  { code: 'C ', name: 'Good', score: 4, color: '#a7c957', textColor: 'black' },
  { code: 'D ', name: 'Could be improved', score: 3, color: '#fdf7d6', textColor: 'black' },
  { code: 'E', name: 'Needs improvement', score: 2, color: '#de6560', textColor: 'white' },
  { code: 'F', name: 'Needs rework', score: 1, color: '#ca3d3f', textColor: 'white' },
  { code: 'X', name: 'Not applicable', score: 0, color: '#e2e8f0', textColor: 'black' },
]

const opts = options ? TIERS.map((tier, index) => ({
  ...tier, 
  name: options?.[index] ?? tier.name
})) : TIERS

const valueData = (score: number) => {
  return opts.find((t) => t.score === score);
};

const avatarStyle = (score: number) => ({
  backgroundColor: valueData(score)?.color,
  color: valueData(score)?.textColor,
});
</script>

<template>
  <Select v-model="modelValue" :options="opts" option-label="name" option-value="score">
    <template #value="{ value }: { value: number }">
      <div v-if="typeof value === 'number'" class="flex items-center">
        <Avatar :label="valueData(value)?.code" :style="avatarStyle(value)" />
        <p class="ms-1">- {{ valueData(value)?.name }}</p>
      </div>
      <div v-else class="flex items-center">
        <Avatar label="X" />
        <p class="ms-2">Not set</p>
      </div>
    </template>
    <template #option="{ option }">
      <Avatar :label="option.code" :style="avatarStyle(option.score)" />
      <p class="ms-1">- {{ option.name }}</p>
    </template>
  </Select>
</template>
