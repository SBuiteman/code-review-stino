<script setup lang="ts">
  import { useVuelidate } from "@vuelidate/core";
  import { required } from "@vuelidate/validators";

  const { team, reviewers } = storeToRefs(useTeamStore());
  const nameField = ref("");

  const isCollapsed = ref(true);

  const addReviewer = () => {
    if (!nameField.value) return;
    if (reviewers.value._value.includes(nameField.value)) return;
    team.value.reviewers._value.push(nameField.value);
    nameField.value = "";
  };

  const removeReviewer = (remover: string) => {
    team.value.reviewers._value = team.value.reviewers._value.filter(
      (reviewer) => reviewer !== remover
    );
  };

  const rules = {
    team: {
      NameOfTeamBeingReviewed: { _value: { required } },
      applicationName: { _value: { required } },
      reviewers: { _value: { required } },
      repoUrl: { _value: { required } },
      branch: { _value: { required } },
      date: { _value: { required } },
    },
  };

  const v$ = useVuelidate(rules, { team });

  function checkFields() {
    v$.value.team.$touch();
    console.log(v$.value.team.$invalid);
    if (v$.value.team.$invalid) {
      return false;
    }

    navigateTo("/overview");
  }


</script>

<template>
  <div class="w-full">
    <p class="mt-2">
      Please fill out the following fields with the relevant information<sup>*</sup>:
    </p>
    <p class="text-sm mb-5">
      <sup>*</sup> Except for the name of the Reviewers the relevant data is about the project being reviewed.
    </p>
    <Fieldset legend="Project details" class="mx-auto !bg-slate-50 w-full " pt:content="pb-0!"
      pt:legend="text-xl bg-transparent!">
      <ul class="grid grid-cols-2 gap-x-6">
        <template v-for="(item, key) in team">
          <li v-if="item.required" class="flex py-3 not-last:border-b border-secondary">
            <span class="!w-full">
              <!-- Keys -->
              <label :for="key" class="w-1/3 capitalize flex items-center">{{ formatKey(key) }}</label>

              <!-- Value if Date -->
              <div v-if="key === 'date'" class="flex items-center !w-full mr-auto">
                <div class="w-full border-b border-secondary pb-3">
                  <DatePicker :id="key" v-model="team[key]._value" :inputClass="{ 'p-invalid': v$.team.date.$error }"
                    placeholder="Date" />
                </div>
              </div>

              <!-- Value if Array - reviews input-->
              <div v-else-if="key === 'reviewers'" class="w-full">
                <div class="flex !w-full gap-2">
                  <InputText type="text" v-model="nameField" class="grow !w-full" placeholder="Reviewer name"
                    :invalid="v$.team['reviewers']?.$error" />
                  <Button label="Add reviewer" severity="contrast" @click="addReviewer()" :disabled="!nameField"
                    class=" whitespace-nowrap px-9!" />
                </div>
                <div v-if="!reviewers._value.length" class="text-sm mt-2 text-gray-500">
                  Fill in name to add reviewer(s) for this project
                </div>
                <div v-else class="flex gap-3 mt-2 pt-2">
                  <OverlayBadge v-for="reviewer of reviewers._value" severity="danger" value="x" size="small"
                    pt:pcbadge:root="cursor-pointer min-w-4! h-4!" @click="removeReviewer(reviewer)">
                    <Chip :label="reviewer" class="text-sm! py-1!" />
                  </OverlayBadge>
                </div>
              </div>
              <!-- other values for normal input-->
              <div class="w-full" v-else>
                <InputText type="text" class="w-full" :id="key" v-model="team[key]._value"
                  :invalid="v$.team[key]?.$error" placeholder="Your answer..." />
              </div>
            </span>
          </li>
        </template>
      </ul>
      <Panel class="mt-4" header="Optional fields" toggleable :collapsed="isCollapsed">
        <ul>
          <template v-for="(item, key) in team">
            <li v-if="!item.required && key !== 'date' && key !== 'reviewers'"
              class="flex py-3 not-last:border-b border-secondary">
              <span class="!w-full">
                <!-- Keys -->
                <label :for="key" class="w-1/3 capitalize flex items-center">{{ formatKey(key) }}</label>
                <!-- other values for normal input-->
                <div class="w-full">
                  <InputText type="text" class="w-full" :id="key" v-model="team[key]._value"
                    :invalid="v$.team[key]?.$error" placeholder="Your answer..." />
                </div>
              </span>
            </li>
          </template>
        </ul>
      </Panel>
    </Fieldset>

    <div class="flex w-full gap-2 mt-4">
      <Button :severity="v$.$errors.length > 0 ? 'secondary' : 'success'" label="Start review" @click="checkFields()"
        class="ml-auto" :class="[v$.$errors.length > 0 ? 'pointer-events-none' : '']">
        <Icon name="ic:baseline-rate-review" size="22" />
        Ready
      </Button>
    </div>
  </div>
</template>
