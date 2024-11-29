import { Box } from '@mui/material';
import ControlPanel from 'features/controlPanel/ui/ControlPanel';
import { Search } from 'features/search/ui/Search';

export const LeftHeader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        borderBottom: 1,
        borderColor: 'divider',
        padding: 1,
        gap: 1,
      }}
    >
      <ControlPanel />
      <Search />
    </Box>
  );
};
