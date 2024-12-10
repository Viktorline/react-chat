import { Avatar, Box, Paper, Typography } from '@mui/material';
import { Message } from 'features/chat/model/useChatStore';
import { formatDate } from 'shared/utils/formatUtils';

import { User } from 'entities/user/model/types';

export const MessageComponent = ({
  message,
  user,
}: {
  message: Message;
  user: User;
}) => {
  const isCurrentUser = message.sender.id === user?.id;

  return (
    <Box
      sx={{
        display: 'flex',
        mb: 2,
        flexDirection: isCurrentUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
      }}
    >
      <Avatar
        src={message.sender.avatar || ''}
        sx={{
          width: 40,
          height: 40,
          fontSize: 18,
          bgcolor: message.sender.avatar ? 'transparent' : '#5A5A5A',
          color: '#fff',
          mr: isCurrentUser ? 0 : 1.5,
          ml: isCurrentUser ? 1.5 : 0,
        }}
      >
        {!message.sender.avatar && message.sender.username?.[0]?.toUpperCase()}
      </Avatar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
          maxWidth: '70%',
        }}
      >
        <Typography variant='caption' color='text.secondary' sx={{ mb: 0.5 }}>
          {message.sender.username || 'Unknown User'}
        </Typography>
        <Paper
          sx={{
            p: 1.5,
            backgroundColor: isCurrentUser ? '#1976d2' : '#424242',
            color: isCurrentUser ? '#fff' : '#e0e0e0',
            borderRadius: isCurrentUser
              ? '16px 16px 4px 16px'
              : '16px 16px 16px 4px',
            boxShadow: 3,
            wordBreak: 'break-word',
            position: 'relative',
          }}
        >
          <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
            {message.content || 'No content'}
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              width: 10,
              height: 10,
              backgroundColor: isCurrentUser ? '#1976d2' : '#424242',
              borderRadius: '50%',
              bottom: -5,
              [isCurrentUser ? 'right' : 'left']: -5,
            }}
          />
        </Paper>
        <Typography variant='caption' color='text.secondary' sx={{ mt: 0.5 }}>
          {formatDate(message.createdAt) || 'Unknown date'}
        </Typography>
      </Box>
    </Box>
  );
};
