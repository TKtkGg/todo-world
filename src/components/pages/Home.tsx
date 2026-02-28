import { FC, memo, useEffect, useState } from "react"
import { fetchMe, type MeResponse } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export const Home: FC = memo(() => {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if(!accessToken) {
      navigate("/accounts/login");
      return;
    }

    const run = async () => {
      try{
        const me = await fetchMe(accessToken);
        setUser(me);
      } catch(error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setErrorMessage("ログイン状態が無効になりました。再度ログインしてください。")
        navigate("/accounts/login");
      } finally{
        setIsLoading(false);
      }
    };

    run();
  }, [navigate]);

  if(isLoading) {
    return <div>読み込み中...</div>;
  }

  if(errorMessage) {
    return <div style={{ color: "red" }}>{errorMessage}</div>
  }

    return (
      <div>
        <h1>Home</h1>
        {user && <p>ようこそ、{user.username}</p>}
      </div>
    );
  });
  
  

  