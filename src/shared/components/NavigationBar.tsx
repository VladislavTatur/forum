import { Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../routers/routes.tsx';

const linkStyle = {
  padding: '10px 15px',
  textDecoration: 'none',
  color: '#555',
  fontWeight: 500,
  borderLeft: '4px solid transparent',
  marginBottom: '5px',
};

const activeLinkStyle = {
  ...linkStyle,
  color: '#000',
  fontWeight: 700,
  borderLeft: '4px solid #1976d2',
  backgroundColor: '#f0f0f0',
};

export const NavigationBar = () => {
  return (
    <Stack
      width={200}
      p={1.25}
      sx={{
        position: 'sticky',
        top: 95,
      }}
    >
      <NavLink
        to={ROUTES.profile}
        style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
      >
        Profile
      </NavLink>
      <NavLink to={ROUTES.home} style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
        Posts
      </NavLink>
      <NavLink to={ROUTES.users} style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
        Users
      </NavLink>
    </Stack>
  );
};
