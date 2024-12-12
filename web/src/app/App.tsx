import { useEffect } from 'react';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AuthPage from 'pages/authPage/ui/AuthPage';
import ChatPage from 'pages/chatPage/ui/ChatPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from 'shared/stores/auth/model/authStore';
import { useUserOSStore } from 'shared/stores/userSettings/model/userSettingsStore';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const { user, loadUserFromToken } = useAuthStore();
  const { detectUserOS } = useUserOSStore();
  const isAuthenticated = !!user;

  useEffect(() => {
    loadUserFromToken();
    detectUserOS();
  }, [loadUserFromToken]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path='/auth'
            element={!isAuthenticated ? <AuthPage /> : <Navigate to='/' />}
          />
          <Route
            path='/'
            element={isAuthenticated ? <ChatPage /> : <Navigate to='/auth' />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
