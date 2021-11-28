import { useEffect } from "react";
import { useHistory } from "react-router";

export const useStartup = () => {
    const displayName = localStorage.getItem("display_name");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const history = useHistory();
    useEffect(() => {
        if(!displayName || !userId || !token) {
            localStorage.clear();
            history.replace('/welcome');
        }else {
            history.replace('/dashboard');
        }
    }, [displayName, userId, token, history])
} 