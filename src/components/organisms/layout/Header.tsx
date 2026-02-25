import { Box, Button, Drawer, Flex, Heading, IconButton, Link, Portal } from "@chakra-ui/react"
import { memo, useState, type FC } from "react"
import { FaBars } from 'react-icons/fa';

export const Header: FC = memo(() => {
    const [open, setOpen] = useState(false)
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
        _hover={{ cursor: "pointer" }}>
            <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>ユーザー管理アプリ</Heading>
        </Flex>
        <Flex 
            align="center" 
            fontSize="sm" 
            flexGrow={2} 
            display={{ base: "none", md: "flex"}}>
            <Box pr={4}>
                <Link>ユーザー一覧</Link>
            </Box>
            <Link>設定</Link>
        </Flex>
        <IconButton 
            aria-label="メニューボタン" 
            onClick={() => setOpen(true)}
            display={{ md: "none" }}>
            <FaBars />
        </IconButton>
    </Flex>
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
                            <Button w="100%">TOP</Button>
                            <Button w="100%">ユーザー一覧</Button>
                            <Button w="100%">設定</Button>
                        </Drawer.Body>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
    </Drawer.Root>
    </>
  );
});