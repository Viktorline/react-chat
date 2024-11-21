import { Chat, Message } from 'features/chat/model/useChatStore';
import { api } from 'shared/api/axios';

export const chatApi = {
  getChats: async () => {
    const { data } = await api.get<Chat[]>('/chat/chats');
    return data;
  },

  getMessages: async (chatId: string) => {
    const { data } = await api.get<Message[]>(`/chat/messages/${chatId}`);
    return data;
  },

  sendMessage: async (chatId: string, content: string) => {
    const { data } = await api.post<Message>('/chat/message', {
      chatId,
      content,
    });
    return data;
  },

  searchUsers: async (query: string, excludeId: string) => {
    const { data } = await api.get('/users/search', {
      params: {
        query: encodeURIComponent(query),
        excludeId,
      },
    });
    return data;
  },
};
