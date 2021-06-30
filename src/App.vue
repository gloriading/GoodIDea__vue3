<template>
  <div id="app">
    <div class="nav">
      <router-link to="/" class="brand">GoodDs</router-link>
      <router-link to="/">Tutorials</router-link>
      <router-link to="/add">Add Tutorial</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
* {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 50px auto;
}
.nav {
  background: #2c2c54;
  color: whitesmoke;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 4rem;
}
.nav a {
  color: whitesmoke;
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
