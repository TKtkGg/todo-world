import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { memo, useEffect, useState, type FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchUserProfile, type ProfileResponse } from "../../api/profile";
import { ProfileCard } from "../organisms/user/ProfileCard";

export const UserDetail: FC = memo(() => {
    const { userId } = useParams<{ userId: string }>();
    const location = useLocation();
    const usernameFromState = (location.state as { username?: string } | null)?.username;

    const [profile, setProfile] = useState<ProfileResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return
        }
        let cancelled = false;
        setLoading(true);
        setError(null);
        fetchUserProfile(Number(userId))
            .then((data) => {
                if(!cancelled) setProfile(data);
            })
            .catch((err) => {
                if (!cancelled) setError(err instanceof Error ? err.message : "取得に失敗しました");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            })
        return () => {
            cancelled = true;
        }
    }, [userId]);

    if (loading) {
        return (
            <Flex align="center" justify="center" height="40vh">
                <Spinner size="xl" />
            </Flex>
        );
    }

    if(error) {
        return(
            <Box p={4}>
                <Heading size="lg">ユーザー詳細</Heading>
                <Text color="red.500" mt={2}>{error}</Text>
            </Box>
        )
    }

    const displayName = usernameFromState ?? (userId ? `ID: ${userId}` : "ユーザー");

    return(
        <Box p={{ base: 4, md: 6}}>
            <Heading as="h1" size="3xl" mb={4}>
                {displayName}さんの詳細
            </Heading>
            
            <Flex align="flex-start" gap={6} direction={{ base: "column", md: "row"}}>
                {/* TODO */}
                <Box flex="1" minW={0}>
                    <Text fontWeight="bold" mb={2}>TODO</Text>
                    <Box bg="gray.50" p={4} borderRadius="md" shadow="sm">
                        <Text fontSize="sm" color="gray.600" mb={2}>TODO</Text>
                    </Box>
                </Box>

                {/* プロフィール */}
                <Box flex="1">
                    <Text fontWeight="bold" mb={2}>プロフィール</Text>
                    {profile ? (
                        <ProfileCard 
                            username={profile.username}
                            message={profile.message}
                            iconUrl={profile.iconUrl}
                        />
                    ) : (
                        <Text color="gray.500">プロフィールを取得できませんでした</Text>
                    )}
                </Box>
            </Flex>
        </Box>
    );
});