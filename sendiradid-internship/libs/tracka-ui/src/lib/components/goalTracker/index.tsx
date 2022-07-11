import { Box, Card, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FC } from 'react';

interface Props {
  goalData: any;
}

export const GoalTracker: FC<Props> = ({ goalData }) => {
  const backgroundArray = [];
  const borderArray = [];
  const { goal } = goalData;
  const percent = Math.round(goal.percent_completed * 100);
  const dueDate = new Date(parseInt(goal.due_date));
  console.log('goalData:', goal);

  if (percent < 25) {
    backgroundArray.push('#f44336', 'rgba(54, 162, 235, 0)');
    borderArray.push('#f44336', 'rgba(54, 162, 235, 0)');
  } else if (percent < 50) {
    backgroundArray.push('#ff9800', 'rgba(54, 162, 235, 0)');
    borderArray.push('#ff9800', 'rgba(54, 162, 235, 0)');
  } else if (percent < 75) {
    backgroundArray.push('#ffeb3b', 'rgba(54, 162, 235, 0)');
    borderArray.push('#ffeb3b', 'rgba(54, 162, 235, 0)');
  } else {
    backgroundArray.push('#4caf50', 'rgba(54, 162, 235, 0)');
    borderArray.push('#4caf50', 'rgba(54, 162, 235, 0)');
  }

  ChartJS.register(ArcElement);
  const data = {
    labels: [goal.name],
    datasets: [
      {
        label: '# of Votes',
        data: [percent, 100 - percent],
        backgroundColor: backgroundArray,
        borderColor: borderArray,
        borderWidth: 1,
        cutout: '90%',
        borderRadius: 30,
      },
    ],
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: 520, p: 4 }}>
        <Typography variant="h3">{goal.name}</Typography>
        <Container sx={{ display: 'flex', p: 4 }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              position: 'relative',
              flexShrink: 1,
            }}
          >
            <Doughnut data={data} />
            <Typography
              variant="h3"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                textAlign: 'center',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {percent}%
            </Typography>
          </Box>
          <Box>
            {goal.key_results.map((keyResult: any) => (
              <Container key={keyResult.name} sx={{ display: 'flex' }}>
                <Typography
                  component="span"
                  variant="body1"
                  color={keyResult.completed ? '#2AD9A9' : '#DDE3E9'}
                >
                  {keyResult.name}
                </Typography>
                <Typography
                  component="span"
                  color="#DDE3E9"
                  sx={{ alignSelf: 'flex-end', marginLeft: 'auto' }}
                >{`${keyResult.steps_current}/${keyResult.steps_end}`}</Typography>
              </Container>
            ))}
          </Box>
        </Container>
        <Typography>due date: {dueDate.toDateString()}</Typography>
      </Card>
    </Container>
  );
};
