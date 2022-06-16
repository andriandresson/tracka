import { FC } from 'react';
import { Container, Typography } from '@mui/material';
interface Props {
  header: string;
  subheader: string;
}

export const SelectCategoryOnboarding: FC<Props> = ({ header, subheader }) => {
  return (
    <Container>
      <Typography>{header}</Typography>
      <Typography>{subheader}</Typography>
    </Container>
  );
};
