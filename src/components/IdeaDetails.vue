<template>
  <div id="ideaDetails">
    <div class="card" v-if="idea.id">
      <h1>Idea</h1>
      <label for="title">Title</label>
      <input id="title" v-model="idea.title" />
      <label for="desciption">Description</label>
      <input id="desciption" v-model="idea.description" />
      <p><b>Status:</b> {{ idea.published ? "Published" : "Pending" }}</p>
      <div class="actions">
        <button @click="togglePublish">
          {{ idea.published ? "UnPublish" : "Publish" }}
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
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  fetchIdea,
  updateIdea,
  deleteIdea,
} from "@/services/TutorialDataService";
import Idea from "@/types/Idea";

export default defineComponent({
  name: "IdeaDetails",
  setup() {
    const idea = ref({} as Idea);
    const message = ref("");
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
      const ideaId = route.params.id as string;

      try {
        idea.value = await fetchIdea(ideaId);
      } catch (error) {
        console.error("IdeaDetails: ", error);
      }
    });

    const update = async () => {
      if (!idea.value.title || !idea.value.description) {
        return;
      }

      try {
        await updateIdea(idea.value.id, idea.value);
      } catch (error) {
        console.error("update: ", error);
      }
    };

    const togglePublish = async () => {
      idea.value = {
        ...idea.value,
        published: !idea.value.published,
      };
      await update();
    };

    const remove = async () => {
      const idToRemove = idea.value.id;

      try {
        await deleteIdea(idToRemove);
        message.value = `Idea ${idToRemove} removed! Redirecting...`;
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {
        console.error("remove: ", error);
      }
    };

    return {
      idea,
      message,
      update,
      togglePublish,
      remove,
    };
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
