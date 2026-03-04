import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { FC, memo } from "react"

type Props = {
    imageUrl: string;
    username: string;
    onClick?: () => void;
}

export const UserCard: FC<Props> = memo((props) => {
    const { imageUrl, username, onClick } = props;
  return (
    <Box w="260px" h="260px" bg="white" borderRadius="10px" shadow="md" p={4} _hover={{ cursor: "pointer", opacity: 0.8 }} onClick={onClick}>
        <Stack textAlign="center">
          <Flex align="center" justify="center">
            <Avatar.Root size="2xl" style={{ width: 120, height: 120 }}>
              <Avatar.Fallback name={username} />
              <Avatar.Image src={imageUrl} />
            </Avatar.Root>
          </Flex>
          <Text fontSize="lg" fontWeight="bold">{username}</Text>
        </Stack>
    </Box>
  )
});