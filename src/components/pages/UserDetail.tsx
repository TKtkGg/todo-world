import { Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { memo, useEffect, useState, type FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchUserProfile, type ProfileResponse } from "../../api/profile";
import { ProfileCard } from "../organisms/user/ProfileCard";
import { fetchUserTodos } from "../../api/todo";
import { TodoListPreview } from "../organisms/todo/TodoListPreview";
import { fetchLikeStatus, postLike } from "../../api/like";
import { useAuth } from "../../contexts/AuthContent";
import { useMessage } from "../../hooks/useMessage";

export const UserDetail: FC = memo(() => {
    const { userId } = useParams<{ userId: string }>();
    const location = useLocation();
    const usernameFromState = (location.state as { username?: string } | null)?.username;
    const { user: currentUser } = useAuth();
    const { showMessage } = useMessage();

    const [profile, setProfile] = useState<ProfileResponse | null>(null);
    const [userTodos, setUserTodos] = useState<{
        incompleteTodos: string[];
        completeTodos: string[];
    } | null>(null);
    const [hasLiked, setHasLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // プロフィール取得
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

    // TODO取得
    useEffect(() => {
        if (!userId) return;
        let cancelled = false;
        fetchUserTodos(Number(userId))
            .then((data) => {
                if(!cancelled) setUserTodos(data);
            })
            .catch(() => {
                if(!cancelled) setUserTodos({ incompleteTodos: [], completeTodos: [] });
            })
        return () => {
            cancelled = true;
        }
    }, [userId]);

    // いいね取得
    useEffect(() => {
        if (!userId || !currentUser || currentUser.id === Number(userId)) {
            setHasLiked(false);
            return;
        }
        let cancelled = false;
        fetchLikeStatus(Number(userId))
            .then((data) => {
                if(!cancelled) setHasLiked(data.liked);
            })
            .catch(() => {
                if(!cancelled) setHasLiked(false);
            })
        return () => {
            cancelled = true;
        }
    }, [userId, currentUser?.id])

    const handleLike = () => {
        if(!userId || hasLiked || likeLoading) return;
        setLikeLoading(true);
        postLike(Number(userId))
            .then(() => {
                setHasLiked(true);
                showMessage({ title: "いいねしました！", type: "success"});
            })
            .catch((err) => {
                showMessage({
                    title: err instanceof Error ? err.message : "いいねに失敗しました",
                    type: "error",
                })
            })
            .finally(() => {
                setLikeLoading(false);
            })
    }

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
                    {userTodos ? (
                        <TodoListPreview 
                            incompleteTodos={userTodos.incompleteTodos}
                            completeTodos={userTodos.completeTodos}
                        />
                    ) : (
                        <Box bg="gray.50" p={4} borderRadius="md" shadow="sm">
                            <Text fontSize="sm" color="gray.600">読み込み中...</Text>
                        </Box>
                    )}
                </Box>

                {/* プロフィール */}
                <Box flex="1">
                    <Text fontWeight="bold" mb={2}>プロフィール</Text>
                    {profile ? (
                        <>
                            <ProfileCard 
                                username={profile.username}
                                message={profile.message}
                                iconUrl={profile.iconUrl}
                            />
                            {currentUser && profile.id !== currentUser.id && (
                                <Button mt={4} colorScheme="pink" onClick={handleLike} disabled={hasLiked || likeLoading}>
                                    {hasLiked ? "いいね済み" : likeLoading ? "送信中..." : "いいね！"}
                                </Button>
                            )}
                        </>
                    ) : (
                        <Text color="gray.500">プロフィールを取得できませんでした</Text>
                    )}
                </Box>
            </Flex>
        </Box>
    );
});