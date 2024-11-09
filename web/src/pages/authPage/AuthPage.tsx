import { Box } from '@mui/material';
import Auth from 'features/auth/ui/Auth';

export default function AuthPage() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Auth />
    </Box>
  );
}
