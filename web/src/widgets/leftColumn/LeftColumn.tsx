import { Box } from '@mui/material';
import ChatList from 'features/chat/ui/ChatList/ChatList';
import { LeftHeader } from 'features/chat/ui/LeftHeader/LeftHeader';

export const LeftColumn = () => {
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
      <LeftHeader />
      <ChatList />
    </Box>
  );
};
