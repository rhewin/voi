import axios from 'axios'

const BASE_URL = 'http://172.19.175.226:3000'
const PATH_JOIN_ROOM = '/api/v1/join'
const PATH_CHAT_MESSAGE = '/api/v1/chat'
const PATH_SEND_CHAT = '/api/v1/send_chat'
const PATH_LEAVE_ROOM = '/api/v1/leave'

export async function postJoinRoom(data: any): Promise<any> {
  try {
    const url = `${BASE_URL}${PATH_JOIN_ROOM}`
    const response = await axios.post(url, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data.message || error.message)
  }
}

export async function getChatMessage(data: any): Promise<any> {
  try {
    const url = `${BASE_URL}${PATH_CHAT_MESSAGE}/${data}`
    const response = await axios.get(url)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data.message || error.message)
  }
}

export async function postSendChat(data: any): Promise<any> {
  try {
    const url = `${BASE_URL}${PATH_SEND_CHAT}`
    const response = await axios.post(url, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data.message || error.message)
  }
}

export async function postLeaveRoom(data: any): Promise<any> {
  try {
    const url = `${BASE_URL}${PATH_LEAVE_ROOM}`
    const response = await axios.post(url, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data.message || error.message)
  }
}
