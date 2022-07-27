import { Grid } from '@mui/material';
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
      <Grid
        container
        spacing={8}
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        sx={{ mt: 10, mb: 20 }}
      >
        <Grid item>
          <GoalTrackerWidget teamID={teamID} />
        </Grid>
        <Grid item>
          <EmployeeTimeTrackerWidgetV2 teamID={teamID} />
        </Grid>
      </Grid>
    );
  }
};

export default Dashboard;
