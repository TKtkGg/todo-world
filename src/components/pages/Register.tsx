import { Box, Flex, Heading, Input, Separator, Stack, Text } from "@chakra-ui/react";
import { FC, memo, useState } from "react"
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../../api/auth";

export const Register: FC = memo(() => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      await registerApi({ username, password, password_confirm: passwordConfirm });

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
        <Heading as="h1" size="lg" textAlign="center">アカウント登録</Heading>
        <Separator my={4} />
        <Stack spaceY={3} py={4} px={10}>
          {errorMessage && (
            <Text color="red.500" fontSize="sm">{errorMessage}</Text>
          )}
          <Input placeholder="ユーザー名" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="パスワード" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="パスワード(確認)" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
          <PrimaryButton disabled={isLoading} onClick={handleRegister}>
            {isLoading ? "登録中..." : "登録する"}
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
});