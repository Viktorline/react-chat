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
import { useAuthStore } from 'shared/stores/auth/model/authStore';
import { formatDistanceToNow } from 'shared/utils/formatUtils';

export default function ChatList() {
  const { chats, currentChat, setCurrentChat } = useChatStore();
  const { user } = useAuthStore();

  return (
    <List sx={{ padding: 0 }}>
      {chats.map((chat) => {
        const otherParticipant = chat.participants.find(
          (participant) => participant.id !== user?.id,
        );
        const lastMessageTime = chat.lastMessage
          ? formatDistanceToNow(new Date(chat.lastMessage.createdAt))
          : null;

        return (
          <Box key={chat.id}>
            <ListItemButton
              selected={chat.id === currentChat?.id}
              onClick={() => setCurrentChat(chat)}
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
                  {/* {otherParticipant?.username[0].toUpperCase()} */}
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
  );
}
