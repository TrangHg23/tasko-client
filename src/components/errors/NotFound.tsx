import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import logo from "/logo.webp";

function NotFound() {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGoHome = () => navigate("/");

  return (
    <>
      {/* Background*/}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background: "linear-gradient(to right, #E3F2FD, #1976D2)",
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            borderLeft: `4px solid ${theme.palette.warning.main}`,
            width: "100%",
          }}
        >
          {/* Logo & App name */}
          <Box
            onClick={handleGoHome}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <Box component="img" src={logo} alt="Website Logo" sx={{ height: 48, mr: 1, mb: 1}}
            />
            <Typography variant="h5" fontWeight="bold">
              Tasko
            </Typography>
          </Box>

          <Stack spacing={3} alignItems="center">
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                bgcolor: theme.palette.warning.light,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h3" color="warning.contrastText">
                404
              </Typography>
            </Box>

            <Typography variant="h4" component="h1">
              Page Not Found
            </Typography>

            <Typography variant="body1" color="text.secondary">
              The page you're looking for doesn't exist or has been moved.
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={handleGoHome}
              sx={{
                mt: 2,
                px: 4,
                bgcolor: theme.palette.warning.main,
                "&:hover": {
                  bgcolor: theme.palette.warning.dark,
                },
              }}
            >
              Go to Homepage
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default NotFound;
