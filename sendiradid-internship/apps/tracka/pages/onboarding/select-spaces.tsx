import { useApplicationContext } from '../../components/appContext';
import axios from 'axios';
import { useQuery } from 'react-query';
import {
  Selection,
  OnboardingLayout,
  LabelBox,
} from '@sendiradid-internship/tracka-ui';
import { Container, Button } from '@mui/material';
import Link from 'next/link';

const fetchSpaces = async (teamId: string | number) => {
  if (typeof teamId === 'string') {
    const { data } = await axios.get(`/api/spaces/${teamId}`);
    console.log(data);
    return data;
  } else {
    const { data } = await axios.get(`/api/spaces/${teamId.toString()}`);
    console.log(data);
    return data;
  }
};

const SelectSpaces = ({ session }) => {
  const { user } = session;
  const { value, setValue } = useApplicationContext();
  // setValue('activeStep', 1);
  console.clear();
  console.log('context: ', value);
  console.log('team', value.steps[0].selected);

  const selectedTeam = () => {
    // check if selected is array
    if (Array.isArray(value.steps[0].selected)) {
      const teams = value.steps[0].selected as Selection[];
      return teams[0]?.id;
    }
    const stepTeam = value.steps[0].selected as Selection;
    return stepTeam?.id;
  };

  const teamId = selectedTeam();

  console.log('teamId:', teamId);
  const { data, isLoading, isError } = useQuery('spaces', () =>
    fetchSpaces(teamId)
  );
  console.log('data:', data);
  if (isLoading) {
    return <Container>loading...</Container>;
  }

  if (isError) {
    return <Container>Error</Container>;
  }

  return (
    <OnboardingLayout
      title={value.steps[value.activeStep].label}
      description={value.steps[value.activeStep].description}
      activeStep={value.activeStep}
      steps={value.steps}
    >
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
        {data.spaces.map((space) => (
          <Container key={space.id} onClick={() => console.log(space)}>
            <LabelBox
              name={space.name}
              color={space.color}
              avatar={space.avatar}
              active={false}
            />
          </Container>
        ))}
      </Container>
      <Link href="/onboarding/select-team">
        <Button
          variant="outlined"
          sx={{
            mt: 8,
            width: 200,
            alignSelf: 'flex-end',
          }}
          onClick={() => setValue('activeStep', value.activeStep - 1)}
        >
          Back
        </Button>
      </Link>
      <Link href="/onboarding/select-spaces">
        <Button
          variant="contained"
          sx={{ mt: 8, width: 200, alignSelf: 'flex-end' }}
          onClick={() => setValue('activeStep', value.activeStep + 1)}
        >
          Continue
        </Button>
      </Link>
    </OnboardingLayout>
  );
};

export default SelectSpaces;
