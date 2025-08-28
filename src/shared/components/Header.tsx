import { useEffect, useState } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink, useNavigate } from 'react-router-dom';

import { ConfirmLogoutModal } from '@features/users/components/ConfirmLogoutModal.tsx';
import { ROUTES } from '@shared/constants/links.ts';
import { getUserFromStorage } from '@shared/utils/getUserFromStorage.ts';
import { selectCurrentUser, selectIsAuth } from '@store/selectors/users.ts';
import { logout, setCurrentUser } from '@store/slices/users/usersSlice.ts';
import { useAppDispatch } from '@store/store.ts';

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const localUser = getUserFromStorage();
  const currentUser = selectCurrentUser();
  const isAuth = selectIsAuth();

  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      dispatch(setCurrentUser(localUser));
    }
  }, [currentUser, dispatch, localUser]);

  const handleLogout = () => {
    dispatch(logout());
    setLogoutOpen(false);
    navigate(ROUTES.login);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ mb: 3, backgroundColor: '#fff' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            component={NavLink}
            to={ROUTES.posts}
            sx={{ textDecoration: 'none', color: '#1976d2' }}
          >
            <Typography variant="h5" sx={{ '&:hover': { color: '#1565c0' } }}>
              FORUM
            </Typography>
          </Box>

          {isAuth ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                component={NavLink}
                to={ROUTES.profile}
                sx={{ textDecoration: 'none', color: '#1976d2' }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h5" sx={{ '&:hover': { color: '#1565c0' } }}>
                    {currentUser?.name}
                  </Typography>
                  <AccountCircleIcon sx={{ fontSize: 35 }} />
                </Stack>
              </Box>

              <IconButton
                color="inherit"
                onClick={() => setLogoutOpen(true)}
                sx={{ ml: 1, color: '#000' }}
              >
                <LogoutIcon />
              </IconButton>
            </Stack>
          ) : (
            <Button component={NavLink} to={ROUTES.login} variant="outlined" color="primary">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <ConfirmLogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};
