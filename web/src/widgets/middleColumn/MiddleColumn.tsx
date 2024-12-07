import { useState } from 'react';

import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, Typography } from '@mui/material';
import { useChatStore } from 'features/chat/model/useChatStore';
import { useAuthStore } from 'shared/auth/model/authStore';

import { MessageComponent } from './Message/Message';
import TextareaLexical from './TextareaLexical/TextareaLexical';

export const MiddleColumn = () => {
  const [message, setMessage] = useState('');
  const { user } = useAuthStore();
  const chatStore = useChatStore();

  const chatUsername = chatStore.currentChat?.participants.find(
    (p) => p.id !== user?.id,
  )?.username;

  const handleSend = () => {
    if (message.trim()) {
      chatStore.sendMessage(message.trim());
      setMessage('');
    }
  };

  if (!chatStore.currentChat) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
        }}
      >
        <Typography variant='h6' color='text.secondary'>
          Select a chat to start messaging
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1a1a1a',
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: '#212121',
        }}
      >
        <Typography variant='h6'>{chatUsername}</Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        {chatStore.messages.map((msg) => (
          <MessageComponent key={msg.id} message={msg} user={user!} />
        ))}
      </Box>

      <Box
        sx={{
          p: 2,
          backgroundColor: '#212121',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <TextareaLexical setValue={setMessage} />
        <IconButton onClick={handleSend} color='primary' sx={{ mr: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
