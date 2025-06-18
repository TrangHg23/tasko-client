import { useAuth } from "@hooks/useAuth"
import { Box, Button } from "@mui/material"

function Home() {
    const { logoutMutation, logout } = useAuth();

    const handleLogout = async () => {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        if(accessToken && refreshToken) {
            try {
                await logoutMutation.mutateAsync({accessToken,refreshToken});
            }
            catch(e) {
               console.warn("Logout mutation throw caught in catch:", e);
            } finally {
                logout();
            }
        }

        
    }
    return (
        <Box>
            <h1>Home page</h1>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </Box>
    )
}

export default Home