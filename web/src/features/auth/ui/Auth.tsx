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
import { useTranslation } from 'react-i18next';

import { useLoginForm } from '../model/useLoginForm';

export default function Auth() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const {
    email,
    password,
    username,
    setEmail,
    setPassword,
    setUsername,
    submitForm,
  } = useLoginForm();

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
            {isLogin ? t('Войти') : t('Зарегистрироваться')}
          </Typography>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              label={t('Адрес электронной почты')}
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
                label={t('Имя пользователя')}
                value={username}
                onChange={handleUsernameChange}
              />
            )}
            <TextField
              margin='normal'
              required
              fullWidth
              label={t('Пароль')}
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
              {isLogin ? t('Войти') : t('Зарегистрироваться')}
            </Button>
            <Link
              component='button'
              variant='body2'
              onClick={handleToggleLogin}
            >
              {isLogin
                ? t('Нет учетной записи? Зарегистрируйтесь')
                : t('Уже есть учетная запись? Войти')}
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
