import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../routers/routes.tsx';

export const Header = () => {
  return (
    <AppBar position="sticky" sx={{ mb: '30px', backgroundColor: 'white' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <NavLink to={ROUTES.home}>
          <Typography variant="h5">FORUM</Typography>
        </NavLink>
        <NavLink to={ROUTES.profile}>
          <AccountCircleIcon sx={{ width: '35px', height: '35px' }} />
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};
