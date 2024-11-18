import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { Box, Button, IconButton, TextField } from '@mui/material';

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
        gap: 2,
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
      <Button
        onClick={onSearch}
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
