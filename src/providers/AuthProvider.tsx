import jwtDecode from 'jwt-decode';
import React from 'react';
import AuthService from '../utils/api/services/AuthService';

interface AuthContextProps {
  isAuth: boolean
  setIsAuth: (value: boolean) => void,
  username: string,
  addTokenToLocalStorage: (token: string) => void
}

const addTokenToLocalStorage = (token: string) => {
  localStorage.setItem('token', token);
};

const AuthContext = React.createContext<AuthContextProps>({
  isAuth: false,
  setIsAuth: () => console.log('setIsAuth not implemented!'),
  username: '',
  addTokenToLocalStorage: addTokenToLocalStorage,
});

export const useAuthContext = () =>  React.useContext(AuthContext);

export const AuthProvider:React.FC = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>('');

  React.useEffect(()=>{
    const token = localStorage.getItem('token');
    if (!token) return;
    refreshOldToken();
  },[]);

  React.useEffect(()=>{
    if (isAuth) {
      const token = localStorage.getItem('token');
      if (!token) return setIsAuth(false);
      const { nickname } = jwtDecode(token) as any;
      setName(nickname);
    } else if (name) {
      localStorage.removeItem('token');
      setName('');
    }
  },[isAuth]);

  const refreshOldToken = async () => {
    console.log(localStorage.getItem('token'));
    const { data } = await AuthService.refresh();
    console.log(data);
    localStorage.setItem('token', data.access_token);
    setIsAuth(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        username: name,
        setIsAuth,
        addTokenToLocalStorage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
