import { createContext, useContext, useState } from 'react';
import { Step, Selection } from '@sendiradid-internship/tracka-ui';

interface OnboardingProcess {
  steps: Step[];
  activeStep: number;
  team?: string;
  clients?: string[];
  spaces?: string[] | string;
}

type OnboardingKeys = keyof OnboardingProcess;

interface AppContext {
  value?: OnboardingProcess;
  setValue: (property: OnboardingKeys, newValue: any) => void;
  selectTeam: (team: any) => void;
}

const defaultContext = {
  setValue: (property: OnboardingKeys, newValue: any) => null,
  selectTeam: (team: any) => null,
};

const ApplicationContext = createContext<AppContext>(defaultContext);

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      'useApplicationContext must be used within a ApplicationContext'
    );
  }
  return context;
};

export const ApplicationProvider = ({ children }) => {
  const initialValue = {
    activeStep: 0,
    steps: [
      {
        label: 'Select team',
        description: ' Pick your default workspace team, you only select one.',
      },
      {
        label: 'Select space',
        description: 'Only select the space you need access to.',
      },
      {
        label: 'Map customer type',
        description:
          'There are 2 different types of customers, external customers and internal customer.',
      },
      {
        label: 'Review',
      },
    ],
  };
  const [applicationState, setApplicationState] =
    useState<OnboardingProcess>(initialValue);

  const updateApplicationKey = (property: OnboardingKeys, newValue: any) => {
    setApplicationState({ ...applicationState, [property]: newValue });
  };

  const selectTeam = (element: any) => {
    console.log(element.id);
    const newSteps = [...applicationState.steps];
    const selectedTeam: Selection = {
      id: element.id,
      name: element.name,
    };
    newSteps[applicationState.activeStep].selected = selectedTeam;
    setApplicationState({ ...applicationState, steps: newSteps });
  };

  return (
    <ApplicationContext.Provider
      value={{
        value: applicationState,
        setValue: updateApplicationKey,
        selectTeam,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
