import { useApplicationContext } from '../../components/appContext';
import axios from 'axios';
import { useQuery } from 'react-query';
import {
  Selection,
  OnboardingLayout,
  LabelBox,
} from '@sendiradid-internship/tracka-ui';
import { Container } from '@mui/material';

const fetchSpaces = async (teamId: string | number) => {
  if (typeof teamId === 'string') {
    const { data } = await axios.get(`/api/spaces/${teamId}`);
    return data;
  } else {
    const { data } = await axios.get(`/api/spaces/${teamId.toString()}`);
    return data;
  }
};

const SelectSpaces = ({ session }) => {
  const { user } = session;
  const { value, setValue, selectSpaces, clearSelection } =
    useApplicationContext();
  // setValue('activeStep', 1);

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

  const { data, isLoading, isError } = useQuery('spaces', () =>
    fetchSpaces(teamId)
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
          <Container key={space.id} onClick={() => selectSpaces(space)}>
            <LabelBox
              name={space.name}
              color={space.color}
              avatar={space.avatar}
              active={isActive(space)}
            />
          </Container>
        ))}
      </Container>
    </OnboardingLayout>
  );
};

export default SelectSpaces;
