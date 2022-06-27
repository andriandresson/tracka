import React from 'react';
import { FC, useState } from 'react';
import { Step, Selection } from '@sendiradid-internship/tracka-ui';
import {
  Card,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const spaces = data.map((element: any) => {
    return element.folders;
  });
  console.log('data:', data[0]?.folders);
  console.log('spaces Array:', spaces);
  console.log('spaces:', spaces[0][0]);
  spaces.map((element: any) => {
    console.log('element:', element);
  });

  return (
    <Card variant="outlined">
      HELLO!
      {spaces.map((element: any) => {
        console.log('element name:', element[0]?.space?.name);
        if (element[0]) {
          return (
            <Accordion key={element[0]?.space?.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography>{element[0]?.space?.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {element.map((folder: any) => {
                  console.log('folder:', folder);
                  return (
                    <Accordion key={folder.id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography>{folder.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {folder.lists.map((list: any) => {
                          return (
                            <Accordion key={list.id}>
                              <AccordionDetails>
                                <Typography>{list.name}</Typography>
                              </AccordionDetails>
                            </Accordion>
                          );
                        })}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          );
        } else {
          return null;
        }
      })}
    </Card>
  );
};
