import { Box, Flex, Heading, Input, Separator, Stack } from "@chakra-ui/react";
import { memo, useState, type FC } from "react"
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/auth";
import { useMessage } from "../../hooks/useMessage";

export const Login: FC = memo(() => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const handleLogin = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const result = await loginApi({ username, password });

      localStorage.setItem("accessToken", result.access);
      localStorage.setItem("refreshToken", result.refresh);
      showMessage({ title: "ログインしました", type: "success" });
      navigate("/home");
    } catch (error) {
      showMessage({ title: "ログインに失敗しました", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" boxShadow="md">
        <Heading as="h1" size="lg" textAlign="center">ログイン</Heading>
        <Separator my={4} />
        <Stack spaceY={3} py={4} px={10}>
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