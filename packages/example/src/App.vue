<template>
  <div style="position: absolute; top: 0; left: 0">
    <router-link to="/">toHome </router-link>
    <router-link to="/about">toAbout</router-link>
  </div>
  <div class=""><router-view />;</div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>
<style lang="less" scoped></style>
