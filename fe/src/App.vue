<script setup lang="ts">
  import { useChatStore } from './store'
  import { useConnectionStore } from './store/connection'
  import { socket } from "@/socket";

  const chatStore = useChatStore();
  const connectionStore = useConnectionStore();
  socket.off();
  chatStore.bindEvents();
  connectionStore.bindEvents();
</script>

<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>
