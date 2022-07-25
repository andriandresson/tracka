import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Typography,
  ListSubheader,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CustomerSelection } from '@sendiradid-internship/tracka-ui';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
  parentValue?: boolean;
  onValueSet?: (relativeId: string, value: boolean) => void;
  title: string;
  elementId?: string;
  relativeId: string;
  selection: CustomerSelection;
  initiallyClosed?: boolean;
  bgColor?: string;
  topLevel?: boolean;
}

export const CustomAccordion: FC<Props> = ({
  children,
  parentValue = true,
  onValueSet,
  title,
  elementId,
  relativeId,
  selection,
  initiallyClosed,
  bgColor,
  topLevel,
}) => {
  const [value, setValue] = useState(parentValue);
  useEffect(() => {
    parentValue !== undefined && setValue(parentValue);
  }, [parentValue]);

  const StickyHeader = styled(ListSubheader)`
    & {
      z-index: 2;
      top: 0;
      padding-left: 0;
      padding-right: 10px;
    }
  `;
  const StickySubHeader = styled(ListSubheader)`
    & {
      z-index: 1;
      top: 60px;
      padding-left: 0;
      padding-right: 0;
    }
  `;

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

  const handleCheckboxChange = (newValue: boolean) => {
    setValue(newValue);
    onValueSet && onValueSet(relativeId, newValue);
  };

  const [expanded, setExpanded] = React.useState<string | false>(relativeId);
  const [initiallyUnexpanded, setInitiallyUnexpanded] =
    React.useState(initiallyClosed);
  const handlePanelExpand =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setInitiallyUnexpanded(undefined);
      setExpanded(isExpanded ? panel : false);
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
        disableGutters
        expanded={initiallyUnexpanded ? false : expanded === relativeId}
        onChange={handlePanelExpand(relativeId)}
      >
        {topLevel ? (
          <StickyHeader sx={{ pt: 0 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: bgColor,
              }}
            >
              <Typography
                variant="body2"
                sx={{ flexGrow: 1, alignSelf: 'center', color: 'common.white' }}
              >
                {title}
              </Typography>
              <Checkbox
                color="default"
                size="small"
                checked={isChecked(relativeId)}
                indeterminate={isIndeterminate(relativeId)}
                indeterminateIcon={<IndeterminateCheckBoxOutlinedIcon />}
                checkedIcon={<CheckBoxOutlinedIcon />}
                icon={<CheckBoxOutlineBlankOutlinedIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheckboxChange(!value);
                }}
              />
            </AccordionSummary>
          </StickyHeader>
        ) : (
          <StickySubHeader>
            <AccordionSummary
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'background.default',
                margin: 0,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  flexGrow: 1,
                  alignSelf: 'center',
                  color: 'common.white',
                  fontWeight: 'bold',
                }}
              >
                {expanded ? (
                  <ArrowDropDownIcon sx={{ color: '#5680AF' }} />
                ) : (
                  <ArrowRightIcon sx={{ color: '#5680AF' }} />
                )}{' '}
                {title}
              </Typography>
              <Checkbox
                color="default"
                size="small"
                checked={isChecked(relativeId)}
                indeterminate={isIndeterminate(relativeId)}
                indeterminateIcon={<IndeterminateCheckBoxOutlinedIcon />}
                checkedIcon={<CheckBoxOutlinedIcon />}
                icon={<CheckBoxOutlineBlankOutlinedIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheckboxChange(!value);
                }}
              />
            </AccordionSummary>
          </StickySubHeader>
        )}
        <AccordionDetails sx={{ p: 0 }}>{childrenWithProps}</AccordionDetails>
      </Accordion>
    );
  } else {
    return (
      <Accordion disableGutters>
        <AccordionDetails
          sx={{
            display: 'flex',
            paddingBlock: 0,
            bgcolor: 'background.paper',
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              flexGrow: 1,
              alignSelf: 'center',
              color: 'common.white',
              letterSpacing: '0.4px',
              fontWeight: 'light',
            }}
          >
            <FiberManualRecordIcon
              sx={{ width: 6, height: 6, color: '#5680AF' }}
            />
            {` `}
            {title}
          </Typography>
          <Checkbox
            color="default"
            size="small"
            checked={isChecked(relativeId)}
            indeterminateIcon={<IndeterminateCheckBoxOutlinedIcon />}
            checkedIcon={<CheckBoxOutlinedIcon />}
            icon={<CheckBoxOutlineBlankOutlinedIcon />}
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
