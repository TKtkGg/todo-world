import { useEffect, type ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContent";
import { useNavigate } from "react-router-dom";
import { fetchMe } from "../../api/auth";

type Props = { children: ReactNode};

export function ProtectedRoute({ children }: Props) {
    const { setUser, setIsLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if(!accessToken){
            navigate("/accounts/login");
            setIsLoading(false);
            return;
        }

        const run = async () => {
            try{
                const me = await fetchMe(accessToken);
                setUser(me);
            } catch {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate("/accounts/login");
            } finally {
                setIsLoading(false);
            }
        };
        run();
    }, [navigate, setUser, setIsLoading]);
    return <>{children}</>;
}