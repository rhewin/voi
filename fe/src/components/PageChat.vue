<script setup lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router';
  import { useChatStore } from '../store'
  import { getChatMessage, postLeaveRoom, postSendChat } from '../api/chat.api';
  import { socket } from "@/socket";
  import ChatBox from './form/ChatBox.vue'
  import TextBox from './form/TextBox.vue'
  import Button from './form/Button.vue'

  const { title, username, roomid } = defineProps<{
    title: string
    username: string
    roomid: string
  }>()

  defineComponent({
    components: {
      ChatBox,
      Button,
      TextBox
    }
  })

  interface iChatData {
    id: string;
    message: string;
    roomId: string;
    sender: string;
    timestamp: string;
  }

  interface iChat {
    id: string;
    sender: string;
    message: string;
    timestamp: string;
    roomId: string;
  }

  const router = useRouter();
  const messageValue = ref('');
  const chatData = ref<iChatData[]>([])
  const chatStore = useChatStore()
  const separator = ref<HTMLElement | null>(null);
  onMounted(async () => {
    socket.on('chatStore:created', async (data: any) => {
      const chat = await fetchChatMessage(roomid);
      chatData.value = chat;
      scrollToBottom();
    });

    if (!chatData.value.length) {
      const chat = await fetchChatMessage(roomid);
      chatData.value = chat;
      chatStore.setData(chat);
      scrollToBottom();
    }
  });

  function scrollToBottom() {
    separator.value?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchChatMessage = async (roomId: string): Promise<iChat[]> => {
    try {
      const response = await getChatMessage(roomId);
      return response.data;
    } catch (err: any) {
      console.error('Error fetching chat messages:', err);
      return [];
    }
  }

  const sendMessage = async (roomId: string, sender: string, message: string) => {
    if (message != "") {
      try {
        await postSendChat({
          room_id: roomId,
          sender,
          message
        });
        const chat = await fetchChatMessage(roomId);
        chatData.value = chat;
        const chatStore = useChatStore();
        chatStore.setData(chat);
      } catch (err: any) {
        console.error('Error sending message:', err);
        alert('Failed to send message.');
      }
      messageValue.value = ''
    }
  }

  const leaveRoom = async (roomId: string, userName: string) => {
    try {
      await postLeaveRoom({
        room_id: roomId,
        user_name: userName
      });
      router.push({ name: 'page_join'})
    } catch (err: any) {
      console.error('Error leae room:', err);
      alert('Failed to leave room.');
    }
  }
</script>

<template>
  <header>
    <div class="wrapper-action exit">
      <Button buttonClass="btn-exit cl-primary" buttonText="Exit" type="button" @click="leaveRoom(roomid, username)"/>
    </div>
    <h1 class="title text-center">{{ title }}</h1>
  </header>
  <div class="content">
    <template v-for="item in chatData" :key="item.id">
      <ChatBox v-if="item.sender === username" :key="`self-${item.id}`" sender="" :message="item.message" inputClass="self" />
      <ChatBox v-else :key="`friend-${item.id}`" :sender="item.sender" :message="item.message" inputClass="friend"/>
    </template>
    <div id="separator" ref="separator"></div>
  </div>
  <footer>
    <TextBox inputClass="input-text-full input-text-form border-round" inputId="message" inputName="message" inputPlaceholder="Message here..." type="text" :value="messageValue" @input="messageValue = $event.target.value" />
    <div class="wrapper-action send">
      <Button buttonClass="btn-send border-round bg-primary" buttonText="&#8593;" type="button" @click="sendMessage(roomid, username, messageValue)"/>
    </div>
  </footer>
</template>

<style scoped>
  header, .content, footer {
    position: relative;
    width: 100%;
  }
  header {
    position: fixed;
    z-index: 1;
    background: #FFF;
    width: inherit;
    top: 0;
  }
  .content {
    min-height: 100%;
    padding-bottom: 128px;
    padding-top: 85px;
  }
  .wrapper-action {
    position: absolute;
    height: 100%;
  }
  .wrapper-action.exit {
    left: 0;
    top: 0;
    height: calc(100% - 32px);
    margin: 16px 0;
    z-index: 1;
    justify-content: center;
    display: flex;
  }
  .wrapper-action.send {
    right: 0;
    top: 8px;
  }
  .wrapper-action .btn-exit {
    display: flex;
    align-items: center;
  }
  footer {
    bottom: 0;
    position: fixed;
    padding: 0 16px 44px;
    width: inherit;
    background-color: #FFF;
  }

  h1.title{
    margin: 24px 0;
  }
</style>
