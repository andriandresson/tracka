import { Container } from '@mui/system';
import React from 'react';
import { GoalTrackerWidget, Selection } from '@sendiradid-internship/tracka-ui';
import axios from 'axios';
import { useApplicationContext } from '../../components/appContext';
import { useQuery } from 'react-query';

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

const Dashboard = () => {
  const { value, setValue, clearSelection } = useApplicationContext();

  //just for presentation purposes I've changed onBoarding value in context to true, so we can go directly to the dashboard
  //therefore I'm skipping the fetch of selected team ID from context and setting it up to our default teamID
  //must be changed in production

  const selectedTeam = () => {
    if (Array.isArray(value.steps[0].selected)) {
      const teams = value.steps[0].selected as Selection[];
      return teams.map((team) => team.id);
    }
    const team = value.steps[0].selected as Selection;
    return team.id;
  };
  //    const teamID = selectedTeam();
  const teamID = 37453513;

  //fetching all goals for selected team
  const { data: goals } = useQuery(`${teamID}-goals`, () => {
    return fetchAllGoals(teamID);
  });
  const goalsIds = goals?.goals.map((goal) => goal.id);

  //dependant query for goal details - fetch only if goal is selected
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
  console.log('DATA:', goalDetails);

  if (isLoading) {
    return <Container>loading...</Container>;
  }
  if (isError) {
    return <Container>Error</Container>;
  }
  if (goalDetails) {
    return (
      <Container sx={{ mt: 20 }}>
        <GoalTrackerWidget goalsArray={goalDetails} />
      </Container>
    );
  }
};

export default Dashboard;
