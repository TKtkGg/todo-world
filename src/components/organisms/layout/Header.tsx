/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Heading, Link } from "@chakra-ui/react"
import { memo, useCallback, useState, type FC } from "react"
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useNavigate } from "react-router-dom";

export const Header: FC = memo(() => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

    const onClickHome = useCallback(() => {
        navigate("/home")
        setOpen(false);
    }, []);
    const onClickUserManagement = useCallback(() => {
        navigate("/home/user_management")
        setOpen(false);
    }, []);
    const onClickSetting = useCallback(() => {
        navigate("/home/setting")
        setOpen(false);
    } ,[]);

  return (
    <>
    <Flex 
    as="nav" 
    bg="teal.500" 
    color="gray.50" 
    align="center" 
    justify="space-between"
    padding={{ base: 3, md: 5 }}>
        <Flex 
        align="center"
        as="a"
        mr={8}
        _hover={{ cursor: "pointer" }}
        onClick={onClickHome}>
            <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>ユーザー管理アプリ</Heading>
        </Flex>
        <Flex 
            align="center" 
            fontSize="sm" 
            flexGrow={2} 
            display={{ base: "none", md: "flex"}}>
            <Box pr={4}>
                <Link onClick={onClickUserManagement}>ユーザー一覧</Link>
            </Box>
            <Link onClick={onClickSetting}>設定</Link>
        </Flex>
        <MenuIconButton setOpen={setOpen} />
    </Flex>
    <MenuDrawer
        open={open}
        setOpen={setOpen}
        onClickHome={onClickHome}
        onClickSetting={onClickSetting} 
        onClickUserManagement={onClickUserManagement} 
    />
    </>
  );
});