import { OnboardingProcess } from 'apps/tracka/screens/onboardingProcess';
import { createContext, useContext, useState } from 'react';


interface OnboardingProcess {
  activeStep: number;
  team?: string;
  clients?: string[];
  spaces?: string[] | string;
}

type OnboardingKeys = keyof OnboardingProcess;

interface AppContext {
  value?: OnboardingProcess,
  setValue: (property: OnboardingKeys, newValue: any) => void
}

const defaultContext = {
  setValue: (property: OnboardingKeys, newValue: any) => { },
}



const ApplicationContext = createContext<AppContext>(defaultContext);

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplicationContext must be used within a ApplicationContext');
  }
  return context;
}


export const ApplicationProvider = ({ children }) => {
  const [applicationState, setApplicationState] = useState<OnboardingProcess>(null);

  const updateApplicationKey = (property: OnboardingKeys, newValue: any) => {
    setApplicationState({ ...applicationState, [property]: newValue });
  }

  return (
    <ApplicationContext.Provider value={{ value: applicationState, setValue: updateApplicationKey }}>
      {children}
    </ApplicationContext.Provider>
  );

}
