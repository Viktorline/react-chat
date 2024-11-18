import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button } from '@mui/material';
import { useAuthStore } from 'shared/auth/model/authStore';

export default function ControlPanel() {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f4f4f4',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRight: '1px solid #ccc',
        padding: '10px',
      }}
    >
      <Button
        variant='contained'
        color='primary'
        onClick={handleLogout}
        size='small'
        sx={{ minWidth: 'auto', padding: '8px' }}
      >
        <LogoutIcon />
      </Button>
    </Box>
  );
}
