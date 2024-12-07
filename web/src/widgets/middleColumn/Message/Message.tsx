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
  return (
    <Box
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
  );
};
