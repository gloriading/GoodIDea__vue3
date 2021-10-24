<template>
  <div id="ideaList">
    <div class="search">
      <input
        id="search-input"
        v-model.trim="searchKey"
        placeholder="Search by title"
        v-on:keyup.enter="searchByTitle"
      />
    </div>
    <div class="list">
      <div
        class="item"
        v-for="(item, idx) in ideaList"
        :key="`idea-${idx}`"
        :title="`idea-${idx}`"
        @click="setCurrentIdea(item.id)"
        :class="currentIdea ? (item.id === currentIdea.id ? 'active' : '') : ''"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="display" v-if="currentIdea && currentIdea.id">
      <p><b>Title:</b> {{ currentIdea.title }}</p>
      <p><b>Description:</b> {{ currentIdea.description }}</p>
      <p>
        <b>Status:</b> {{ currentIdea.published ? "Published" : "Pending" }}
      </p>
      <router-link class="edit__idea" :to="'/idea/' + currentIdea.id"
        >Edit</router-link
      >
    </div>
    <div class="display" v-else>
      <h4>Please select an idea.</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { fetchAllIdeas } from "@/services/TutorialDataService";
import Idea from "@/types/Idea";

export default defineComponent({
  name: "IdeaList",
  setup() {
    const ideas = ref([] as Idea[]);
    const filteredList = ref([] as Idea[]);
    const searchKey = ref("");
    const currentIdeaId = ref<number | null>(null);
    const currentIdea = computed(() => {
      if (currentIdeaId.value === null) return null;
      return (
        ideas.value.find((idea) => idea.id === currentIdeaId.value) || null
      );
    });

    onMounted(async () => {
      ideas.value = await fetchAllIdeas();
    });

    const searchByTitle = () => {
      if (!searchKey.value) return;
      const regex = new RegExp(searchKey.value, "i");

      filteredList.value = ideas.value.filter((idea) => {
        return !!idea.title.match(regex);
      });
    };

    const ideaList = computed(() => {
      const hasFiltered = filteredList.value.length > 0;
      return hasFiltered ? filteredList.value : ideas.value;
    });

    const setCurrentIdea = (id: number) => (currentIdeaId.value = id);

    return {
      ideaList,
      searchKey,
      currentIdea,
      searchByTitle,
      setCurrentIdea,
    };
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
