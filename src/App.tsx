import { Suspense, useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';

import { router } from './shared/routers/routes.tsx';
import { saveUserToStorage, USER_KEY } from './shared/utils/saveUserToStorage.ts';
import { currentUser } from './store/currentUser.ts';
import { globalStyles } from '@shared/styles/globalStyles.tsx';

function App() {
  const storageUser = localStorage.getItem(USER_KEY);

  useEffect(() => {
    if (!storageUser) {
      saveUserToStorage(currentUser);
    }
  }, [storageUser]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {globalStyles}
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
