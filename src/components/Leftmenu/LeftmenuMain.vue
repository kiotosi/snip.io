<template>
  <div class="container">
    <LeftmenuFolder />
    <LeftmenuSnippets />
  </div>
</template>

<script lang="ts" setup>
  import LeftmenuFolder from './LeftmenuFolder/LeftmenuFolder.vue';
  import LeftmenuSnippets from './LeftmenuSnippets/LeftmenuSnippets.vue';
</script>

<style scoped lang="less">
  .container {
    background-color: @gray-bg;
    width: 400px;
    height: 100vh;
    display: flex;
  }
</style>