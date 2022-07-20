import { Container } from '@mui/system';
import React from 'react';
import {
  GoalTrackerWidget,
  EmployeeTimeTrackerWidgetV2,
  Selection,
} from '@sendiradid-internship/tracka-ui';
import { useApplicationContext } from '../../components/appContext';

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
  const teamID = '37453513';

  return (
    <Container sx={{ mt: 20 }}>
      <GoalTrackerWidget teamID={teamID} />
      <EmployeeTimeTrackerWidgetV2 teamID={teamID} />
    </Container>
  );
};

export default Dashboard;
