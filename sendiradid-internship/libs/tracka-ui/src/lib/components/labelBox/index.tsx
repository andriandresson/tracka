import { FC } from 'react';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import styled from 'styled-components';

const LabelBoxContainer = styled(Container)<{ active?: boolean }>`
  /* border: ${({ active }) => active && '1px solid #fff'}; */

  &.active > h6 {
    border-bottom: 1px solid white;
  }
`;

interface Props {
  avatar: string;
  color: string;
  name: string;
  active?: boolean;
}

const stringAvatar = (name: string) => {
  return {
    children: `${name.split(' ')[0][0]}`,
  };
};

export const LabelBox: FC<Props> = ({ avatar, color, name, active }) => {
  return (
    <LabelBoxContainer
      className={active ? 'active' : ''}
      active={active}
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
    </LabelBoxContainer>
  );
};
