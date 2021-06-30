<template>
  <div id="tutorial-list">
    <div class="search">
      <input
        id="search-input"
        v-model="searchKey"
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
        @click="setTutorial(item)"
        :class="item.id === tutorial.id ? 'active' : ''"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="display" v-if="tutorial.id">
      <p><b>Title:</b> {{ tutorial.title }}</p>
      <p><b>Description:</b> {{ tutorial.description }}</p>
      <p><b>Status:</b> {{ tutorial.published ? "Published" : "Pending" }}</p>
      <router-link class="edit-tutorial" :to="'/tutorials/' + tutorial.id"
        >Edit</router-link
      >
    </div>
    <div class="display" v-else>
      <h4>Please select a tutorial.</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { fetchAllTutorials, findByTitle } from "@/services/TutorialDataService";
import Tutorial from "@/types/Tutorial";

export default defineComponent({
  name: "TutorialList",
  data() {
    return {
      tutorials: [] as Tutorial[],
      tutorialsBackup: [] as Tutorial[],
      searchKey: "",
      tutorial: {} as Tutorial,
    };
  },
  async created() {
    const tutorials = await fetchAllTutorials();
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
      this.tutorial = {} as Tutorial;
    },
    setTutorial(tutorial: Tutorial) {
      this.tutorial = tutorial;
    },
  },
});
</script>

<style scoped>
#tutorial-list {
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

.edit-tutorial {
  display: inline-block;
  margin-top: 1rem;
  margin-left: 1rem;
  padding: 6px 12px;
  border: thin solid #d1ccc0;
  transition: all 0.1s;
  font-weight: 500;
}
.edit-tutorial:hover {
  color: #f7f1e3;
  background: #2c2c54;
}
</style>
