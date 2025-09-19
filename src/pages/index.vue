<script setup>
import { useVuelidate } from "@vuelidate/core";

const v$ = useVuelidate();

const checkFields = () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    navigateTo("/overview");
  }
};
</script>

<template>
  <div>
    <LayoutSectionHead>
      <template v-slot:title>Project information</template>
      <template v-slot:desc>Filling in your info</template>
    </LayoutSectionHead>
    <div class="flex flex-col gap-3 mx-auto mt-16 items-center">
      <TeamInfo />

      <div class="flex w-full gap-2">
        <Button
          :severity="v$.$errors.length > 0 ? 'secondary' : 'success'"
          label="Start review"
          @click="checkFields()"
          class="ml-auto"
          :class="[v$.$errors.length > 0 ? 'pointer-events-none' : '']"
          >
          <Icon name="ic:baseline-rate-review" size="22" />
          Ready
        </Button>
      </div>
    </div>
  </div>
</template>
