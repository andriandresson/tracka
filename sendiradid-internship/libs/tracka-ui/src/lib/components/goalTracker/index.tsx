import {
  Box,
  Typography,
  Divider,
  List,
} from '@mui/material';
import { Container } from '@mui/system';
import { Chart as ChartJS, ArcElement } from 'chart.js';
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
    <Container
      sx={{
        display: 'flex',
        alignContent: 'flex-start',
        flexDirection: ' column',
      }}
    >
      <Typography variant="h3">Sprint Goal</Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        {goal.name}
      </Typography>
      <Box sx={{ width: 792, p: 1, height: 320 }}>
        <Container sx={{ display: 'flex', flexDirection: 'row', pt: 5 }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              position: 'relative',
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
            <Typography variant="subtitle1" sx={{ mt: 3 }}>
              due date: {dueDate.toDateString()}
            </Typography>
          </Box>
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              maxHeight: 150,
              position: 'relative',
              overflow: 'auto',
              m: 4,
              pl: 0,
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgb(44	52	60)',
                webkitBoxShadow: 'inset 0 0 6px rgb(44	52	60)',
                borderRadius: '5px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'common.white',
                borderRadius: '5px',
              },
            }}
          >
            <Box
              sx={{
                bgcolor: '#D55681',
                width: 340,
                ml: 2,
                height: 30,
                p: 0.5,
                position: 'fixed',
                mt: -5,
                borderRadius: '4px 4px 0 0',
              }}
            >
              Tasks that need to be completed
            </Box>
            {goal.key_results.map((keyResult: any) => (
              <Container key={keyResult.name} sx={{ display: 'flex' }}>
                <Typography
                  sx={{ mt: 1 }}
                  component="span"
                  variant="body1"
                  color={keyResult.completed ? 'success.main' : 'common.white'}
                >
                  {keyResult.name}
                  <Divider sx={{ width: 300, mt: 1 }} />
                </Typography>
                <Typography
                  component="span"
                  color="common.white"
                  sx={{ alignSelf: 'flex-end', marginLeft: 'auto' }}
                >
                  {`${keyResult.steps_current}/${keyResult.steps_end}`}
                  <Divider sx={{ mt: 1 }} />
                </Typography>
              </Container>
            ))}
          </List>
        </Container>
      </Box>
    </Container>
  );
};
