import { 
  Box, 
  Button, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  TextField, 
  Typography 
} from '@mui/material';
import React from 'react';
import { DarkBackground } from '../../components/DarkBackground';
import { SwitchableTabs } from '../../components/SwitchableTabs';
import { useAuthContext } from '../../providers/AuthProvider';
import AuthService from '../../utils/api/services/AuthService';

interface TemplateAuthProps  {
    isRegistration: boolean
}

export const TemplateAuth:React.FC<TemplateAuthProps> = ({
  isRegistration
}) => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [successMessage, setSuccessMessage] = React.useState<string>('');
  const type = isRegistration ? 'registration': 'auth';

  const authContext = useAuthContext();

  const commit = async () => {
    try {
      setErrorMessage('');
      setSuccessMessage('');

      const { data } = isRegistration 
        ? await AuthService.registration(username, password)
        : await AuthService.login(username, password);

      const access_token = data.access_token;

      authContext.addTokenToLocalStorage(access_token);
      authContext.setIsAuth(true);
      
      setSuccessMessage(
        isRegistration 
          ? 'Вы успешно зарегистрированы' 
          : 'Вы успешно авторизированы'
      );
    } catch (e: any) {
      setErrorMessage(e?.response?.data.message || 'Сервер не отвечает!' );
    }
  };

  return (
    <Box 
      sx={{ 'p': 1, }} 
    >
      <DialogTitle> {isRegistration ? 'Регистрация' : 'Авторизация'} </DialogTitle>
      <DialogContent sx={{ minHeight: 250 }} >
        <DialogContentText>
          { isRegistration 
            ? 'Если у вас нет аккаунта, то вы можете зарегистрироваться здесь' 
            : 'Если у вас уже есть аккаунт, вы можете авторизироваться'
          }
        </DialogContentText>
        <TextField
          autoFocus={!isRegistration}
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
          margin="dense"
          id={`${type}-name`}
          label="Ваш логин"
          type="text"
          fullWidth
          variant="standard"
        />
        
        <TextField
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          margin="dense"
          id={`${type}-password`}
          label="Ваш пароль"
          type="password"
          fullWidth
          variant="standard"
        />
        <DialogContentText color={'error'}>{errorMessage}</DialogContentText>
        <DialogContentText color={'success.main'}>{successMessage} </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={commit}> 
          { isRegistration 
            ? 'Зарегистрироваться' 
            : 'Авторизироваться'
          }
        </Button>
      </DialogActions>
    </Box>
  );
};

const Registration = () => {
  return (
    <TemplateAuth 
      isRegistration
    />
  );
};

const Login = () => {
  return (
    <TemplateAuth 
      isRegistration={false}
    />
  );
};

export const AuthPage = () => {
  return (
    <Box sx={{
      display:'flex',
      flexDirection: 'column',
      flex: '1 1'
    }}>
      <Typography variant='h4'>
        Авторизация
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
        alignItems: 'center'
      }} >
        <Box sx={{
          width: '500px'
        }}>
          <DarkBackground>
            <Box sx={{
              p: 2,
            
            }}>
              <SwitchableTabs tabs={[
                { name: 'Авторизация', content: <Login /> },
                { name: 'Регистрация', content: <Registration /> },
              ]}
              />
            </Box>
      
          </DarkBackground>
        </Box>
      </Box>
    </Box>
  );
};
