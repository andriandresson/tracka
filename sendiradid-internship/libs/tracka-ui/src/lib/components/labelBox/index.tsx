import { FC } from 'react';
import { Typography, Box, Avatar, Container } from '@mui/material';
import styled from 'styled-components';

const LabelBoxContainer = styled(Box)<{ active?: boolean }>`
  & {
    transition: 0.3s;
    border: solid 3px rgba(39, 139, 252, 0);
  }

  &.active {
    border: solid 3px rgba(39, 139, 252, 100);
  }
  &:hover {
    filter: brightness(130%);
    cursor: pointer;
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
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        width: 200,
      }}
    >
      <LabelBoxContainer
        className={active ? 'active' : ''}
        active={active}
        sx={{ borderRadius: 1, width: 'auto', p: 0.5 }}
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
            pd: 10,
          }}
          {...stringAvatar(`${name}`)}
        />
      </LabelBoxContainer>
      <Typography variant="subtitle2" color="common.white" sx={{ mt: 0.5 }}>
        {name}
      </Typography>
    </Container>
  );
};
