import { Container } from '@mui/material';
import axios from 'axios';
import { useApplicationContext } from '../../components/appContext';
import {
  Selection,
  OnboardingLayout,
  CustomerSelect,
  useActiveStepStatus,
} from '@sendiradid-internship/tracka-ui';
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
  const { value, setValue, clearSelection } = useApplicationContext();
  useActiveStepStatus(setValue);
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

  const { data, isLoading, isError } = useQuery(
    `${spaces.toString()}-folders`,
    () => {
      if (Array.isArray(spaces)) {
        const promiseArray = spaces.map((space) => fetchFolders(space));
        return Promise.all(promiseArray);
      } else {
        return fetchFolders(spaces);
      }
    }
  );
  if (isLoading) {
    return <Container>loading...</Container>;
  }
  if (isError) {
    return <Container>Error</Container>;
  }

  // console.log('SELECTED SPACES:', selectedSpaces());
  // console.log('DATA:', data);

  return (
    <OnboardingLayout
      title={value.steps[value.activeStep].label}
      description={value.steps[value.activeStep].description}
      activeStep={value.activeStep}
      steps={value.steps}
      setValue={setValue}
      clearSelection={clearSelection}
    >
      <CustomerSelect
        data={data}
        steps={value.steps}
        setValue={setValue}
        activeStep={value.activeStep}
      />
    </OnboardingLayout>
  );
};
export default SelectClients;
