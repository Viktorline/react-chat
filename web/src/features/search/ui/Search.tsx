import { ChangeEvent } from 'react';

import { Box, TextField } from '@mui/material';
import { useSearch } from 'features/chat/model/useSearch';

export const Search = () => {
  const {
    searchMode,
    searchQuery,
    setSearchQuery,
    startSearch,
    setSearchMode,
  } = useSearch();

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
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <TextField
        fullWidth
        placeholder='Search...'
        value={searchQuery}
        autoComplete='off'
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={{
          backgroundColor: '#1a1a1a',
          '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': {
              border: 'none',
            },
            borderRadius: 100,
            '&:hover': {
              boxShadow: searchMode ? '0 0 0 2px #90CBF8' : 'none',
            },
            '&.Mui-focused': {
              boxShadow: searchMode ? '0 0 0 2px #90CBF8' : 'none',
            },
          },
          '& .MuiInputBase-input': {
            padding: 1,
          },
          borderRadius: 100,
        }}
      />
    </Box>
  );
};
