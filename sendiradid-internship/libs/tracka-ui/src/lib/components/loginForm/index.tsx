import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import {
  TextField,
  Container,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Logo from './Logo.svg';
import { useRouter } from 'next/router';

interface Props {
  csrfToken: string;
  APIurl: string;
}

const LoginTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#278BFC',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#278BFC',
    },
    '&:hover fieldset': {
      borderColor: '#278BFC',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#278BFC',
      borderWidth: 3,
    },
  },
});

export const LoginForm: FC<Props> = ({ csrfToken, APIurl }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    signIn('credentials', {
      redirect: false,
      username: email,
      password,
      csrfToken,
      callbackUrl: APIurl,
      // callbackUrl: `${window.location.origin}/profil`
    }).then((res: any) => {
      if (res?.ok) {
        router.push('/onboarding');
      } else {
        setError('Wrong or missing credentials.');
      }
    });
  };

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <Container
        sx={{
          width: 395,
          display: 'flex',
          pt: 21,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start',
        }}
      >
        <Container
          sx={{
            pb: 13,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Image src={Logo} alt="Tracka Logo" height="61" width="61" />
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
            pb: 8,
          }}
        >
          Please Sign in with your ClickUp credentials.{' '}
        </Typography>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <Typography>Email </Typography>
        <LoginTextField
          error={!!error}
          name="username"
          value={email}
          onChange={(e) => {
            setError('');
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Enter your email"
          margin="normal"
          sx={{
            mb: 2,
            width: 395,
            height: 60,
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
        <Typography>Password</Typography>
        <LoginTextField
          error={!!error}
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setError('');
            setPassword(e.target.value);
          }}
          margin="normal"
          sx={{
            width: 395,
            height: 60,
            mb: 2,
          }}
          InputProps={{
            style: { fontSize: '1rem' },
            startAdornment: (
              <InputAdornment position="start">
                <LockOpenIcon sx={{ height: 20, width: 26 }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography color="error" variant="body1" sx={{ mb: 4 }}>
          {error}
        </Typography>
        <Button
          variant="contained"
          type="submit"
          sx={{
            width: 395,
            height: 48,
          }}
        >
          Sign in
        </Button>
      </Container>
    </form>
  );
};
