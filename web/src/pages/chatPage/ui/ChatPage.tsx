import { Box } from '@mui/material';
import { ChatList } from 'widgets/ChatList';
import { MessageList } from 'widgets/MessageList';

export default function ChatPage() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <ChatList />
      <MessageList />
    </Box>
  );
}
