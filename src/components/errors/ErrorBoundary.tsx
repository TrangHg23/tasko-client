import { useRouteError } from "react-router";
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Stack,
  useTheme,
} from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";
import logo from "/logo.webp";

const ErrorBoundary = () => {
  const error = useRouteError() as Error | undefined;
  const theme = useTheme();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      {/* Background */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background: "linear-gradient(to right, #E3F2FD, #1976D2)",
        }}
      />

      {/* Main UI */}
      <Container
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            borderLeft: `4px solid ${theme.palette.error.main}`,
          }}
        >
          {/* Logo + App Name */}
          <Box
            component="a"
            href="/"
            sx={{ display: "flex", alignItems: "center", mb: 2, textDecoration: "none", color: "inherit"}}
          >
            <Box component="img" src={logo} alt="Website Logo" sx={{ height: 48, mr: 1, mb: 1}}/>
            <Typography variant="h5" fontWeight="bold">
              Tasko
            </Typography>
          </Box>

          <Stack spacing={3} alignItems="center">
            <WarningIcon color="error" sx={{ fontSize: 60 }} />

            <Typography variant="h4" component="h1" color="error">
              Oops! Something went wrong
            </Typography>

            <Box
              sx={{
                p: 2,
                backgroundColor: theme.palette.grey[100],
                borderRadius: 1,
                textAlign: "left",
                fontFamily: "monospace",
                maxHeight: "200px",
                overflow: "auto",
                whiteSpace: "pre-wrap",
              }}
            >
              <Typography variant="body1">
                {error?.message || "An unexpected error occurred."}
              </Typography>
              {error?.stack && (
                <Typography variant="caption" component="pre">
                  {error.stack}
                </Typography>
              )}
            </Box>

            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleRefresh} color="error">
                Refresh Page
              </Button>
              <Button variant="outlined" href="/" color="error">
                Go to Home
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default ErrorBoundary;
