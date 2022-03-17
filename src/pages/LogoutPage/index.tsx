import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../providers/AuthProvider';

export const LogoutPage = () => {
  const authContext = useAuthContext();
  if (authContext.isAuth) {
    authContext.setIsAuth(false);
  }
  return (
    <Navigate to="/auth" />
  );
};
