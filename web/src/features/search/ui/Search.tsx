import { ChangeEvent } from 'react';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { Box, Button, TextField } from '@mui/material';
import { useSearch } from 'features/chat/model/useSearch';

export const Search = () => {
  const { searchQuery, setSearchQuery, startSearch, setSearchMode } =
    useSearch();

  const handleSearch = () => {
    startSearch();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFocus = () => {
    setSearchMode(true);
  };

  const handleBlur = () => {
    if (!searchQuery) setSearchMode(false);
  };

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider',
        gap: 2,
      }}
    >
      <TextField
        fullWidth
        variant='outlined'
        placeholder='Search...'
        value={searchQuery}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={{
          backgroundColor: '#1a1a1a',
          '& .MuiOutlinedInput-root': {
            color: 'white',
          },
        }}
      />
      <Button
        onClick={handleSearch}
        variant='contained'
        color='primary'
        size='small'
        sx={{ minWidth: 'auto', padding: '8px' }}
      >
        <PersonSearchIcon />
      </Button>
    </Box>
  );
};
