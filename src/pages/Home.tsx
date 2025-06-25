import { useAuth } from "@hooks/auth/useAuth"
import { Box, Button } from "@mui/material"
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { getAccessToken, getRefreshToken } from "src/utils/token";

function Home() {
    const { logoutMutation } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();

        if(accessToken && refreshToken) {
            try {
                await logoutMutation.mutateAsync({accessToken,refreshToken});
                enqueueSnackbar('Logout successfully!', { variant: 'success' });
            }
            catch(e) {
                console.warn("Logout mutation throw caught in catch:", e);
            }
        }
        navigate("/auth/login")

        
    }
    return (
        <Box>
            <h1>Home page</h1>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </Box>
    )
}

export default Home