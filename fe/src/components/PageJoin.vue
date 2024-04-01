<script setup lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router';
  import TextBox from './form/TextBox.vue'
  import SubmitButton from './form/Button.vue'
  import { postJoinRoom, getChatMessage } from '../api/chat.api';
  import { useChatStore } from '../store'

  defineProps<{
    title: string
  }>()

  defineComponent({
    components: {
      TextBox,
      SubmitButton
    }
  })

  const router = useRouter();
  const joinRoomReq = ref({
    room_identity: '',
    user_name: ''
  });

  const onInputReqUserName = (e: { target: { value: string } }) => {
    joinRoomReq.value.user_name = e.target.value;
  };

  const onInputReqRoomIdentity = (e: { target: { value: string } }) => {
    joinRoomReq.value.room_identity = e.target.value;
  };

  interface iChat {
    id: string;
    sender: string;
    message: string;
    timestamp: string;
    roomId: string;
  }

  const fetchChatMessage = async (roomId: string): Promise<iChat[]> => {
    const error = ref('');
    const success = ref(false);
    const responseData = ref<iChat[]>([]);

    try {
      const response = await getChatMessage(roomId);
      response.data.forEach((item: iChat) => responseData.value.push(item));
      success.value = true;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      if (success.value) {
        return responseData.value
      } else {
        alert(error.value)
        return []
      }
    }
  }

  const fetchJoinRoom = async () => {
    const error = ref('');
    const success = ref(false);
    const responseData = ref({
      id: '',
      roomIdentity: '',
      userName: []
    });

    try {
      const response = await postJoinRoom(joinRoomReq.value);
      responseData.value = response.data;
      success.value = true;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      if (success.value) {
        // if success join, then load all the messages
        const roomId = responseData.value.id
        const roomIdentity = responseData.value.roomIdentity
        const userName = joinRoomReq.value.user_name
        const chatStore = useChatStore()
        const chat = await fetchChatMessage(roomId)
        chatStore.setData(chat)
        router.push({
          name: `page_chat`,
          query: { title: roomIdentity, username: userName, roomid: roomId }
        });
      } else {
        alert(error.value);
      }
    }
  }
</script>

<template>
  <header>
    <h1 class="title text-center">{{ title }}</h1>
  </header>
  <div class="content">
    <TextBox inputClass="input-text-full input-text-form border-squircles" inputId="username" inputName="username" inputPlaceholder="Username" type="text" v-model="joinRoomReq.user_name" @input="onInputReqUserName" />
    <TextBox inputClass="input-text-full input-text-form border-squircles" inputId="roomid" inputName="roomid" inputPlaceholder="RoomID" type="text" v-model="joinRoomReq.room_identity" @input="onInputReqRoomIdentity" />
  </div>
  <footer>
    <SubmitButton buttonClass="btn-full btn-submit border-round bg-primary" buttonText="join" type="submit" @click="fetchJoinRoom"/>
  </footer>
</template>

<style scoped>
  header, .content, footer {
    width: 100%;
  }
  .content {
    min-height: 100%;
    padding-bottom: 128px;
  }
  footer {
    bottom: 0;
    position: absolute;
    padding: 0 16px 44px;
    background-color: #FFF;
  }

  h1.title{
    margin: 24px 0;
  }
</style>
