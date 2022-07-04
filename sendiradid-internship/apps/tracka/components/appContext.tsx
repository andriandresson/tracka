import { createContext, useContext, useState } from 'react';
import { Step, Selection } from '@sendiradid-internship/tracka-ui';

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
  clearSelection: (activeStep: number) => void;
}

const defaultContext = {
  setValue: (property: OnboardingKeys, newValue: any) => null,
  selectTeam: (team: any) => null,
  selectSpaces: (space: any) => null,
  selectInternalSpaces: (space: any) => null,
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
    steps: [
      {
        label: 'Select team',
        description: ' Pick your default workspace team, you only select one.',
      },
      {
        label: 'Select external space(s)',
        description: 'Only select the space you need access to.',
        selected: [],
      },
      {
        label: 'Select external customer(s)',
        description:
          'There are 2 different types of customers, external customers and internal customer.',
      },
      {
        label: 'Select internal space(s)',
        description: 'Only select the space you need access to.',
        selected: [],
      },
      {
        label: 'Select internal task(s)',
        description: `Select internal non-billable tasks you need access to.`,
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
    const newSteps = [...applicationState.steps];
    const selectedTeam: Selection = {
      id: element.id,
      name: element.name,
    };
    newSteps[applicationState.activeStep].selected = selectedTeam;
    setApplicationState({ ...applicationState, steps: newSteps });
  };

  const selectSpaces = (element: any) => {
    const newSteps = [...applicationState.steps];
    const selectedSpaces: Selection = {
      id: element.id,
      name: element.name,
    };

    if (
      Array.isArray(applicationState.steps[1].selected) &&
      Array.isArray(newSteps[1].selected)
    ) {
      const index = applicationState.steps[1].selected.findIndex(
        (element) => element.id === selectedSpaces.id
      );
      if (index === -1) {
        newSteps[1].selected.push(selectedSpaces);
      } else {
        newSteps[1].selected.splice(index, 1);
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
      if (index === -1) {
        newSteps[3].selected.push(selectedSpaces);
      } else {
        newSteps[3].selected.splice(index, 1);
      }
    }
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
        selectSpaces,
        selectInternalSpaces,
        clearSelection,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
