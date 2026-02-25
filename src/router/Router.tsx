import { memo, type FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components/pages/Login";
import { homeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";

export const Router: FC = memo(() => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home">
            {homeRoutes.map((route) => (
                <Route key={route.path} {...route} />
            ))}
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  )
});