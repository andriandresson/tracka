import {
  GoalTracker,
  Goal,
  GoalTrackerSkeleton,
} from '@sendiradid-internship/tracka-ui';
import { FC } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Container, Card, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useQuery } from 'react-query';

interface Props {
  teamID: string | number;
}

export const GoalTrackerWidget: FC<Props> = ({ teamID }) => {
  const fetchAllGoals = async (teamId: string | number) => {
    if (typeof teamId === 'string') {
      const { data } = await axios.get(`/api/goals/${teamId}`);
      return data;
    } else {
      const { data } = await axios.get(`/api/goals/${teamId.toString()}`);
      return data;
    }
  };

  const fetchGoalDetails = async (goalId: string | number) => {
    if (typeof goalId === 'string') {
      const { data } = await axios.get(`/api/goal/${goalId}`);
      return data;
    } else {
      const { data } = await axios.get(`/api/goal/${goalId.toString()}`);
      return data;
    }
  };

  //fetching all goals for selected team
  const { data: goals } = useQuery(`${teamID}-goals`, () => {
    return fetchAllGoals(teamID);
  });
  const goalsIds = goals?.goals.map((goal: Goal) => goal.id);

  const {
    data: goalDetails,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    [`${goalsIds?.toString()}-goal-details`, goalsIds],
    () => {
      if (Array.isArray(goalsIds)) {
        const promiseArray = goalsIds.map((goal) => fetchGoalDetails(goal));
        return Promise.all(promiseArray);
      }
      return fetchGoalDetails(goals.id);
    },
    { enabled: !!goalsIds }
  );

  if (isLoading || !goalsIds) {
    return <GoalTrackerSkeleton />;
  }

  const handleClick = () => {
    refetch();
  };

  if (isError) {
    return (
      <Container
        sx={{
          width: '792px',
          maxHeight: '409px',
          bgcolor: 'background.paper',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3">Oops! Something went wrong</Typography>
          <Button
            sx={{ mt: 2, width: 100 }}
            variant="contained"
            onClick={(e) => handleClick()}
          >
            Refresh
          </Button>
        </Box>
      </Container>
    );
  }
  return (
    <Box
      sx={{
        width: 792,
        height: 409,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: '5px',
      }}
    >
      {goalDetails[0]?.goal.id ? (
        <Carousel
          changeOnFirstRender={true}
          height={320}
          sx={{ p: 2 }}
          autoPlay={false}
          animation="slide"
          navButtonsAlwaysVisible
          navButtonsProps={{ style: { background: 'none' } }}
        >
          {goalDetails.map((goal: Goal) => {
            return <GoalTracker key={goal.id} goalData={goal} />;
          })}
        </Carousel>
      ) : (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            sx={{ width: 792, p: 4, display: 'flex', flexDirection: 'column' }}
          >
            <Typography variant="body2">
              Setting goals is the first step in turning the invisible into the
              visible. 🙈
            </Typography>
            <Typography variant="caption" sx={{ alignSelf: 'flex-end' }}>
              Tony Robinson
            </Typography>
          </Card>
        </Container>
      )}
    </Box>
  );
};
