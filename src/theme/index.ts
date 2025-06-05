import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  spacing: 8,

  palette: {
    primary: { main: '#1976D2' },
    secondary: { main: '#4CAF50' },
    warning: { main: '#FF9800' },
    background: { default: '#F5F5F5', paper: '#FFFFFF' },
    text: { primary: '#424242' },
  },

  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: { fontWeight: 700, fontSize: '2rem' },
    h2: { fontWeight: 600, fontSize: '1.5rem' },
    body1: { fontWeight: 400, fontSize: '1rem', lineHeight: 1.5 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
});

const theme = createTheme(baseTheme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: baseTheme.spacing(1, 3),
          fontWeight: 600,
          textTransform: 'none',
          minWidth: 120,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.5)',
          },
        },
        outlined: {
          borderRadius: 20,
          padding: baseTheme.spacing(1, 3),
        },
        text: {
          borderRadius: 20,
          padding: baseTheme.spacing(1, 2),
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: baseTheme.palette.primary.main,
          color: baseTheme.palette.getContrastText(baseTheme.palette.primary.main),
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: baseTheme.spacing(1.5),
          fontWeight: 500,
          alignItems: 'center',
        },
        standardSuccess: {
          backgroundColor: '#E6F4EA',
          color: '#2E7D32',
        },
        standardError: {
          backgroundColor: '#FDECEA',
          color: '#D32F2F',
        },
        icon: {
          marginRight: baseTheme.spacing(1),
        },
      },
    },
  },
});

export default theme;
