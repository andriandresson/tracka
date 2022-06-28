import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
  children?: React.ReactNode;
  parentValue?: boolean;
  onValueSet?: (value: boolean) => void;
  title: string;
  elementId?: string;
}

export const CustomAccordion: FC<Props> = ({
  children,
  parentValue = true,
  onValueSet,
  title,
  elementId,
}) => {
  const [value, setValue] = useState(parentValue);

  useEffect(() => {
    parentValue !== undefined && setValue(parentValue);
  }, [parentValue]);

  const handleCheckboxChange = (newValue: boolean) => {
    setValue(newValue);
    // onValueSet && onValueSet(newValue);
  };
  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        parentValue: value,
        onValueSet: () => {
          handleCheckboxChange(!value);
        },
      });
    }
    return child;
  });

  if (children) {
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ flexGrow: 1 }}>{title}</Typography>
          <Checkbox
            color="default"
            size="small"
            checked={value}
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
          <Typography sx={{ flexGrow: 1 }}>{title}</Typography>
          <Checkbox
            color="default"
            size="small"
            checked={value}
            id={elementId}
            onClick={(e) => {
              e.stopPropagation();
              handleCheckboxChange(!value);
              console.log(e.target);
            }}
          />
        </AccordionDetails>
      </Accordion>
    );
  }
};
