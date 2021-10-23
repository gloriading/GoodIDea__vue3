<template>
  <div id="ideaDetails">
    <div class="card" v-if="tutorial.id">
      <h1>Idea</h1>
      <label for="title">Title</label>
      <input id="title" v-model="tutorial.title" />
      <label for="desciption">Description</label>
      <input id="desciption" v-model="tutorial.description" />
      <p><b>Status:</b> {{ tutorial.published ? "Published" : "Pending" }}</p>
      <div class="actions">
        <button @click="togglePublish">
          {{ tutorial.published ? "UnPublish" : "Publish" }}
        </button>
        <button @click="remove">Delete</button>
        <button @click="update">Update</button>
      </div>
      <div class="message" v-show="message">{{ message }}</div>
    </div>
    <div class="card" v-else>
      <h2>NOT FOUND</h2>
      <h4>
        Please select an idea in
        <router-link to="/">Ideas page</router-link>
      </h4>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  fetchIdea,
  updateIdea,
  deleteIdea,
} from "@/services/TutorialDataService";
import Idea from "@/types/Idea";

export default defineComponent({
  name: "IdeaDetails",
  data() {
    return {
      tutorial: {} as Idea,
      message: "",
    };
  },
  async created() {
    const tutorialId = this.$route.params.id as string;
    try {
      const tutorial = await fetchIdea(tutorialId);
      this.tutorial = tutorial;
    } catch (e) {
      console.warn("Error - fetchIdea: ", e);
    }
  },
  methods: {
    async update() {
      if (!this.tutorial.title || !this.tutorial.description) {
        return;
      }
      try {
        await updateIdea(this.tutorial.id, this.tutorial);
        this.message = "Idea Updated!";
      } catch (e) {
        console.warn("Error - update: ", e);
      }
    },
    async togglePublish() {
      this.tutorial = {
        ...this.tutorial,
        published: !this.tutorial.published,
      };
      await this.update();
    },
    async remove() {
      try {
        const idToRemove = this.tutorial.id;
        await deleteIdea(idToRemove);
        this.message = `Idea ${idToRemove} removed! Redirecting...`;
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      } catch (e) {
        console.warn("Error - remove: ", e);
      }
    },
  },
});
</script>

<style scoped>
#ideaDetails {
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
p {
  text-align: left;
  margin-top: 1rem;
}
input#title {
  margin-bottom: 1rem;
}
.message {
  margin-top: 1rem;
  text-align: left;
  background: #eee;
  font-size: 12px;
  padding: 1rem 0.5rem;
}
h2 {
  margin-bottom: 2rem;
}
h4 > a {
  text-decoration: underline;
}
h4 > a:hover {
  color: black;
}
</style>
