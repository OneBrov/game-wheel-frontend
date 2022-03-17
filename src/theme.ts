import { createTheme } from '@mui/material/styles';
import { green, red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2CB67D',
     
    },
    secondary: {
      main: '#94A1B2',
    },
    error: {
      main: red.A400,
    },
    success: {
      main: green.A400,
    },
  },
});

export default theme;
