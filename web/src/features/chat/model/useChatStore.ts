import { chatApi } from 'entities/chat/api/chatApi';
import { create } from 'zustand';

export interface Chat {
  id: string;
  participants: string[];
  lastMessageId: string | null;
  type: 'private' | 'group';
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  readBy: string[];
  createdAt: string;
  updatedAt: string;
}

interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  messages: Message[];
  isLoading: boolean;

  fetchChats: () => Promise<void>;
  fetchMessages: (chatId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  setCurrentChat: (chat: Chat) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  currentChat: null,
  messages: [],
  isLoading: false,

  fetchChats: async () => {
    set({ isLoading: true });
    try {
      const chats = await chatApi.getChats();
      set({ chats });
    } catch (error) {
      console.error('Ошибка', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMessages: async (chatId) => {
    set({ isLoading: true });
    try {
      const messages = await chatApi.getMessages(chatId);
      set({ messages });
    } catch (error) {
      console.error('Ошибка', error);
    } finally {
      set({ isLoading: false });
    }
  },

  sendMessage: async (content) => {
    const { currentChat, messages, chats } = get();
    if (!currentChat) return;

    try {
      const message = await chatApi.sendMessage(currentChat.id, content);
      set({ messages: [message, ...messages] });

      const updatedChats = chats.map((chat) =>
        chat.id === currentChat.id ? { ...chat, lastMessage: message } : chat,
      );
      set({ chats: updatedChats });
    } catch (error) {
      console.error('Ошибка', error);
    }
  },

  setCurrentChat: (chat) => {
    set({ currentChat: chat });
    get().fetchMessages(chat.id);
  },
}));
