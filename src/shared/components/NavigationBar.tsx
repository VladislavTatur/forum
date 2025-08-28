import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '@shared/constants/links.ts';
import { selectIsAuth } from '@store/selectors/users.ts';

export const NavigationBar = () => {
  const isAuth = selectIsAuth();

  const navRoutes = [
    ...(isAuth ? [{ name: 'Profile', url: ROUTES.profile }] : []),
    { name: 'Posts', url: ROUTES.posts },
    { name: 'Users', url: ROUTES.users },
  ];

  return (
    <Stack width={200} p={1.25} sx={{ position: 'sticky', top: 95 }} spacing={1}>
      {navRoutes.map((route) => (
        <Box
          key={route.name}
          component={NavLink}
          to={route.url}
          style={({ isActive }) => ({
            padding: '8px 16px',
            textDecoration: 'none',
            color: isActive ? '#000' : '#555',
            fontWeight: isActive ? 700 : 500,
            borderLeft: isActive ? '4px solid #1976d2' : '4px solid transparent',
            backgroundColor: isActive ? '#f0f0f0' : 'transparent',
            borderRadius: 4,
          })}
        >
          {route.name}
        </Box>
      ))}
    </Stack>
  );
};
