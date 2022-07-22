import { useState } from 'react';
import {
  Box,
  Container,
  Toolbar,
  Menu,
  IconButton,
  MenuItem,
  Avatar,
  Tabs,
  Tab,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { signOut } from 'next-auth/react';
import MenuIcon from '@mui/icons-material/Menu';
import { useSession } from 'next-auth/react';
import { ExtendedUserSession } from '@sendiradid-internship/tracka-ui';

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // event.preventDefault();
      }}
      {...props}
    />
  );
}
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const DashboardNavbar = ({
  open,
  handleDrawerOpen,
  activeTab,
  setActiveTab,
}: {
  open: boolean;
  handleDrawerOpen: any;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}) => {
  let user;
  const { data } = useSession();
  if (data?.user) {
    user = data.user as ExtendedUserSession;
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            height: 96,
            backgroundColor: 'background.default',
            borderBottom: 'solid 1px #278BFC',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="nav tabs example"
            sx={{ flexGrow: 1 }}
          >
            <LinkTab label="Dashboard" href="/dashboard" />
            <LinkTab label="Calendar" href="/calendar" />
            <LinkTab label="Timesheets" href="/Timesheets" />
          </Tabs>

          {user ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="default"
              >
                <Avatar
                  src={user.profilePicture}
                  sx={{ bgcolor: user.color, color: '#FFF' }}
                >
                  {user.initials}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled onClick={handleClose}>
                  Hello {user.username.split(' ')[0]}
                </MenuItem>
                <MenuItem onClick={() => signOut()}>Logout</MenuItem>
              </Menu>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
