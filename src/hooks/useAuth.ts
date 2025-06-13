import AuthContext from "@contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "src/services/auth";

export const useAuth = () =>  {
    const context = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    if(!context) throw new Error('useAuth must be used within an AuthProvider')
        
    const registerMutation = useMutation({
        mutationFn: authAPI.register,
        onSuccess: (data) => {
            console.log(data);
            enqueueSnackbar('Sign up successfully!', {variant: 'success'});
            navigate('/login')
        },
         onError: () => {
            enqueueSnackbar('Something went wrong, please try again', {variant: 'error'});
        }
    });

    return {
        context,
        registerMutation
    };

}