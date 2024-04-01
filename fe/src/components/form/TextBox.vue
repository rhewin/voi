<script setup lang="ts">
  import type { InputTypeHTMLAttribute } from 'vue';

  export interface Props {
    inputClass: string | undefined
    inputId: string | undefined
    inputName: string | undefined
    inputPlaceholder: string | undefined
    type: InputTypeHTMLAttribute
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'text',
  })

  const inputClasses = ['input-text', props.inputClass].join(' ');
</script>

<template>
  <input :type="props.type" :id="props.inputId" :name="props.inputName" :class="inputClasses" :placeholder="inputPlaceholder">
</template>

<style scoped>
  .input-text {
    display: inline-block;
    font: 16px/19.36px inter, sans-serif;
    font-weight: 500;
    min-width: 50px;
  }
</style>
