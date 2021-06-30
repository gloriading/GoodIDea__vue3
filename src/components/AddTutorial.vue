<template>
  <div id="add-tutorials">
    <div class="card" v-if="!isSubmitted">
      <label for="title">Title</label>
      <input id="title" v-model="title" />
      <label for="desciption">Description</label>
      <input id="desciption" v-model="description" />
      <div class="actions">
        <button @click="saveTutorial">Submit</button>
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
import { defineComponent } from "vue";
import { create } from "@/services/TutorialDataService";

export default defineComponent({
  name: "AddTutorial",
  data() {
    return {
      title: "",
      description: "",
      isSubmitted: false,
    };
  },
  methods: {
    async saveTutorial() {
      if (!this.title || !this.description) {
        return;
      }
      const newTutorial = {
        id: 0,
        title: this.title,
        description: this.description,
        published: false,
      };

      const data = await create(newTutorial);
      console.log(data);
      this.isSubmitted = true;
      this.title = "";
      this.description = "";
    },
    addAnother() {
      this.isSubmitted = false;
    },
  },
});
</script>
<style scoped>
#add-tutorials {
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
