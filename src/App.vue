<script setup lang="ts">
import BasicTodoList from './components/BasicTodoList.vue'
import SnapshotTodoList from './components/SnapshotTodoList.vue'
import MagnetarTodoList from './components/MagnetarTodoList.vue'
import MagnetarStreamTodoList from './components/MagnetarStreamTodoList.vue'
</script>

<template>
  <div class="outer">
    <div class="inner">
      <h4>Project 1</h4>
      <BasicTodoList />
    </div>
    <div class="inner">
      <h4>Project 2</h4>
      <SnapshotTodoList />
    </div>
    <div class="inner">
      <h4>Project 3</h4>
      <MagnetarTodoList />
    </div>
    <div class="inner">
      <h4>Project 4</h4>
      <MagnetarStreamTodoList />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.outer
  display: flex
</style>
