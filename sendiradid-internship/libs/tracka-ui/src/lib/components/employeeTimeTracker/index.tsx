import { FC, useState } from 'react';
import { Typography, Box, Avatar, Container, Card } from '@mui/material';

export const EmployeeTimeTracker: FC = () => {
  return (
    <Card>
      <Typography variant="h4">Employee Time Tracker</Typography>
      <Typography variant="subtitle1">
        Track your time and see your progress.
      </Typography>
    </Card>
  );
};
