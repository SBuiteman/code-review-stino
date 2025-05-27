<script setup lang="ts">
import type { Question } from "~/types/review";
import { reviewPlaceholders } from "@/constants/placeholders";
const question = defineModel<Question>({ required: true });
// TODO: refactor this and change the if conditions to mark what is set/unset/touched/untouched
const randomPlaceholder = computed(() => {
  if (question.value.score === 0) return "";
  if (typeof question.value.score !== "number") return "Score this question...";
  const placeholders =
    reviewPlaceholders[question.value.score as keyof typeof reviewPlaceholders];
  return placeholders[Math.floor(Math.random() * placeholders.length)];
});
</script>
<template>
  <h2>{{ question.question }}</h2>
  <Textarea
    v-model="question.comment"
    :placeholder="randomPlaceholder"
    class="w-full mt-4"
    rows="5"
    cols="30"
  />
</template>
