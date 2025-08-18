import { NavLink } from 'react-router-dom';

import { ROUTES } from '../routers/routes.tsx';

export const NavigationBar = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NavLink to={ROUTES.home}>Посты</NavLink>
      <NavLink to={ROUTES.users}>Пользователи</NavLink>
      <NavLink to={ROUTES.profile}>Профиль</NavLink>
    </div>
  );
};
