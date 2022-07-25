import { useState, FC, ReactNode } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {
  Avatar,
  Container,
  Box,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItemButton,
  ListItemText,
  ListItem,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useSession } from 'next-auth/react';
import { ExtendedUserSession } from '@sendiradid-internship/tracka-ui';
import Logo from './Logo.svg';
import Image from 'next/image';
import { DashboardNavbar } from '@sendiradid-internship/tracka-ui';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '96px',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Container sx={{ mt: 30 }}>{children}</Container>}
    </div>
  );
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface Props {
  children?: ReactNode;
}

export const DashboardLayout: FC<Props> = ({ children }) => {
  let user;
  const { data } = useSession();
  if (data?.user) {
    user = data.user as ExtendedUserSession;
  }

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const colors = ['#5EAFB8', '#DB628B', '#877CD5', '#5CC3A7'];
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DashboardNavbar
        open={open}
        handleDrawerOpen={() => handleDrawerOpen()}
        activeTab={activeTab}
        setActiveTab={(newActiveTab) => setActiveTab(newActiveTab)}
      />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Image src={Logo} />
          <Typography variant="h6" sx={{ flexGrow: '1' }}>
            Tracka
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard', 'Customers', 'Internals', 'Employees'].map(
            (text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <Avatar
                    variant="square"
                    sx={{
                      bgcolor: colors[index],
                      color: 'white',
                      width: '28px',
                      height: '28px',
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {text[0]}
                  </Avatar>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <TabPanel value={activeTab} index={0}>
          {children}
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          // Calendar //
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          // Timesheet //
        </TabPanel>
      </Box>
    </Box>
  );
};
