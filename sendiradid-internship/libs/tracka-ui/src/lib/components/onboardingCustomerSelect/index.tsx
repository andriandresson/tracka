import { FC, useState } from 'react';
import { Step, CustomAccordion } from '@sendiradid-internship/tracka-ui';
import { Card } from '@mui/material';

interface Props {
  data: any;
  steps: Step[];
  setValue: (property: string, newValue: any) => void;
  clearSelection: (activeStep: number) => void;
  activeStep: number;
}

export const CustomerSelect: FC<Props> = ({
  data,
  steps,
  setValue,
  clearSelection,
  activeStep,
}) => {
  function handleCheck(e: any) {
    e.stopPropagation();
    console.log(e.target);
  }
  const spaces = data.map((element: any) => {
    return element.folders;
  });
  console.log('spaces Array:', spaces);

  return (
    <Card variant="outlined">
      {spaces.map((space: any) => {
        if (space[0]) {
          return (
            <CustomAccordion title={space[0]?.space?.name}>
              {space.map((folder: any) => {
                if (folder.lists[0]) {
                  return (
                    <CustomAccordion title={folder.name}>
                      {folder.lists.map((list: any) => {
                        if (list) {
                          return (
                            <CustomAccordion
                              title={list.name}
                              elementId={list.id}
                            />
                          );
                        } else {
                          return null;
                        }
                      })}
                    </CustomAccordion>
                  );
                } else {
                  return null;
                }
              })}
            </CustomAccordion>
          );
        } else {
          return null;
        }
      })}
    </Card>
  );
};
