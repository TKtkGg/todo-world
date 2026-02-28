import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const AuthTop = () => {
  const navigate = useNavigate();

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" boxShadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          認証メニュー
        </Heading>
        <Stack spaceY={4} mt={8}>
          <Button
            colorScheme="blue"
            onClick={() => navigate("/accounts/login")}
          >
            ログイン
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => navigate("/accounts/register")}
          >
            アカウント登録
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};