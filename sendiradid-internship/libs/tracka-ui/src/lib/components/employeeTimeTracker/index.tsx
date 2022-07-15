import { FC } from 'react';
import {
  Typography,
  Box,
  Avatar,
  Container,
  Card,
  List,
  ListSubheader,
  Chip,
} from '@mui/material';
import { msToString } from './timeUtils';

export interface Status {
  status: string;
  color: string;
  type: string;
  orderindex: number;
}

export interface Task {
  id: string;
  name: string;
  status: Status;
  custom_type?: any;
}

export interface User {
  id: number;
  username: string;
  email: string;
  color: string;
  initials: string;
  profilePicture?: string;
}

export interface TaskLocation {
  list_id: string;
  folder_id: string;
  space_id: string;
}
export interface TaskTag {
  name: string;
  tag_fg: string;
  tag_bg: string;
  creator: number;
}

export interface EmployeeData {
  id: string;
  task: Task;
  wid: string;
  user: User;
  billable: boolean;
  start: string;
  end: string;
  duration: string;
  description: string;
  tags: any[];
  source: string;
  at: string;
  task_location: TaskLocation;
  task_tags: TaskTag[];
  task_url: string;
}

interface TrackerProps {
  data: EmployeeData[];
}

interface WidgetProps {
  data: TrackerProps[];
}

export const EmployeeTimeTracker: FC<TrackerProps> = ({ data }) => {
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

  console.log('taskTagsArray', taskTagsArray);

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

export const EmployeeTimeTrackerWidget: FC<WidgetProps> = ({ data }) => {
  //filter members with non empty tasks
  const activeMembers = data?.filter((member) => member.data.length > 0);
  console.log(activeMembers);
  return (
    <Card sx={{ width: '512px' }}>
      {activeMembers?.length > 0 ? (
        <List
          sx={{
            maxWidth: '100%',
            bgcolor: 'background.paper',
            position: 'relative',
            maxHeight: 320,
            overflow: 'auto',
          }}
          subheader={
            <ListSubheader>
              <Box sx={{ display: 'flex', p: 1 }}>
                <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                  Members
                </Typography>
                <Typography variant="subtitle2">Hours </Typography>
              </Box>
            </ListSubheader>
          }
        >
          {activeMembers.map((employee) => (
            <EmployeeTimeTracker
              key={employee.data[0].user.id}
              data={employee.data}
            />
          ))}
        </List>
      ) : (
        <Typography>
          We are fetching the data, it might take a while{' '}
        </Typography>
      )}
    </Card>
  );
};
