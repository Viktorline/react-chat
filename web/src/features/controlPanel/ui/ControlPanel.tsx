import { useRef, useState } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Portal,
  Typography,
} from '@mui/material';
import { useClickOutside } from 'hooks/useClickOutside';
import { useAuthStore } from 'shared/auth/model/authStore';

export default function ControlPanel() {
  const { logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useClickOutside({
    ref: menuRef,
    callback: handleCloseMenu,
    isActive: isMenuOpen,
    parentPortalRef: buttonRef,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        ref={buttonRef}
        variant='text'
        color='primary'
        onClick={toggleMenu}
        size='small'
        sx={{
          minWidth: 'auto',
          padding: '8px',
          borderRadius: '100%',
          backgroundColor: 'none',
        }}
      >
        <MenuIcon />
      </Button>
      {isMenuOpen && buttonRef.current && (
        <Portal>
          <Box
            ref={menuRef}
            sx={{
              position: 'absolute',
              top: `${buttonRef.current.getBoundingClientRect().bottom + window.scrollY + 10}px`,
              left: `${buttonRef.current.getBoundingClientRect().left}px`,

              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
              zIndex: 1000,
              padding: '10px',
              backgroundColor: 'rgba(26, 26, 26, 0.7)',
              backdropFilter: 'blur(5px)',
            }}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ marginRight: '8px' }} />
              Выйти
            </MenuItem>
            {[...Array(10)].map((_, index) => (
              <MenuItem key={index} disabled>
                <Typography variant='body2'>Заглушка {index + 1}</Typography>
              </MenuItem>
            ))}
          </Box>
        </Portal>
      )}
    </Box>
  );
}
