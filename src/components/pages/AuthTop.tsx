import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const AuthTop = () => {
  const navigate = useNavigate();

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" boxShadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          認証メニュー
        </Heading>
        <Stack spaceY={4} mt={8}>
          <PrimaryButton
            onClick={() => navigate("/accounts/login")}
          >
            ログイン
          </PrimaryButton>
          <PrimaryButton
            onClick={() => navigate("/accounts/register")}
          >
            アカウント登録
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
};