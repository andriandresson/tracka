import { createContext, useContext, useState } from 'react';
import {
  Step,
  Selection,
  isStepWithSelectionArray,
} from '@sendiradid-internship/tracka-ui';

interface OnboardingProcess {
  isOnboard: boolean;
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
  selectSpaces: (space: any) => void;
  selectInternalSpaces: (space: any) => void;
  selectLists: (list: any) => void;
  clearSelection: (activeStep: number) => void;
}

const defaultContext = {
  setValue: (property: OnboardingKeys, newValue: any) => null,
  selectTeam: (team: any) => null,
  selectSpaces: (space: any) => null,
  selectInternalSpaces: (space: any) => null,
  selectLists: (list: any) => null,
  clearSelection: (activeStep: number) => null,
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
    isOnboard: false,
    activeStep: 0,
    goals: [],
    steps: [
      {
        label: 'Select team',
        description: 'Choose your default workspace team, you only select one.',
      },
      {
        label: 'Select spaces for customers',
        description: 'Choose your space(s) to acess data about customers.',
        selected: [],
      },
      {
        label: 'Select costumers',
        description: 'You can pick any amount of customers.',
      },
      {
        label: 'Select spaces for internal tasks',
        description: 'Choose your space(s) to acess data about internal tasks.',
        selected: [],
      },
      {
        label: 'Select internal tasks',
        description: `You can pick any amount of internal tasks.`,
      },
    ],
  };
  const [applicationState, setApplicationState] = useState<OnboardingProcess>(
    initialValue as OnboardingProcess
  );

  const updateApplicationKey = (property: OnboardingKeys, newValue: any) => {
    setApplicationState({ ...applicationState, [property]: newValue });
  };

  const selectTeam = (element: any) => {
    const newSteps = [...applicationState.steps];
    const selectedTeam: Selection = {
      id: element.id,
      name: element.name,
    };
    newSteps[applicationState.activeStep].selected = selectedTeam;
    setApplicationState({ ...applicationState, steps: newSteps });
  };

  const selectCustomerSpaces = (element: any) => {
    const newSteps = [...applicationState.steps];
    const selectedSpaces = {
      id: element.id,
      name: element.name,
    } as Selection;

    if (
      Array.isArray(applicationState.steps[1].selected) &&
      Array.isArray(newSteps[1].selected)
    ) {
      const index = applicationState.steps[1].selected.findIndex(
        (element) => element.id === selectedSpaces.id
      );

      if (isStepWithSelectionArray(newSteps[1])) {
        if (index === -1) {
          newSteps[1].selected.push(selectedSpaces);
        } else {
          newSteps[1].selected.splice(index, 1);
        }
      }
    }

    setApplicationState({ ...applicationState, steps: newSteps });
  };
  const selectInternalSpaces = (element: any) => {
    const newSteps = [...applicationState.steps];
    const selectedSpaces: Selection = {
      id: element.id,
      name: element.name,
    };

    if (
      Array.isArray(applicationState.steps[3].selected) &&
      Array.isArray(newSteps[3].selected)
    ) {
      const index = applicationState.steps[3].selected.findIndex(
        (element) => element.id === selectedSpaces.id
      );
      if (isStepWithSelectionArray(newSteps[3])) {
        if (index === -1) {
          newSteps[3].selected.push(selectedSpaces);
        } else {
          newSteps[3].selected.splice(index, 1);
        }
      }
    }
    setApplicationState({ ...applicationState, steps: newSteps });
  };

  const selectLists = (lists: any) => {
    const { activeStep } = applicationState;
    const newSteps = [...applicationState.steps];
    newSteps[activeStep].selected = [...lists];
    setApplicationState({ ...applicationState, steps: newSteps });
  };

  const clearSelection = (activeStep: number) => {
    const newSteps = [...applicationState.steps];
    newSteps[activeStep].selected = [];
    setApplicationState({ ...applicationState, steps: newSteps });
  };

  return (
    <ApplicationContext.Provider
      value={{
        value: applicationState,
        setValue: updateApplicationKey,
        selectTeam,
        selectSpaces: selectCustomerSpaces,
        selectInternalSpaces,
        selectLists,
        clearSelection,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
