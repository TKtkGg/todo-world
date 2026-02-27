import { IconButton } from "@chakra-ui/react";
import { FC, memo } from "react"
import { FaBars } from "react-icons/fa";

type Props = {
    setOpen: (open: boolean) => void;
}

export const MenuIconButton: FC<Props> = memo((props) => {
    const { setOpen } = props;
  return (
    <IconButton 
        aria-label="メニューボタン" 
        onClick={() => setOpen(true)}
        display={{ md: "none" }}>
        <FaBars />
    </IconButton>
  )
});