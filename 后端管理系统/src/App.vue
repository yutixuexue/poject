<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Main from "./components/Main";

export default {
  name: "App",
  components: {
    Main,
  },
};
</script>

<style>
#app {
  height: 100%;
}

body,
html {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
