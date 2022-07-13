import React from 'react';
import { useQuery } from 'react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { Container } from '@mui/material';
import { useApplicationContext } from '../components/appContext';
import { EmployeeTimeTracker } from '@sendiradid-internship/tracka-ui';

const fetchTimeTrackingData = async (teamId: string | number) => {
  const axiosConfig: AxiosRequestConfig = {
    params: {
      assignee: 55365605,
    },
  };
  if (typeof teamId === 'string') {
    const { data } = await axios.get(`/api/timetrack/${teamId}`, axiosConfig);
    return data;
  } else {
    const { data } = await axios.get(
      `/api/timetrack/${teamId.toString()}`,
      axiosConfig
    );
    return data;
  }
};

const Test = () => {
  const { value } = useApplicationContext();

  //   team selection from the context must get into production
  //   const selectedTeam = () => {
  //     const stepTeam = value.steps[0].selected as Selection;
  //     return stepTeam?.id;
  //   };
  //   const teamId = selectedTeam();
  const teamId = 37453513;

  console.log('context', value);
  console.log('teamId', teamId);
  const { data, isLoading, isError } = useQuery(`${teamId}-timeasds`, () =>
    fetchTimeTrackingData(teamId)
  );
  if (isLoading) {
    return <Container>loading...</Container>;
  }

  if (isError) {
    return <Container>Error</Container>;
  }

  console.log('data', data);
  return (
    <Container sx={{ mt: 20 }}>
      <EmployeeTimeTracker />
    </Container>
  );
};

export default Test;
