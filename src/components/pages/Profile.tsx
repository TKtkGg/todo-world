import { FC, memo, useEffect, useState } from "react"
import { useAuth } from "../../contexts/AuthContent";
import { Avatar, Box, Flex, Heading, Input, Spinner, Stack, Textarea } from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useMessage } from "../../hooks/useMessage";
import { fetchProfile, updateProfile } from "../../api/profile";

export const Profile: FC = memo(() => {
  const { user, isLoading } = useAuth();
  const { showMessage } = useMessage();

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
        try{
            const profile = await fetchProfile();
            setUsername(profile.username ?? "");
            setMessage(profile.message ?? "");
            setIconUrl(profile.iconUrl ?? "");
        } catch(error) {
            showMessage({
                title: error instanceof Error ? error.message : "プロフィールの取得に失敗しました",
                type: "error",
            });
        } finally {
            setIsProfileLoading(false)
        }
    }
    loadProfile()
  }, [showMessage]);

  const handleSave = async () => {
    setIsSaving(true);
    try{
        const updated = await updateProfile({
            username,
            message,
            iconUrl,
        });

        showMessage({
            title: "プロフィールを保存しました",
            type: "success",
        });

        setUsername(updated.username ?? "");
        setMessage(updated.message ?? "");
        setIconUrl(updated.iconUrl ?? "");
    } catch (error) {
        showMessage({
            title: error instanceof Error ? error.message : "プロフィールの保存に失敗しました",
            type: "error",
        });
    } finally {
        setIsSaving(false)
    }
  }

  if(isLoading || isProfileLoading) {
    return (
        <Flex align="center" justify="center" height="70vh">
            <Spinner size="xl" />
        </Flex>
    );
  }

  return (
    <div>
        <Heading as="h1" size="lg" textAlign="center" paddingTop={{ base: 3, md: 5 }}>プロフィール</Heading>
        <Flex align="center" justify="center" py={{ base: 6, md: 10 }} px={4}>
            <Box
                w={{ base: "100%", sm: "420px"}}
                bg="white"
                borderRadius="12px"
                boxShadow="md"
                p={{ base: 5, md: 6}}
            >
                <Stack gap={5} textAlign="center">
                    <Flex justify="center">
                        <Avatar.Root size="2xl">
                            <Avatar.Fallback name={username || user?.username || "user"} />
                            <Avatar.Image src={iconUrl || undefined} />
                        </Avatar.Root>
                    </Flex>
                
                    <Stack gap={2} textAlign="left">
                        <Box>
                            <Box fontSize="sm" color="gray.600" mb={1}>アイコン</Box>
                            <Input value={iconUrl} onChange={(e) => setIconUrl(e.target.value)} placeholder="https://example.com/icon.png" />
                        </Box>

                        <Box>
                            <Box fontSize="sm" color="gray.600" mb={1}>ユーザーネーム</Box>
                            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ユーザーネーム" />
                        </Box>

                        <Box>
                            <Box fontSize="sm" color="gray.600" mb={1}>メッセージ</Box>
                            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="メッセージ" rows={4} />
                        </Box>
                    </Stack>
                    <PrimaryButton disabled={isSaving} onClick={handleSave}>
                        {isSaving ? "保存中..." : "保存"}
                    </PrimaryButton>
                </Stack>
            </Box>
        </Flex>
    </div>
    
  )
});