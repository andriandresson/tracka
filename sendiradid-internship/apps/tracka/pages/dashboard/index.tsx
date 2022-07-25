import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import React from 'react';
import {
  GoalTrackerWidget,
  EmployeeTimeTrackerWidgetV2,
  Selection,
} from '@sendiradid-internship/tracka-ui';
import { useApplicationContext } from '../../components/appContext';

const Dashboard = () => {
  const router = useRouter();

  const { value } = useApplicationContext();

  if (!value.isOnboard) {
    router.push('/onboarding/select-team');
  } else {
    const selectedTeam = () => {
      const team = value.steps[0].selected as Selection;
      return team.id;
    };

    const teamID = selectedTeam();
    return (
      <Container sx={{ mt: 20, display: 'flex', flexDirection: 'row' }}>
        <GoalTrackerWidget teamID={teamID} />
        <EmployeeTimeTrackerWidgetV2 teamID={teamID} />
      </Container>
    );
  }
};

export default Dashboard;
