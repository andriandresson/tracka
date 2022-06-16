import { FC } from 'react';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';

interface Props {
  avatar: string;
  color: string;
  name: string;
}

const stringAvatar = (name: string) => {
  return {
    children: `${name.split(' ')[0][0]}`,
  };
};

export const LabelBox: FC<Props> = ({ avatar, color, name }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar
        variant="square"
        src={avatar}
        sx={{
          bgcolor: color,
          color: 'common.white',
          width: 116,
          height: 116,
          borderRadius: 1,
          fontSize: 48,
        }}
        {...stringAvatar(`${name}`)}
      />
      <Typography
        variant="subtitle2"
        color="common.white"
        // sx={{ alignSelf: 'center' }}
      >
        {name}
      </Typography>
    </Container>
  );
};
