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
    <div style={{ display: 'flex', flexDirection: 'column', width: '200px', padding: '10px' }}>
      <NavLink
        to={ROUTES.profile}
        style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
      >
        Профиль
      </NavLink>
      <NavLink to={ROUTES.home} style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
        Посты
      </NavLink>
      <NavLink to={ROUTES.users} style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
        Пользователи
      </NavLink>
    </div>
  );
};
