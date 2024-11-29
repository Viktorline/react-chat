import { Box } from '@mui/material';
import { useSearch } from 'features/chat/model/useSearch';
import ChatList from 'features/chat/ui/ChatList/ChatList';
import { LeftHeader } from 'features/chat/ui/LeftHeader/LeftHeader';
import { UserList } from 'features/search/ui/UserList';

export const LeftColumn = () => {
  const { searchMode } = useSearch();

  return (
    <Box
      sx={{
        width: 290,
        borderRight: 1,
        borderColor: 'divider',
        backgroundColor: '#212121',
        overflow: 'auto',
      }}
    >
      <LeftHeader />
      {searchMode ? <UserList /> : <ChatList />}
    </Box>
  );
};
