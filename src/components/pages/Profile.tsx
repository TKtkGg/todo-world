import { FC, memo, useEffect, useState } from "react"
import { useAuth } from "../../contexts/AuthContent";
import { Avatar, Box, Flex, Heading, Input, Spinner, Stack, Textarea } from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useMessage } from "../../hooks/useMessage";
import { fetchProfile, updateProfile } from "../../api/profile";
import { ProfileCard } from "../organisms/user/ProfileCard";

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
        <Heading as="h1" size="3xl" textAlign="center" paddingTop={{ base: 3, md: 5 }}>プロフィール</Heading>
        <Flex align="center" justify="center" py={{ base: 6, md: 10 }} px={4}>
            <ProfileCard 
                username={username}
                message={message}
                iconUrl={iconUrl}
                editable={true}
                onUsernameChange={(e) => setUsername(e.target.value)}
                onMessageChange={(e) => setMessage(e.target.value)}
                onIconUrlChange={(e) => setIconUrl(e.target.value)}
                onSave={handleSave}
                isSaving={isSaving}
            />
        </Flex>
    </div>
    
  )
});