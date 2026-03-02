import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { FC, memo } from "react"

type Props = {
    imageUrl: string;
    username: string;
}

export const UserCard: FC<Props> = memo((props) => {
    const { imageUrl, username } = props;
  return (
    <Box w="260px" h="260px" bg="white" borderRadius="10px" shadow="md" p={4} _hover={{ cursor: "pointer", opacity: 0.8 }}>
        <Stack textAlign="center">
        <Image m="auto" borderRadius="full" boxSize="160px" src={imageUrl} alt="no img" />
        <Text fontSize="lg" fontWeight="bold">{username}</Text>
        </Stack>
    </Box>
  )
});