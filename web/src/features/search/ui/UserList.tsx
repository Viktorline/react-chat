import { Box } from '@mui/material';
import { useSearch } from 'features/chat/model/useSearch';

export const UserList = () => {
  const { searchResults, isLoading } = useSearch();

  if (isLoading) {
    return <Box sx={{ p: 2, color: 'white' }}>Loading...</Box>;
  }

  if (!searchResults.length) {
    return <Box sx={{ p: 2, color: 'white' }}>No results found</Box>;
  }

  return (
    <Box sx={{ p: 2 }}>
      {searchResults.map((user) => (
        <Box
          key={user.id}
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
      ))}
    </Box>
  );
};
