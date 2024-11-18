import { Box } from '@mui/material';
import { useSearch } from 'features/chat/model/useSearch';
import ControlPanel from 'features/controlPanel/ui/ControlPanel';
import { Search } from 'shared/ui/Search/Search';

export const LeftHeader = () => {
  const { searchQuery, setSearchQuery, startSearch } = useSearch();

  const handleSearch = () => {
    startSearch();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        borderRight: 1,
        borderColor: 'divider',
        backgroundColor: 'blue',
      }}
    >
      <ControlPanel />
      <Search
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
      />
    </Box>
  );
};
