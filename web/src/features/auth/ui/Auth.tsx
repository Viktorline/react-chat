import { ChangeEvent, FormEvent, useState } from 'react';

import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { useFormStore } from '../model/useAuth';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const {
    email,
    password,
    username,
    setEmail,
    setPassword,
    setUsername,
    submitForm,
  } = useFormStore();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleToggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submitForm(isLogin);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component='h1' variant='h5'>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Typography>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              label='Email Address'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
            {!isLogin && (
              <TextField
                margin='normal'
                required
                fullWidth
                label='Username'
                value={username}
                onChange={handleUsernameChange}
              />
            )}
            <TextField
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
            <Link
              component='button'
              variant='body2'
              onClick={handleToggleLogin}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Sign In'}
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
