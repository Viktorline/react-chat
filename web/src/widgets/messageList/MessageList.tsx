import { useState } from 'react';

import {
  Avatar,
  Box,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useChatStore } from 'features/chat/model/useChatStore';
import { formatDate } from 'shared/utils/formatUtils';

export const MessageList = () => {
  const [message, setMessage] = useState('');
  const chatStore = useChatStore();

  const handleSend = () => {
    if (message.trim()) {
      chatStore.sendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
      {/* Chat Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: '#212121',
        }}
      >
        <Typography variant='h6'>
          {
            chatStore.currentChat.participants.find((p) => p.id !== '1')
              ?.username
          }
        </Typography>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        {chatStore.messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              mb: 2,
              flexDirection: message.sender.id === '1' ? 'row-reverse' : 'row',
            }}
          >
            <Avatar
              src={message.sender.avatar}
              sx={{
                width: 32,
                height: 32,
                mr: message.sender.id === '1' ? 0 : 1,
                ml: message.sender.id === '1' ? 1 : 0,
              }}
            >
              {message.sender.username[0].toUpperCase()}
            </Avatar>
            <Paper
              sx={{
                p: 1,
                maxWidth: '70%',
                backgroundColor:
                  message.sender.id === '1' ? '#2B5278' : '#212121',
                borderRadius: 2,
              }}
            >
              <Typography variant='body1'>{message.content}</Typography>
              <Typography variant='caption' color='text.secondary'>
                {formatDate(message.createdAt)}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Message Input */}
      <Box sx={{ p: 2, backgroundColor: '#212121' }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder='Write a message...'
          variant='outlined'
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSend} color='primary'>
                Иконка
              </IconButton>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#1a1a1a',
            },
          }}
        />
      </Box>
    </Box>
  );
};
