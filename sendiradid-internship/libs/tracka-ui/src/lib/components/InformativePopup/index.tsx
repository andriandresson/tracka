import * as React from 'react';
import { FC } from 'react';
import {
  Typography,
  Box,
  Button,
  Container,
  Modal,
  IconButton,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

const style = {
  position: 'absolute',
  top: '20%',
  left: '25% ',

  width: 875,
  height: 440,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  pl: 14,
  pt: 7.5,

  color: 'white',
  bgcolor: '#0C1B2C',
  border: '1px solid #278BFC',
  borderRadius: '8px',
  boxShadow: 24,
};

export const InformativePopup: FC = ({}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton>
        <HelpIcon fontSize="small" onClick={handleOpen}></HelpIcon>
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h2" sx={{ pb: 5 }}>
            Welcome to the Tracka Application
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, width: 644 }}>
            You are now starting your <strong> onboarding process </strong>. The
            process has six steps, where the last step is a review of your
            selections. All the selections made will be displayed on your
            Dashboard after you complete the onboarding process.
            <br /> <br />
            <strong> Please note </strong> that the onboarding process is done
            only at the first time you are logging to the application. You can
            view and specify different time periods of all the selections later
            on your Dashboard.
            <br /> <br />
            Use <strong>BACK</strong> and <strong>CONTINUE</strong> buttons for
            moving in between steps.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
