import { useEffect } from 'react';

import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { useChatStore } from 'features/chat/model/useChatStore';

export const ChatList = () => {
  const chatStore = useChatStore();

  useEffect(() => {
    chatStore.fetchChats();
  }, []);

  return (
    <Box
      sx={{
        width: 320,
        borderRight: 1,
        borderColor: 'divider',
        backgroundColor: '#212121',
        overflow: 'auto',
      }}
    >
      <List sx={{ padding: 0 }}>
        {/* {chatStore.chats.map((chat) => {
          const otherParticipant = chat.participants.find(p => p.id !== '1'); 

          return (
            <Box key={chat.id}>
              <ListItem 
                button
                selected={chat.id === chatStore.currentChat?.id}
                onClick={() => chatStore.setCurrentChat(chat)}
                sx={{ 
                  py: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar src={otherParticipant?.avatar}>
                    {otherParticipant?.username[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" component="span">
                      {otherParticipant?.username}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      sx={{ maxWidth: 200 }}
                    >
                      {chat.lastMessage?.content || 'No messages yet'}
                    </Typography>
                  }
                />
                {chat.lastMessageId && (
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    {formatDistanceToNow(new Date(chat.lastMessageId.createdAt), { addSuffix: true })}
                  </Typography>
                )}
              </ListItem>
              <Divider />
            </Box>
          );
        })} */}
      </List>
    </Box>
  );
};
