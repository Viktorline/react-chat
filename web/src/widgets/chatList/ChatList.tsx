import { useEffect } from 'react';

import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useChatStore } from 'features/chat/model/useChatStore';
import { useSearch } from 'features/chat/model/useSearch';
import { Search } from 'shared/ui/Search/Search';
import { formatDistanceToNow } from 'shared/utils/formatUtils';

export const ChatList = () => {
  const chatStore = useChatStore();
  const { searchQuery, setSearchQuery, startSearch } = useSearch();

  useEffect(() => {
    chatStore.fetchChats();
  }, []);

  const handleSearch = () => {
    startSearch();
  };

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
      <Search
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
      />
      <List sx={{ padding: 0 }}>
        {chatStore.chats.map((chat) => {
          const otherParticipant = chat.participants.find((p) => p.id !== '1');
          const lastMessageTime = chat.lastMessage
            ? formatDistanceToNow(new Date(chat.lastMessage.createdAt))
            : null;

          return (
            <Box key={chat.id}>
              <ListItemButton
                selected={chat.id === chatStore.currentChat?.id}
                onClick={() => chatStore.setCurrentChat(chat)}
                sx={{
                  py: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={otherParticipant?.avatar}>
                    {otherParticipant?.username[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant='subtitle1' component='span'>
                      {otherParticipant?.username}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      noWrap
                      sx={{ maxWidth: 200 }}
                    >
                      {chat.lastMessage?.content || 'No messages yet'}
                    </Typography>
                  }
                />
                {lastMessageTime && (
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{ ml: 1 }}
                  >
                    {lastMessageTime}
                  </Typography>
                )}
              </ListItemButton>
              <Divider />
            </Box>
          );
        })}
      </List>
    </Box>
  );
};
