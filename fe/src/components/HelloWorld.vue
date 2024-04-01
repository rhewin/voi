<script setup lang="ts">
  import { defineComponent } from 'vue'
  import TextBox from './form/TextBox.vue'
  import SubmitButton from './form/SubmitButton.vue'

  defineProps<{
    msg: string
  }>()

  defineComponent({
    components: {
      TextBox,
      SubmitButton
    }
  })
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
    <TextBox inputClass="input-text-full input-text-form border-squircles" inputId="username" inputName="username" inputPlaceholder="Username" type="text" />
    <TextBox inputClass="input-text-full input-text-form border-squircles" inputId="roomid" inputName="roomid" inputPlaceholder="RoomID" type="text" />
    <SubmitButton buttonClass="btn-full btn-primary btn-submit border-round" buttonText="join" type="submit"/>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
