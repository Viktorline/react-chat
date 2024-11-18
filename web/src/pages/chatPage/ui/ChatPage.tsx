import { useEffect } from 'react';

import { Box } from '@mui/material';
import { useChatStore } from 'features/chat/model/useChatStore';
import { LeftColumn } from 'widgets/leftColumn/LeftColumn';
import { MiddleColumn } from 'widgets/middleColumn/MiddleColumn';

export default function ChatPage() {
  const chatStore = useChatStore();

  useEffect(() => {
    chatStore.fetchChats();
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <LeftColumn />
      <MiddleColumn />
    </Box>
  );
}
