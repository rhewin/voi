<script setup lang="ts">
  export interface Props {
    inputClass: string | undefined
    sender: string | ''
    message: string | ''
  }

  const props = withDefaults(defineProps<Props>(), {
    inputClass: '',
    sender: '',
    message: ''
  })

  const inputClasses = ['chat-box', props.inputClass].join(' ');
</script>

<template>
  <div :class="inputClasses" v-if="message != ''">
    <span>{{ sender }}</span>
    <div class="message">
      {{ message }}
    </div>
  </div>
</template>

<style scoped>
  .chat-box {
    display: inline-block;
    margin-bottom: 23px;
    width: 100%;
  }
  .chat-box.friend .message, .chat-box.self .message{
    width: 70%;
    padding: 16px;
    position: relative;
  }
  .chat-box.friend .message {
    border-radius: 10px 10px 10px 0;
    background-color: rgba(246, 246, 246, 1);
    border: 1px solid #E8E8E8;
    color:#000;
  }
  .chat-box.friend .message:after, .chat-box.friend .message:before, .chat-box.self .message:after, .chat-box.self .message:before {
    content:"";
    float:right;
    position:absolute;
    width:0;
    height:0;
    border-style: solid;
  }
  .chat-box.friend .message:after, .chat-box.friend .message:before {
    left: 0;
  }
  .chat-box.self .message:after, .chat-box.self .message:before {
    right: 0;
    transform: rotate(180deg);
  }
  .chat-box.friend .message:after {
    bottom: -11px;
    border-color: transparent transparent transparent rgba(246, 246, 246, 1);
    border-width: 11px;
  }
  .chat-box.friend .message:before {
    bottom: -13px;
    left: -1px;
    border-color: transparent transparent transparent #E8E8E8;
    border-width: 12px;
  }

  .chat-box.self .message {
    border-radius: 10px 10px 0 10px;
    background-color: rgba(93, 176, 117, 1);
    border: 1px solid #5DB075;
    color:#FFF;
    float: right;
  }
  .chat-box.self .message:after {
    bottom: -11px;
    border-color: transparent transparent transparent rgba(93, 176, 117, 1);
    border-width: 11px;
  }
  .chat-box.self .message:before {
    bottom: -13px;
    right: -1px;
    border-color: transparent transparent transparent #5DB075;
    border-width: 12px;
  }
</style>
