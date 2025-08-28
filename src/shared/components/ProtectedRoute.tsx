import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { selectIsAuth } from '@store/selectors/users';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = selectIsAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
