import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const baseTheme = createTheme({
  spacing: 8,

  palette: {
    primary: { main: '#1976D2' },
    secondary: { main: '#607D8B' },
    success: { main: '#4CAF50' },
    warning: { main: '#FF9800' },
    error: { main: '#F44336' },
    background: { default: '#ffff', paper: '#f9fbfd', popup: '#f5f7fa' },
  },

  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: { fontWeight: 700, fontSize: '1.75rem' },
    h2: { fontWeight: 600, fontSize: '1.375rem' },
    h6: { fontWeight: 600, fontSize: '1rem' },
    body1: { fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.4 },
    body2: { fontWeight: 500, fontSize: '0.8125rem' },
    button: { fontWeight: 600, fontSize: '0.8125rem', textTransform: 'none' },
  },
});

let theme = createTheme(baseTheme, {
  components: {
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
          borderRadius: 8,
          padding: baseTheme.spacing(1),
          fontWeight: 400,
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
          marginRight: baseTheme.spacing(0.5),
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: 20,
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          marginLeft: '0.625rem',
          borderRadius: '0.5rem',
          minHeight: 32,
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 24,
          marginRight: 8,
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: 36,
          paddingTop: 6,
          paddingBottom: 6,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
    MuiDatePicker: {
      defaultProps: {
        slotProps: {
          textField: {
            placeholder: 'Date',
            size: 'small',
            fullWidth: true,
          },
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 4],
                },
              },
            ],
            sx: {
              '& .MuiDateCalendar-root': {
                width: 270,
                height: 260,
                fontSize: '0.75rem',
              },
              '& .MuiDayCalendar-day': {
                width: 28,
                height: 28,
                fontSize: '0.75rem',
              },
              '& .MuiPickersCalendarHeader-root': {
                fontSize: '0.75rem',
              },
              '& .MuiSvgIcon-root': {
                fontSize: '1rem',
              },
            },
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
