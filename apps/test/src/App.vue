<!--
 * @Author: @memo28.repo
 * @Date: 2025-07-30 20:13:06
 * @LastEditTime: 2025-08-10 17:16:35
 * @Description: 
 * @FilePath: /memo28.pro.Repo/apps/test/src/App.vue
-->
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import Basic from './components/basic.vue'
</script>

<template>
  <div>
    <Basic />
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
