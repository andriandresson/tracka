import { Box, Card, Typography, useTheme } from '@mui/material';
import { Container } from '@mui/system';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FC } from 'react';

interface Props {
  goalData: any;
}

export const GoalTracker: FC<Props> = ({ goalData }) => {
  const theme = useTheme();
  console.log('theme', theme.palette.error);
  const backgroundArray = [];
  const borderArray = [];
  const { goal } = goalData;
  const percent = Math.round(goal.percent_completed * 100);
  const dueDate = new Date(parseInt(goal.due_date));

  if (percent < 25) {
    backgroundArray.push(theme.palette.error.main, theme.palette.error.dark);
    borderArray.push(theme.palette.error.main, theme.palette.error.dark);
  } else if (percent < 50) {
    backgroundArray.push(theme.palette.warning.main, theme.palette.error.dark);
    borderArray.push(theme.palette.warning.main, theme.palette.error.dark);
  } else if (percent < 75) {
    backgroundArray.push(
      theme.palette.success.main,
      theme.palette.success.dark
    );
    borderArray.push(theme.palette.success.main, theme.palette.success.dark);
  } else {
    backgroundArray.push(theme.palette.info.main, theme.palette.info.dark);
    borderArray.push(theme.palette.info.main, theme.palette.info.dark);
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
        cutout: '80%',
        // borderRadius: 30,
      },
    ],
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: 520, p: 4, backgroundColor: 'background.paper' }}>
        <Typography variant="h3">{goal.name}</Typography>
        <Container
          sx={{ display: 'flex', p: 4, backgroundColor: 'background.paper' }}
        >
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
          <Box sx={{ flexGrow: '1' }}>
            {goal.key_results.map((keyResult: any) => (
              <Container key={keyResult.name} sx={{ display: 'flex' }}>
                <Typography
                  component="span"
                  variant="body1"
                  color={keyResult.completed ? 'success.main' : 'common.white'}
                >
                  {keyResult.name}
                </Typography>
                <Typography
                  component="span"
                  color="common.white"
                  sx={{ alignSelf: 'flex-end', marginLeft: 'auto' }}
                >{`${keyResult.steps_current}/${keyResult.steps_end}`}</Typography>
              </Container>
            ))}
          </Box>
        </Container>
        <Typography>due date: {dueDate.toDateString()}</Typography>
      </Box>
    </Container>
  );
};
