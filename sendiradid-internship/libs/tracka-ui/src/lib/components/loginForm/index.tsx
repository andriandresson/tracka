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
          width: 510,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image src="/TrackaLogo.svg" alt="Tracka Logo" height="62" width="58" />
        <Typography
          variant="h2"
          sx={{
            color: 'primary.main',
            pb: 8,
            pt: 1,
          }}
        >
          Tracka
        </Typography>
        <Typography
          variant="h4"
          sx={{
            pb: 5,
          }}
        >
          Login with your ClickUp account
        </Typography>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <TextField
          name="username"
          type="text"
          placeholder="john@doe.com"
          margin="normal"
          label="Email"
          sx={{
            width: '65%',
          }}
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
            width: '65%',
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
          variant="contained"
          size="large"
          type="submit"
          sx={{
            mt: 4,
          }}
        >
          Login
        </Button>
      </Container>
    </form>
  );
};
