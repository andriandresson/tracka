import { useState } from 'react';
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Menu,
  IconButton,
  MenuItem,
  Avatar,
} from '@mui/material';
import Image from 'next/image';
import Logo from './Logo.svg';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { ExtendedUserSession } from '@sendiradid-internship/tracka-ui';

export const Navbar = () => {
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            height: 96,
            backgroundColor: 'background.default',
            borderBottom: 'solid 1px #278BFC',
          }}
        >
          <Container sx={{ flexGrow: 1, ml: 0, mt: 1 }}>
            <Image src={Logo} alt="Tracka Logo" height="35" width="35" />
          </Container>

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
          ) : (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="default"
              >
                <Avatar />
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={() => signOut()}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
