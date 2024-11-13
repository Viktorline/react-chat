import { Box } from '@mui/material';
import { ChatList } from 'widgets/chatList/ChatList';

// import { MessageList } from 'widgets/messageList/MessageList';

export default function ChatPage() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <ChatList />
      {/* <MessageList /> */}
    </Box>
  );
}
