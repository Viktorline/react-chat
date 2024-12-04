import React, { useState } from 'react';

import SendIcon from '@mui/icons-material/Send';
import { Avatar, Box, IconButton, Paper, Typography } from '@mui/material';
import { useChatStore } from 'features/chat/model/useChatStore';
import { useAuthStore } from 'shared/auth/model/authStore';
import { formatDate } from 'shared/utils/formatUtils';

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

  const renderMessages = () => {
    return chatStore.messages.map((message) => (
      <Box
        key={message.id}
        sx={{
          display: 'flex',
          mb: 2,
          flexDirection: message.sender.id === user?.id ? 'row-reverse' : 'row',
        }}
      >
        <Avatar
          src={message.sender.avatar}
          sx={{
            width: 32,
            height: 32,
            mr: message.sender.id === user?.id ? 0 : 1,
            ml: message.sender.id === user?.id ? 1 : 0,
          }}
        >
          {message.sender.username[0].toUpperCase()}
        </Avatar>
        <Paper
          sx={{
            p: 1,
            maxWidth: '300px',
            backgroundColor:
              message.sender.id === user?.id ? '#2B5278' : '#212121',
            borderRadius: 2,
            wordWrap: 'break-word',
          }}
        >
          <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
            {message.content}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {formatDate(message.createdAt)}
          </Typography>
        </Paper>
      </Box>
    ));
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
        {renderMessages()}
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
        <TextareaLexical value={message} setValue={setMessage} />
        <IconButton onClick={handleSend} color='primary' sx={{ mr: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
