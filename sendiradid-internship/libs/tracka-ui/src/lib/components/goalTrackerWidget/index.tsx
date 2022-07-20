import { GoalTracker, Goal, Selection } from '@sendiradid-internship/tracka-ui';
import { FC } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Container, Card, Typography } from '@mui/material';
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
    return <Container>loading...</Container>;
  }
  if (isError) {
    return <Container>Error</Container>;
  }
  return (
    <Box sx={{ width: 600 }}>
      {goalDetails[0]?.goal.id ? (
        <Carousel autoPlay={false} animation="slide" navButtonsAlwaysVisible>
          {goalDetails.map((goal: Goal) => {
            return <GoalTracker key={goal.id} goalData={goal} />;
          })}
        </Carousel>
      ) : (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            sx={{ width: 520, p: 4, display: 'flex', flexDirection: 'column' }}
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
