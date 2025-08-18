import { MainUser } from '../shared/components/MainUser.tsx';
import { getUserFromStorage } from '../shared/utils/getUserFromStorage.ts';

export const ProfilePage = () => {
  const user = getUserFromStorage();

  return <>{user && <MainUser user={user} />}</>;
};
