import { FC, memo } from "react"
import { useAuth } from "../../contexts/AuthContent";

export const Home: FC = memo(() => {
  const { user, isLoading } = useAuth();

  if(isLoading) {
    return <div>読み込み中...</div>;
  }

    return (
      <div>
        <h1>Home</h1>
        {user && <p>ようこそ、{user.username}</p>}
      </div>
    );
  });
  
  

  