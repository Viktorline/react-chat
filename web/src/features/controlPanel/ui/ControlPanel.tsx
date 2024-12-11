import {
  JSXElementConstructor,
  Key,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  ReactPortal,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
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
  const { logout, deleteUser } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleDeleteUser = useCallback(() => {
    deleteUser();
  }, [deleteUser]);

  const handleSettings = useCallback(() => {}, []);

  const toggleTheme = useCallback(() => {}, []);

  const handleHelp = useCallback(() => {}, []);

  const menuItems = useMemo(
    () => [
      {
        label: 'Выйти',
        icon: <LogoutIcon sx={{ marginRight: '8px' }} />,
        onClick: handleLogout,
      },
      {
        label: 'Настройки',
        icon: <SettingsIcon sx={{ marginRight: '8px' }} />,
        onClick: handleSettings,
      },
      {
        label: 'Темная тема',
        icon: <DarkModeIcon sx={{ marginRight: '8px' }} />,
        onClick: toggleTheme,
      },
      {
        label: 'Помощь',
        icon: <HelpIcon sx={{ marginRight: '8px' }} />,
        onClick: handleHelp,
      },
      {
        label: 'Удалить пользователя',
        icon: <LogoutIcon sx={{ marginRight: '8px' }} />,
        onClick: handleDeleteUser,
      },
    ],
    [handleLogout, handleSettings, toggleTheme, handleHelp],
  );

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
            {menuItems.map(
              (
                item: {
                  onClick: MouseEventHandler<HTMLLIElement> | undefined;
                  icon: any;
                  label: any;
                },
                index: Key | null | undefined,
              ) => (
                <MenuItem key={index} onClick={item.onClick}>
                  {item.icon}
                  {item.label}
                </MenuItem>
              ),
            )}
          </Box>
        </Portal>
      )}
    </Box>
  );
}
