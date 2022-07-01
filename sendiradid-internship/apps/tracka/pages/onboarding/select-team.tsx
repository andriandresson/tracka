import { Container, Grid, Stack } from '@mui/material';
import { useApplicationContext } from '../../components/appContext';
import {
  LabelBox,
  OnboardingLayout,
  Selection,
} from '@sendiradid-internship/tracka-ui';
import { useQuery } from 'react-query';
import axios from 'axios';

const SelectTeam = () => {
  const { value, setValue, selectTeam, clearSelection } =
    useApplicationContext();

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
      setValue={setValue}
      clearSelection={clearSelection}
    >

      <Grid container>
        <Grid container maxWidth='md' justifyContent="flex-start" spacing={5}>
        {data.teams.map((team) => (
           <Grid item key={team.id} onClick={() => selectTeam(team)}>
            <LabelBox
              name={team.name}
              color={team.color}
              avatar={team.avatar}
              active={isActive(team)}
            />
          </Grid>
        ))}
        </Grid>
        </Grid>
    </OnboardingLayout>
  );
};

export default SelectTeam;