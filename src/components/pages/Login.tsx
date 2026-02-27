import { Box, Flex, Heading, Input, Separator, Stack, Text } from "@chakra-ui/react";
import { FC, memo, useState } from "react"
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/auth";

export const Login: FC = memo(() => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const result = await loginApi({ username, password });

      localStorage.setItem("accessToken", result.access);
      localStorage.setItem("refreshToken", result.refresh);

      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }else{
        setErrorMessage("予期せぬエラーが発生しました。");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" boxShadow="md">
        <Heading as="h1" size="lg" textAlign="center">ユーザー管理アプリ</Heading>
        <Separator my={4} />
        <Stack spaceY={3} py={4} px={10}>
          {errorMessage && (
            <Text color="red.500" fontSize="sm">{errorMessage}</Text>
          )}
          <Input placeholder="ユーザー名" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="パスワード" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <PrimaryButton disabled={isLoading} onClick={handleLogin}>
            {isLoading ? "ログイン中..." : "ログイン"}
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
});