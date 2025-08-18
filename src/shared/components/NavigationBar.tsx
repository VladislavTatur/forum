import { NavLink } from 'react-router-dom';

import { ROUTES } from '../routers/routes.tsx';

export const NavigationBar = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NavLink to={ROUTES.home}>Posts</NavLink>
      <NavLink to={ROUTES.users}>Users</NavLink>
      <NavLink to={ROUTES.profile}>Profile</NavLink>
    </div>
  );
};
