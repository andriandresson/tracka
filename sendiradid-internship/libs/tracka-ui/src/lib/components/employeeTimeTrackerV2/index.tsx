import { FC, useState } from 'react';
import {
  Typography,
  Box,
  Avatar,
  Container,
  Card,
  List,
  ListSubheader,
} from '@mui/material';
import { useQuery } from 'react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { msToString } from './timeUtils';
import * as timeUtils from '../customDateRangePicker/timeUtils';
import {
  EmployeeData,
  TaskTag,
  TeamsArray,
  CustomDateRangePicker,
  Loader,
} from '@sendiradid-internship/tracka-ui';

interface TrackerProps {
  data: EmployeeData[];
}
interface Props {
  teamID: string | number;
}

export const EmployeeTimeTrackerV2: FC<TrackerProps> = ({ data }) => {
  //fetching time tracking data for each of the members of the team
  //response saved as array of all tracked tasks for each member

  const timeTrackedInMs = data.reduce((acc, curr) => {
    return acc + parseInt(curr.duration);
  }, 0);

  const taskTagsArray: TaskTag[] =
    //add all task_tags to array
    //filter out tags with name==='vacation'
    //filter out duplicate tags
    data
      .reduce((acc, curr) => {
        return acc.concat(curr.task_tags);
      }, [] as TaskTag[])
      .filter((tag) => tag.name !== 'vacation')
      .filter(
        (tag, index, self) =>
          self.findIndex((t) => t.name === tag.name) === index
      );

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        sx={{ maxWidth: '464px', pt: 1, pb: 1, height: '100%' }}
      >
        <Avatar
          src={data[0].user.profilePicture}
          sx={{ bgcolor: data[0].user.color, width: 32, height: 32 }}
        >
          <Typography variant="subtitle2" color="#FFF">
            {data[0].user.initials}
          </Typography>
        </Avatar>
        <Container
          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {data[0].user.username}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {taskTagsArray.map((tag) => (
              <Typography
                key={tag.name}
                variant="subtitle2"
                sx={{ pr: 2, lineHeight: '0.9rem' }}
              >
                {tag.name}
              </Typography>
            ))}
          </Box>
        </Container>
        <Typography variant="subtitle1">
          {msToString(timeTrackedInMs)}
        </Typography>
      </Box>
    </>
  );
};

const useQueryOptions = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
};

export const EmployeeTimeTrackerWidgetV2: FC<Props> = ({ teamID }) => {
  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate?: Date;
  }>({
    startDate: timeUtils.monthAgoDate(),
  });

  const fetchTimeTrackingData = async (
    teamID: string | number,
    assignee?: number,
    startDate?: number,
    endDate?: number
  ) => {
    const axiosConfig: AxiosRequestConfig = {
      params: {
        include_task_tags: true,
        assignee,
        start_date: startDate,
        end_date: endDate,
      },
    };
    if (typeof teamID === 'string') {
      const { data } = await axios.get(`/api/timetrack/${teamID}`, axiosConfig);
      return data;
    } else {
      const { data } = await axios.get(
        `/api/timetrack/${teamID.toString()}`,
        axiosConfig
      );
      return data;
    }
  };

  const handleOnApply = ({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate?: Date;
  }) => {
    // Format start and end date and log it console
    setDateRange({ startDate, endDate });
  };
  const fetchTeamMembers = async (teamID: string | number) => {
    const { data } = (await axios.get(`/api/teams`)) as TeamsArray;
    const teamMembers = data.teams.find((team) => team.id === teamID);
    return teamMembers
      ? teamMembers?.members?.map((member) => member?.user)
      : [];
  };

  const { data: teamMembers } = useQuery(
    `${teamID}-member`,
    () => fetchTeamMembers(teamID),
    useQueryOptions
  );
  const { data, isLoading, isError } = useQuery(
    [`timetracked members`, teamID, teamMembers, dateRange],
    () => {
      if (Array.isArray(teamMembers)) {
        const promiseArray = teamMembers.map((member) => {
          return fetchTimeTrackingData(
            teamID,
            member.id,
            dateRange.startDate.getTime(),
            dateRange.endDate?.getTime()
          );
        });
        return Promise.all(promiseArray);
      } else {
        return [];
      }
    },
    {
      enabled: !!teamMembers,
      // ...useQueryOptions,
    }
  );
  if (isLoading) {
    return (
      <Card
        sx={{
          width: '512px',
          backgroundColor: 'background.default',
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            pb: 2,
            backgroundColor: 'background.paper',
            pt: 4,
          }}
        >
          <Typography variant="body2" sx={{ flexGrow: 1, alignSelf: 'center' }}>
            Time Tracked
          </Typography>
          <CustomDateRangePicker
            state={[
              {
                key: 'selection',
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
              },
            ]}
            onApply={handleOnApply}
            // setRange={setState}
            // onChange={(item) => setState([item['selection']])}
          />
        </Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            marginInline: 'auto',
            backgroundColor: 'background.paper',
            maxHeigh: '500px',
          }}
        >
          <Loader />
        </Box>
      </Card>
    );
  }
  if (isError) {
    return <Container>Error</Container>;
  }

  //filter members with non empty tasks
  const activeMembers = data?.filter(
    (member: TrackerProps) => member.data.length > 0
  ) as TrackerProps[];
  console.log('activeMembers', activeMembers);
  return (
    <Card sx={{ width: '512px', maxHeight: '500px' }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          pb: 2,
          backgroundColor: 'background.paper',
          pt: 4,
        }}
      >
        <Typography variant="body2" sx={{ flexGrow: 1, alignSelf: 'center' }}>
          Time Tracked
        </Typography>
        <CustomDateRangePicker
          state={[
            {
              key: 'selection',
              startDate: dateRange.startDate,
              endDate: dateRange.endDate,
            },
          ]}
          onApply={handleOnApply}
          // setRange={setState}
          // onChange={(item) => setState([item['selection']])}
        />
      </Container>

      <List
        sx={{
          maxWidth: '100%',
          position: 'relative',
          maxHeight: 420,
          overflow: 'auto',
          backgroundColor: 'background.paper',
        }}
        subheader={
          <ListSubheader>
            <Box
              sx={{
                display: 'flex',
                p: 1,
                pb: 2,
                backgroundColor: 'background.paper',
              }}
            >
              <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                Members
              </Typography>
              <Typography variant="subtitle2">Hours </Typography>
            </Box>
          </ListSubheader>
        }
      >
        {activeMembers?.length > 0 ? (
          activeMembers.map((employee) => (
            <EmployeeTimeTrackerV2
              key={employee.data[0].user.id}
              data={employee.data}
            />
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxHeight: '500px',
            }}
          >
            <Loader />
          </Box>
        )}
      </List>
    </Card>
  );
};
