import { Container, Typography, Button } from '@mui/material';
import Logo from '../public/logo.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

const Custom404 = () => {
  const router = useRouter();

  return (
    <Container sx={{ mt: 30, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h1" color="primary" sx={{ fontSize: 128, mb: 2 }}>
        Error 4
        <Image
          src={Logo}
          height="90px"
          width="90px"
          alt="Tracka Logo as 0 in 404"
          priority
        />
        4
      </Typography>
      <Typography sx={{ fontSize: 48, mb: 2 }}>
        Oops! Something went wrong
      </Typography>
      <Typography variant="h1">Please go back to homepage</Typography>
      <Button
        onClick={() => router.push('/')}
        variant="contained"
        sx={{
          width: 198,
          height: 48,
          alignSelf: 'center',
          mt: 6,
          background: 'primary.dark',
        }}
      >
        Home
      </Button>
    </Container>
  );
};

export default Custom404;
