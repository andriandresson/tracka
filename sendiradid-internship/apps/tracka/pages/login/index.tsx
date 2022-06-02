import { getCsrfToken } from 'next-auth/react';

import styles from '../../styles/login.module.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Button from '@mui/material/Button';
import { TextField, Card, Typography, InputAdornment } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import '@fontsource/kanit';
import '@fontsource/inter';

import Image from 'next/image';

const SignIn = ({ csrfToken }) => {
  const ariaLabel = { 'aria-label': 'description' };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={styles.loginContainer}>
        <Card
          sx={{
            width: 510,
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#15161A',
          }}
        >
          <form
            method="post"
            action="/api/auth/callback/credentials"
            className={styles.loginForm}
          >
            <Image
              src="/TrackaLogo.svg"
              alt="Tracka Logo"
              height="96"
              width="96"
            />
            <Typography
              sx={{
                fontFamily: 'kanit',
                fontWeight: 400,
                color: '#278BFC',
                fontSize: 46,
                pb: 5,
              }}
            >
              Tracka
            </Typography>
            <Typography
              sx={{
                color: '#7A7A7B',
                fontWeight: 500,
                fontFamily: 'inter',
                fontSize: 23,
                pb: 3,
              }}
            >
              Login with your ClickUp account
            </Typography>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label className="login-label">
              <Typography
                sx={{
                  fontWeight: 500,
                  fontFamily: 'inter',
                  fontSize: 21,
                }}
              >
                Email
              </Typography>
              <TextField
                name="username"
                type="text"
                placeholder="Enter your Email"
                margin="normal"
                sx={{
                  width: 416,
                  heigth: 64,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon sx={{ height: 28, width: 35 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </label>
            <label className="login-label">
              <Typography
                sx={{
                  pt: 2,
                  fontWeight: 500,
                  fontFamily: 'inter',
                  fontSize: 21,
                }}
              >
                Password
              </Typography>
              <TextField
                name="password"
                type="password"
                placeholder="Enter your password"
                margin="normal"
                sx={{
                  width: 416,
                  heigth: 26,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </label>
            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{ mt: 4, background: '#278BFC', color: '#fff' }}
            >
              Login
            </Button>
          </form>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export const getServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

export default SignIn;
