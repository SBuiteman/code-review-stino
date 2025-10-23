<script setup lang="ts">
  import type { Question } from "~/types/review";
  const question = defineModel<Question>({ required: true });

  const showCommentInput = ref(false);
  const isQuestionNotApplicable = computed(() => question.value.score === 0)
  const hasComment = computed(() => !!question.value.comment)

  // Auto-show comment when question becomes not applicable
  watch(isQuestionNotApplicable, (newVal) => {
    if (newVal) {
      showCommentInput.value = true
    }
  })

  const shouldShowComment = computed(() => {
    // If not applicable and no comment yet, keep it open (can't be toggled closed)
    if (isQuestionNotApplicable.value && !hasComment.value) {
      return true
    }
    // Otherwise, user controls via toggle
    return showCommentInput.value
  })
</script>

<template>
  <span>
    <div class="flex items-center cursor-pointer w-full justify-between bg-white p-1 rounded mb-1">
      <div class="flex items-center w-full">
        <Icon v-if="question.score === 0" class="me-3 text-gray-600 mw-22" name="uil:times-circle" size="22" />
        <Icon v-else-if="typeof question.score === 'number' && question.comment" class="me-3 text-green-600 mw-22"
          name="uil:comment-check" size="22" />
        <Icon v-else-if="typeof question.score === 'number'" class="me-3 text-green-600" name="uil:check-circle"
          size="22" />
        <Icon v-else class="me-3 text-gray-600 min-w-[22px]" name="uil:circle" size="22" />
        <h3 class="font-semibold">{{ question.question }}</h3>
      </div>
      <div class="flex w-1/2 md:w-1/3 items-center">
        <BaseRateSelect v-if="question?.questionType === 'rating'" :options="question?.options" v-model="question.score"
          class="f grow" />
        <BaseTrueFalse v-if="question?.questionType === 'trueFalse'" :options="question?.options"
          v-model="question.score" class="f grow" />
        <Icon class="ms-3 text-gray-600 min-w-[22px]" name="uil:comment-medical" size="22"
          @click="showCommentInput = !showCommentInput">
        </Icon>
      </div>
    </div>
    <ReviewAddComment :class="isQuestionNotApplicable ? `border-red-500! border-2!` : ''" v-if="shouldShowComment"
      v-model="question" />
  </span>
</template>
