import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

import { Header } from './shared/components/Header.tsx';
import { NavigationBar } from './shared/components/NavigationBar.tsx';
import { saveUserToStorage, USER_KEY } from './shared/utils/saveUserToStorage.ts';
import { currentUser } from './store/currentUser.ts';
import { ScrollToTop } from '@shared/components/ScrollTop.tsx';

function App() {
  const storageUSer = localStorage.getItem(USER_KEY);
  if (!storageUSer) {
    saveUserToStorage(currentUser);
  }
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
}

export default App;
