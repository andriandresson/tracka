import { useQuery } from 'react-query';
import axios from 'axios';
import { Container, Stack, Typography, Button } from '@mui/material';
import { Dashboard } from 'apps/tracka/screens/dashboard';
import { withAuth } from 'apps/tracka/components/withAuth';
import { LabelBox } from '@sendiradid-internship/tracka-ui';

const Index = () => {
  const fetchTeams = async () => {
    const { data } = await axios.get('api/teams/');
    return data;
  };

  const { data, status } = useQuery('teams', fetchTeams);

  if (status === 'loading') {
    return <div>loading...</div>;
  }
  if (status === 'error') {
    return <div>Error</div>;
  }

  return (
    <Stack direction="row">
      <Container
        sx={{
          ml: 8,
          display: 'flex',
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h2" sx={{ mt: 10, ml: 6 }}>
          Select team
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, ml: 6 }}>
          Pick your default workspace team, you only select one.
        </Typography>
        <Container
          sx={{
            mt: 8,
            alignSelf: 'flex-start',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridGap: 80,
            justifyItems: 'start',
            alignItems: 'start',
            justifyContent: 'start',
          }}
        >
          {data.teams.map((team) => (
            <LabelBox
              name={team.name}
              color={team.color}
              avatar={team.avatar}
              key={team.id}
            />
          ))}
        </Container>
        <Button
          variant="contained"
          sx={{ mt: 8, width: 200, alignSelf: 'flex-end' }}
        >
          Continue
        </Button>
      </Container>
      <Container></Container>
    </Stack>
  );
};

export default Index;
