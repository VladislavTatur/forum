import { Outlet } from 'react-router-dom';

import { Header } from './shared/components/Header.tsx';
import { NavigationBar } from './shared/components/NavigationBar.tsx';
import { saveUserToStorage, USER_KEY } from './shared/utils/saveUserToStorage.ts';
import { currentUser } from './store/currentUser.ts';

function App() {
  const storageUSer = localStorage.getItem(USER_KEY);
  if (!storageUSer) {
    saveUserToStorage(currentUser);
  }

  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <NavigationBar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
