<template>
  <div id="ideaList">
    <div class="search">
      <input
        id="search-input"
        v-model.trim="searchKey"
        placeholder="Search by title"
      />
      <button @click="search">Search</button>
    </div>
    <div class="list">
      <div
        class="item"
        v-for="(item, idx) in tutorials"
        :key="`tutorial-${idx}`"
        :title="`tutorial-${idx}`"
        @click="showIdea(item)"
        :class="item.id === tutorial.id ? 'active' : ''"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="display" v-if="tutorial.id">
      <p><b>Title:</b> {{ tutorial.title }}</p>
      <p><b>Description:</b> {{ tutorial.description }}</p>
      <p><b>Status:</b> {{ tutorial.published ? "Published" : "Pending" }}</p>
      <router-link class="edit__idea" :to="'/idea/' + tutorial.id"
        >Edit</router-link
      >
    </div>
    <div class="display" v-else>
      <h4>Please select an idea.</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { fetchAllIdeas, findByTitle } from "@/services/TutorialDataService";
import Idea from "@/types/Idea";

export default defineComponent({
  name: "IdeaList",
  data() {
    return {
      tutorials: [] as Idea[],
      tutorialsBackup: [] as Idea[],
      searchKey: "",
      tutorial: {} as Idea,
    };
  },
  async created() {
    const tutorials = await fetchAllIdeas();
    this.tutorials = tutorials;
    this.tutorialsBackup = tutorials;
  },
  methods: {
    async search() {
      if (!this.searchKey) {
        this.tutorials = this.tutorialsBackup;
        return;
      }
      const tutorials = await findByTitle(this.searchKey);
      this.tutorialsBackup = [...this.tutorials];
      this.tutorials = tutorials;
      this.tutorial = {} as Idea;
    },
    showIdea(tutorial: Idea) {
      this.tutorial = tutorial;
    },
  },
});
</script>

<style scoped>
#ideaList {
  justify-self: center;
  width: 800px;
  display: grid;
  overflow: hidden;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px 1fr;
  grid-template-areas:
    "search search"
    "list display";
}
.search {
  grid-area: search;
  display: flex;
  justify-content: center;
  align-items: center;
}
#search-input {
  margin-right: 1rem;
}
.list {
  grid-area: list;
  padding: 0 2rem 2rem 2rem;
  overflow: auto;
}
.item {
  padding: 0.5rem 1rem;
  margin-bottom: 2px;
  background: #eee;
  text-align: left;
  cursor: pointer;
  transition: all 0.1s;
}
.item:hover {
  border-left: 3px solid #2c2c54;
}
.active {
  background: #ffb142;
}
.display {
  grid-area: display;
  padding: 0 2rem;
  text-align: left;
}
.display p {
  padding: 0.5rem 1rem;
}

.edit__idea {
  display: inline-block;
  margin-top: 1rem;
  margin-left: 1rem;
  padding: 6px 12px;
  border: thin solid #d1ccc0;
  transition: all 0.1s;
  font-weight: 500;
}
.edit__idea:hover {
  color: #f7f1e3;
  background: #2c2c54;
}
</style>
