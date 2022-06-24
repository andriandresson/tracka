import { Container, Button } from '@mui/material';
import { useApplicationContext } from '../../components/appContext';
import {
  LabelBox,
  OnboardingLayout,
  Selection,
} from '@sendiradid-internship/tracka-ui';
import { useQuery } from 'react-query';
import axios from 'axios';
import Link from 'next/link';

const SelectTeam = () => {
  const { value, setValue, selectTeam } = useApplicationContext();

  //onclick handler for selecting teams and updating the context state
  // const onSelect = (element) => {
  //   console.log(element.id);
  //   const newSteps = [...value.steps];
  //   const selectedTeam: Selection = {
  //     id: element.id,
  //     name: element.name,
  //   };
  //   newSteps[value.activeStep].selected = selectedTeam;
  //   setValue('steps', newSteps);
  // };

  const fetchTeams = async () => {
    const { data } = await axios.get('../api/teams/');
    return data;
  };
  const { data, isError, isLoading } = useQuery('teams', fetchTeams);

  if (isLoading) {
    return <Container>loading...</Container>;
  }

  if (isError) {
    return <Container>Error</Container>;
  }
  const isActive = (team: any) => {
    // check if selected is array
    if (Array.isArray(value.steps[value.activeStep].selected)) {
      const teams = value.steps[value.activeStep].selected as Selection[];
      return !!teams.find((elem) => elem.id === team.id);
    }
    const stepTeam = value.steps[value.activeStep].selected as Selection;
    return stepTeam?.id === team.id;
  };

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
        {data.teams.map((team) => (
          <Container key={team.id} onClick={() => selectTeam(team)}>
            <LabelBox
              name={team.name}
              color={team.color}
              avatar={team.avatar}
              active={isActive(team)}
            />
          </Container>
        ))}
      </Container>
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

export default SelectTeam;
