<script setup lang="ts">
const { answeredPercentage, questionsLeft } = storeToRefs(useReviewStore());
</script>

<template>
  <Message v-if="answeredPercentage < 100" class="max-w-4xl mx-auto mt-16 p-4 bg-slate-50" severity="none" id="review-warning">
    <div class="flex gap-6 items-center">
      <Icon class="h-32! w-32!" name="teenyicons:exclamation-circle-outline" size="48" />
      <article>
        <h3 class="text-xl">Review Incomplete</h3>
        <p>
          The review process is currently incomplete. To ensure an accurate and comprehensive assessment, please make sure to provide scores for all subjects,
          topics, and individual questions. Your thorough evaluation is essential for generating a complete and meaningful overall score. We know this will take
          some time but we thank you for your attention to detail and commitment to a comprehensive review.
        </p>
        <p class="flex mx-auto mt-8 items-center">
          <span class="mr-2">Questions left:</span>
          <Tag :severity="answeredPercentage < 60 ? 'danger' : answeredPercentage < 90 ? 'warn' : 'success'">{{ questionsLeft }}</Tag>
          <Button label="Go to Review page" class="ml-auto" severity="contrast" @click="navigateTo('/review')" />
        </p>
      </article>
    </div>
  </Message>
</template>
