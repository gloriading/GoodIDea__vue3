<template>
  <div id="app">
    <div class="nav">
      <router-link to="/" class="brand">GoodIDeas</router-link>
      <router-link to="/">Ideas</router-link>
      <router-link to="/add">+ Idea</router-link>
    </div>
    <router-view />

    <Card
      v-for="(card, idx) in cards"
      :key="idx"
      v-bind="card"
      :isLoaded="isLoaded"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Card from "@/components/Card.vue";

export default defineComponent({
  name: "App",
  components: {
    Card,
  },
  setup() {
    const isLoaded = ref(false);
    const cards = [
      {
        img: "horse.svg",
        bgColor: "#BCD1FF",
        tag: "PRODUCTIVITY",
        date: "3 days ago",
        title: "7 Skills of Highly Effective Programmers",
        desc: "Our team was inspired by the seven skills of highly effective programmers created by the TechLead. We wanted to provide our own take on the topic. Here are our seven...",
      },
    ];
    onMounted(() => {
      isLoaded.value = false;
      setTimeout(() => {
        isLoaded.value = true;
      }, 3000);
    });

    return {
      isLoaded,
      cards,
    };
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
}
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 50px auto;
}
.nav {
  background: $primary-purple;
  color: $white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 4rem;
}
.nav a {
  color: $white;
  text-decoration: none;
  font-weight: 400;
  margin-right: 1rem;
}
.nav a.brand {
  font-weight: bold;
  margin-right: auto;
}
a {
  text-decoration: none;
  color: #333;
}

/* Common Styles */

button {
  padding: 8px 12px;
  background: whitesmoke;
  color: #666;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px, rgba(0, 0, 0, 0.23) 0px 2px 4px;
  transition: transform 0.2s;
}
button:active {
  transform: scale(0.95);
}
button:hover {
  cursor: pointer;
}

label {
  font-size: 12px;
  text-align: left;
  display: block;
}
input {
  padding: 5px 10px;
  height: 1.5rem;
  border: none;
  border-bottom: thin solid #666;
  outline: none;
  display: block;
  width: 300px;
  transition: all 0.2s ease-out;
}
input:focus {
  background: #eee;
}
</style>
