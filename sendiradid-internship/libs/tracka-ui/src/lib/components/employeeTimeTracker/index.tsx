import { FC } from 'react';
import {
  Typography,
  Box,
  Avatar,
  Container,
  Card,
  List,
  ListSubheader,
} from '@mui/material';
import { msToString } from './timeUtils';
import { EmployeeData, TaskTag } from '@sendiradid-internship/tracka-ui';
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
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'background.paper',
          pb: 2,
        }}
      >
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          Time Tracked
        </Typography>
      </Container>
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
              <Box sx={{ display: 'flex', p: 1, pb: 2 }}>
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
