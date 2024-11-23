import { Box } from '@mui/material';
import { useChatStore } from 'features/chat/model/useChatStore';
import { useSearch } from 'features/chat/model/useSearch';

export const UserList = () => {
  const { searchResults, isLoading, setSearchMode } = useSearch();
  const { createChat } = useChatStore();

  const handleUserClick = (userId: string) => {
    createChat(userId);
    setSearchMode(false);
  };

  if (isLoading) {
    return <Box sx={{ p: 2, color: 'white' }}>Loading...</Box>;
  }

  if (!searchResults.length) {
    return <Box sx={{ p: 2, color: 'white' }}>No results found</Box>;
  }

  const renderUserItem = (user: { id: string; username: string }) => {
    const onUserClick = () => handleUserClick(user.id);

    return (
      <Box
        key={user.id}
        onClick={onUserClick}
        sx={{
          padding: 2,
          borderBottom: '1px solid #333',
          color: 'white',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#333',
          },
        }}
      >
        {user.username}
      </Box>
    );
  };

  return <Box sx={{ p: 2 }}>{searchResults.map(renderUserItem)}</Box>;
};
