<script setup lang="ts">
  import type { Question } from "~/types/review";

  const question = defineModel<Question>({ required: true });
  const commentInput = ref<any>(null);
  const labeltext = question.value.score === 0 ? `You have selected 'not applicable'. Please explain why this is not applicable` : 'Any additional comments you want to add?';

  onMounted(() => {
    nextTick(() => {
      if (commentInput.value?.$el) {
        commentInput.value.$el.focus();
      }
    });
  });
</script>
<template>
  <label class="sr-only" :for="question.question">{{ labeltext }}</label>
  <Textarea v-bind="$attrs" v-model="question.comment" :id="question.question" ref="commentInput"
    :placeholder="labeltext" class="w-full mt-4" rows="5" cols="30" />
</template>
