import React from 'react';

import { Container } from '@mui/material';
import { useApplicationContext } from '../components/appContext';
import { EmployeeTimeTrackerWidgetV2 } from '@sendiradid-internship/tracka-ui';

const Test2 = () => {
  const { value } = useApplicationContext();

  //   team selection from the context must get into production
  //   const selectedTeam = () => {
  //     const stepTeam = value.steps[0].selected as Selection;
  //     return stepTeam?.id;
  //   };
  //   const teamId = selectedTeam();

  return (
    <Container sx={{ mt: 20 }}>
      {/* <Calendar
        date={new Date()}
        onChange={(args) => {
          console.log(args);
        }}
      /> */}
      <EmployeeTimeTrackerWidgetV2 />
    </Container>
  );
};

export default Test2;
