import { Button, Container } from '@mui/material';
import axios from 'axios';
import { useApplicationContext } from '../../components/appContext';
import { Selection, OnboardingLayout } from '@sendiradid-internship/tracka-ui';
import { useQuery } from 'react-query';

const fetchFolders = async (spaceId: string | number) => {
  if (typeof spaceId === 'string') {
    const { data } = await axios.get(`/api/folders/${spaceId}`);
    return data;
  } else {
    const { data } = await axios.get(`/api/folders/${spaceId.toString()}`);
    return data;
  }
};

const SelectClients = () => {
  const { value, setValue } = useApplicationContext();

  const selectedSpaces = () => {
    // check if selected is array
    if (Array.isArray(value.steps[1].selected)) {
      const spaces = value.steps[1].selected as Selection[];
      return spaces.map((space) => space.id);
    }
    const space = value.steps[1].selected as Selection;
    return space.id;
  };

  const spaces = selectedSpaces();

  const { data, isLoading, isError } = useQuery(`folders`, () => {
    if (Array.isArray(spaces)) {
      const promiseArray = spaces.map((space) => fetchFolders(space));
      return Promise.all(promiseArray);
    } else {
      return fetchFolders(spaces);
    }
  });
  if (isLoading) {
    return <Container>loading...</Container>;
  }
  if (isError) {
    return <Container>Error</Container>;
  }

  console.log('SELECTED SPACES:', selectedSpaces());
  console.log('DATA:', data);

  return (
    <Container>
      <OnboardingLayout
        title={value.steps[value.activeStep].label}
        description={value.steps[value.activeStep].description}
        activeStep={value.activeStep}
        steps={value.steps}
        setValue={setValue}
      >
        <Container></Container>
      </OnboardingLayout>
    </Container>
  );
};
export default SelectClients;