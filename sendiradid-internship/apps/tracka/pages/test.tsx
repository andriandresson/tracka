import React from 'react';
import { useQuery } from 'react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { Container } from '@mui/material';
import { useApplicationContext } from '../components/appContext';
import { EmployeeTimeTrackerWidget } from '@sendiradid-internship/tracka-ui';

const fetchTimeTrackingData = async (
  teamId: string | number,
  assignee?: number
) => {
  const axiosConfig: AxiosRequestConfig = {
    params: {
      include_task_tags: true,
      assignee,
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

const fetchTeamMembers = async (teamId: string | number) => {
  const { data } = await axios.get(`/api/teams`);

  const teamMembers = data.teams.find((team) => team.id === teamId);
  return teamMembers ? teamMembers?.members?.map((member) => member?.user) : [];
};
const Test = () => {
  const { value } = useApplicationContext();

  //   team selection from the context must get into production
  //   const selectedTeam = () => {
  //     const stepTeam = value.steps[0].selected as Selection;
  //     return stepTeam?.id;
  //   };
  //   const teamId = selectedTeam();
  const teamId = '37453513';

  const { data: teamMembers } = useQuery(`${teamId}-member`, () =>
    fetchTeamMembers(teamId)
  );

  //fetching time tracking data for each of the members of the team
  //response saved as array of all tracked tasks for each member
  const { data, isLoading, isError } = useQuery(
    [`timetracked members`, teamId, teamMembers],
    () => {
      if (Array.isArray(teamMembers)) {
        const promiseArray = teamMembers.map((member) =>
          fetchTimeTrackingData(teamId, member.id)
        );
        return Promise.all(promiseArray);
      } else {
        return fetchTimeTrackingData(teamMembers);
      }
    },
    {
      enabled: !!teamMembers,
    }
  );
  if (isLoading) {
    return <Container>loading...</Container>;
  }
  if (isError) {
    return <Container>Error</Container>;
  }

  return (
    <Container sx={{ mt: 20, backgroundColor: 'background.default' }}>
      <EmployeeTimeTrackerWidget data={data} />
    </Container>
  );
};

export default Test;
