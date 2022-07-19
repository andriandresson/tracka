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
} from '@sendiradid-internship/tracka-ui';

interface TrackerProps {
  data: EmployeeData[];
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
    <Container>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        sx={{ width: '464px', pt: 1, pb: 1 }}
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
    </Container>
  );
};

const useQueryOptions = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
};

export const EmployeeTimeTrackerWidgetV2: FC = () => {
  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate?: Date;
  }>({
    startDate: timeUtils.monthAgoDate(),
  });

  const fetchTimeTrackingData = async (
    teamId: string | number,
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
  const fetchTeamMembers = async (teamId: string | number) => {
    const { data } = (await axios.get(`/api/teams`)) as TeamsArray;
    const teamMembers = data.teams.find((team) => team.id === teamId);
    return teamMembers
      ? teamMembers?.members?.map((member) => member?.user)
      : [];
  };
  const teamId = '37453513';

  const { data: teamMembers } = useQuery(
    `${teamId}-member`,
    () => fetchTeamMembers(teamId),
    useQueryOptions
  );
  const { data, isLoading, isError } = useQuery(
    [`timetracked members`, teamId, teamMembers, dateRange],
    () => {
      if (Array.isArray(teamMembers)) {
        const promiseArray = teamMembers.map((member) => {
          return fetchTimeTrackingData(
            teamId,
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
      <Card sx={{ width: '512px' }}>
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
  return (
    <Card sx={{ width: '512px' }}>
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
          <Typography>
            We are fetching the data, it might take a while{' '}
          </Typography>
        )}
      </List>
    </Card>
  );
};
