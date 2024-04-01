<script setup lang="ts">
  import type { ButtonHTMLAttributes } from 'vue';
  export interface Props {
    buttonClass: string | undefined
    buttonText: string | undefined
    type: ButtonHTMLAttributes['type']
  }

  const props = withDefaults(defineProps<Props>(), {
    buttonText: 'click',
    type: 'button'
  })

  const btnClass = ['btn', props.buttonClass].join(' ');
</script>

<template>
  <button
    :type="props.type"
    :class="btnClass"
  >
    <span>{{ props.buttonText }}</span>
  </button>
</template>

<style scoped>
  .btn {
    cursor: pointer;
    font: 16px/19.36px inter, sans-serif;
    font-weight: 600;
    text-align: center;
  }
</style>
