<script setup lang="ts">
  import type { Question } from "~/types/review";

  const question = defineModel<Question>({ required: true });
  const commentInput = ref<any>(null);

  onMounted(() => {
    nextTick(() => {
      if (commentInput.value?.$el) {
        commentInput.value.$el.focus();
      }
    });
  });
</script>
<template>
  <Textarea v-model="question.comment" ref="commentInput" placeholder="Any additional comments you want to add?"
    class="w-full mt-4" rows="5" cols="30" />
</template>
