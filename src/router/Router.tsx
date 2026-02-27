import { memo, type FC } from "react";
import { Route, Routes } from "react-router-dom";
import { homeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { accountsRoutes } from "./AccountsRoutes";
import { AuthTop } from "../components/pages/AuthTop";

export const Router: FC = memo(() => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthTop />} />
        <Route path="/accounts">
          {accountsRoutes.map((route) => (
            <Route key={route.path} {...route}/>
          ))}
        </Route>
        {/* Routesの中にはRoute以外を置けないため、elementをHeaderLayoutにする必要がある */}
        <Route path="/home" element={<HeaderLayout><></></HeaderLayout>}>
            {homeRoutes.map((route) => (
                <Route key={route.path} {...route} />
            ))}
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  )
});