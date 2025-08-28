import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

import { Header } from '@shared/components/Header.tsx';

export const AuthLayout = () => {
  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1, p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
