import { Button, Drawer, Portal } from "@chakra-ui/react";
import { FC, memo } from "react"

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    onClickHome: () => void;
    onClickUserManagement: () => void;
    onClickSetting: () => void;
}

export const MenuDrawer: FC<Props> = memo((props) => {
    const { open, setOpen, onClickHome, onClickSetting, onClickUserManagement } = props;
  return (
    <Drawer.Root
        placement="start"
        size="xs"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
    >
        <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
                <Drawer.Content>
                    <Drawer.Body p={0} bg="gray.100">
                        <Button w="100%" onClick={onClickHome}>TOP</Button>
                        <Button w="100%" onClick={onClickUserManagement}>ユーザー一覧</Button>
                        <Button w="100%" onClick={onClickSetting}>設定</Button>
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Positioner>
        </Portal>
    </Drawer.Root>
  )
});