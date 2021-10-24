<template>
  <div id="addIdea">
    <div class="card" v-if="!isSubmitted">
      <label for="title">Title</label>
      <input id="title" v-model="title" />
      <label for="desciption">Description</label>
      <input id="desciption" v-model="description" />
      <div class="actions">
        <button :disabled="isDisabledBtn" @click="saveIdea">Submit</button>
      </div>
    </div>
    <div class="card" v-else>
      <h4>You submitted successfully!</h4>
      <div class="actions">
        <button @click="addAnother">Add Another</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { createIdea } from "@/services/TutorialDataService";

export default defineComponent({
  name: "AddIdea",
  setup() {
    const title = ref("");
    const description = ref("");
    const isSubmitted = ref(false);
    const isDisabledBtn = computed(() => {
      return !title.value || !description.value;
    });

    const saveIdea = async () => {
      if (!title.value || !description.value) return;
      const newTutorial = {
        id: 0,
        title: title.value,
        description: description.value,
        published: false,
      };

      try {
        await createIdea(newTutorial);
        isSubmitted.value = true;
        title.value = "";
        description.value = "";
      } catch (error) {
        console.error("saveIdea: ", error);
      }
    };

    const addAnother = () => {
      isSubmitted.value = false;
    };
    return {
      title,
      description,
      isSubmitted,
      isDisabledBtn,
      saveIdea,
      addAnother,
    };
  },
});
</script>

<style scoped>
#addIdea {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
}
.card {
  padding: 2rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
}

input#title {
  margin-bottom: 1rem;
}
</style>
