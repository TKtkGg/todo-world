import { FC, memo, type ReactNode } from "react"

import { Header } from "../organisms/layout/Header";
import { Outlet } from "react-router-dom";

type Props = {
    //タグで囲ったものを受け取るための型
    children: ReactNode;
}

export const HeaderLayout: FC<Props> = memo((props) => {
    const { children } = props;
    return (
        <>
            <Header />
            {children}
            <Outlet />
        </>
    )
});