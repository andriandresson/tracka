import { FC } from 'react';

import Button from '@mui/material/Button';
import {
  TextField,
  Container,
  Typography,
  InputAdornment,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import Image from 'next/image';

interface Props {
  csrfToken: string;
  APIurl: string;
}

export const LoginForm: FC<Props> = ({ csrfToken, APIurl }) => {
  return (
    <form method="post" action={APIurl}>
      <Container
        sx={{
          width: 395,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start',
        }}
      >
        <Container
          sx={{
            mb: 10,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Image
            src="/TrackaLogo.svg"
            alt="Tracka Logo"
            height="40"
            width="37.2"
          />
        </Container>

        <Typography
          variant="h1"
          sx={{
            pb: 2,
          }}
        >
          Sign in
        </Typography>
        <Typography
          variant="body1"
          sx={{
            pb: 6,
          }}
        >
          Please Sign in with your ClickUp credentials.{' '}
        </Typography>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <TextField
          name="username"
          type="text"
          placeholder="john@doe.com"
          margin="normal"
          label="Email"
          sx={{ mb: 2, width: '100%' }}
          InputProps={{
            style: { fontSize: '1rem' },
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon sx={{ height: 20, width: 26 }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          name="password"
          type="password"
          placeholder="Your password"
          margin="normal"
          label="Password"
          sx={{
            width: '100%',
            mb: 4,
          }}
          InputProps={{
            style: { fontSize: '1rem' },
            startAdornment: (
              <InputAdornment position="start">
                <LockOpenIcon sx={{ height: 20, width: 26 }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          color="secondary"
          variant="contained"
          size="large"
          type="submit"
          sx={{
            width: '100%',
          }}
        >
          Sign in
        </Button>
      </Container>
    </form>
  );
};
