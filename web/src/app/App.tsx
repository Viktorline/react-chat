import { useEffect } from 'react';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AuthPage from 'pages/authPage/AuthPage';
import ChatPage from 'pages/chatPage/ui/ChatPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from 'shared/auth/model/authStore';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const { user, loadUserFromToken } = useAuthStore();
  const isAuthenticated = !!user;

  useEffect(() => {
    loadUserFromToken();
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
