import { Box, IconButton, TextField } from '@mui/material';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const Search = ({ value, onChange, onSearch }: SearchProps) => {
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <TextField
        fullWidth
        variant='outlined'
        placeholder='Search...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          backgroundColor: '#1a1a1a',
          '& .MuiOutlinedInput-root': {
            color: 'white',
          },
        }}
      />
      <IconButton onClick={onSearch} color='primary' sx={{ ml: 1 }}>
        иконка
      </IconButton>
    </Box>
  );
};
