import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CustomerSelection } from '@sendiradid-internship/tracka-ui';
interface Props {
  children?: React.ReactNode;
  parentValue?: boolean;
  onValueSet?: (relativeId: string, value: boolean) => void;
  title: string;
  elementId?: string;
  relativeId: string;
  selection: CustomerSelection;
}

export const CustomAccordion: FC<Props> = ({
  children,
  parentValue = true,
  onValueSet,
  title,
  elementId,
  relativeId,
  selection,
}) => {
  const [value, setValue] = useState(parentValue);
  useEffect(() => {
    parentValue !== undefined && setValue(parentValue);
  }, [parentValue]);

  const isChecked = (relativeId: string) => {
    const [spaceId, folderId, listId] = relativeId.split('#');

    if (listId) {
      return selection[spaceId][folderId][listId];
    } else if (folderId) {
      //check if all lists are checked
      const allListsChecked = Object.keys(selection[spaceId][folderId]).every(
        (list) => selection[spaceId][folderId][list]
      );
      return allListsChecked;
    } else if (!folderId) {
      //check if all lists in all folders are checked
      const allListsChecked = Object.keys(selection[spaceId]).every((folder) =>
        Object.keys(selection[spaceId][folder]).every(
          (list) => selection[spaceId][folder][list]
        )
      );
      return allListsChecked;
    } else {
      return false;
    }
  };

  const isIndeterminate = (relativeId: string) => {
    const [spaceId, folderId] = relativeId.split('#');
    //if there is a folderId check if all or none lists are checked in the folder
    if (folderId) {
      const allListsChecked = Object.keys(selection[spaceId][folderId]).every(
        (list) => selection[spaceId][folderId][list]
      );
      const noneListsChecked = Object.keys(selection[spaceId][folderId]).every(
        (list) => !selection[spaceId][folderId][list]
      );
      return !allListsChecked && !noneListsChecked;
    } else if (!folderId) {
      //check if all or none lists are checked in all folders
      const allListsChecked = Object.keys(selection[spaceId]).every((folder) =>
        Object.keys(selection[spaceId][folder]).every(
          (list) => selection[spaceId][folder][list]
        )
      );
      const noneListsChecked = Object.keys(selection[spaceId]).every((folder) =>
        Object.keys(selection[spaceId][folder]).every(
          (list) => !selection[spaceId][folder][list]
        )
      );
      return !allListsChecked && !noneListsChecked;
    } else {
      return false;
    }
  };

  const [expanded, setExpanded] = React.useState<string | false>(relativeId);
  const handlePanelExpand =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleCheckboxChange = (newValue: boolean) => {
    setValue(newValue);
    onValueSet && onValueSet(relativeId, newValue);
  };
  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        parentValue: value,
      });
    }
    return child;
  });

  if (children) {
    return (
      <Accordion
        expanded={expanded === relativeId}
        onChange={handlePanelExpand(relativeId)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography sx={{ flexGrow: 1, alignSelf: 'center' }}>
            {title}
          </Typography>
          <Checkbox
            color="default"
            size="small"
            checked={isChecked(relativeId)}
            indeterminate={isIndeterminate(relativeId)}
            onClick={(e) => {
              e.stopPropagation();
              handleCheckboxChange(!value);
            }}
          />
        </AccordionSummary>
        <AccordionDetails>{childrenWithProps}</AccordionDetails>
      </Accordion>
    );
  } else {
    return (
      <Accordion>
        <AccordionDetails sx={{ display: 'flex' }}>
          <Typography sx={{ flexGrow: 1, alignSelf: 'center' }}>
            {title}
          </Typography>
          <Checkbox
            color="default"
            size="small"
            checked={isChecked(relativeId)}
            id={elementId}
            onClick={(e) => {
              e.stopPropagation();
              handleCheckboxChange(!value);
            }}
          />
        </AccordionDetails>
      </Accordion>
    );
  }
};
