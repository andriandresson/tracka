import { useApplicationContext } from '../../components/appContext';
import axios from 'axios';
import { useQuery } from 'react-query';
import {
  Selection,
  OnboardingLayout,
  LabelBox,
} from '@sendiradid-internship/tracka-ui';
import { Container, Grid } from '@mui/material';

const fetchSpaces = async (teamId: string | number) => {
  if (typeof teamId === 'string') {
    const { data } = await axios.get(`/api/spaces/${teamId}`);
    return data;
  } else {
    const { data } = await axios.get(`/api/spaces/${teamId.toString()}`);
    return data;
  }
};

const SelectSpaces = () => {
  const { value, setValue, selectInternalSpaces, clearSelection } =
    useApplicationContext();

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

  const { data, isLoading, isError } = useQuery(
    `${teamId}-internalSpaces`,
    () => fetchSpaces(teamId)
  );
  if (isLoading) {
    return <Container>loading...</Container>;
  }

  if (isError) {
    return <Container>Error</Container>;
  }

  const isActive = (space: any) => {
    // check if selected is array
    if (Array.isArray(value.steps[value.activeStep].selected)) {
      const spaces = value.steps[value.activeStep].selected as Selection[];
      return !!spaces.find((elem) => elem.id === space.id);
    }
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
        <Grid container maxWidth="md" justifyContent="flex-start" spacing={5}>
          {data.spaces.map((space) => (
            <Grid
              item
              key={space.id}
              onClick={() => selectInternalSpaces(space)}
            >
              <LabelBox
                name={space.name}
                color={space.color}
                avatar={space.avatar}
                active={isActive(space)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </OnboardingLayout>
  );
};

export default SelectSpaces;
