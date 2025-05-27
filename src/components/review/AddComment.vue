<script setup lang="ts">
import type { Question } from "~/types/review";
import { reviewPlaceholders } from "@/constants/placeholders";
const question = defineModel<Question>({ required: true });
</script>
<template>
  <Textarea
    v-model="question.comment"
    placeholder="Any additional comments you want to add?"
    class="w-full mt-4"
    rows="5"
    cols="30"
  />
</template>
