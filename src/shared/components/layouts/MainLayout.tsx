import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

import { Header } from '@shared/components/Header.tsx';
import { NavigationBar } from '@shared/components/NavigationBar.tsx';
import { ScrollToTop } from '@shared/components/ScrollTop.tsx';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <NavigationBar />
        <Box sx={{ flex: 1, p: 2 }}>
          <ScrollToTop />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
