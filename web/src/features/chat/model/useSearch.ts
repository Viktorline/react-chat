import { chatApi } from 'entities/chat/api/chatApi';
import { useAuthStore } from 'shared/auth/model/authStore';
import { create } from 'zustand';

interface SearchState {
  searchQuery: string;
  searchResults: any[];
  isLoading: boolean;
  error: string | null;
  searchMode: boolean;
  setSearchQuery: (query: string) => void;
  startSearch: () => Promise<void>;
  clearSearch: () => void;
  setSearchMode: (mode: boolean) => void;
}

export const useSearch = create<SearchState>((set, get) => ({
  searchQuery: '',
  searchResults: [],
  searchMode: false,
  isLoading: false,
  error: null,

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  startSearch: async () => {
    const { searchQuery } = get();
    const { user } = useAuthStore.getState();

    set({ isLoading: true, error: null });

    try {
      const results = await chatApi.searchUsers(searchQuery, user!.id);
      set({ searchResults: results });
      console.log(results);
    } catch (err) {
      console.error('Search failed:', err);
      set({ error: 'Failed to fetch search results' });
    } finally {
      set({ isLoading: false });
    }
  },

  setSearchMode: (mode: boolean) => set({ searchMode: mode }),

  clearSearch: () => set({ searchQuery: '', searchResults: [] }),
}));
