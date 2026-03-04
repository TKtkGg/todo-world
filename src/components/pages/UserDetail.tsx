import { Heading, Text } from "@chakra-ui/react";
import { memo, type FC } from "react";
import { useLocation, useParams } from "react-router-dom";

export const UserDetail: FC = memo(() => {
    const { userId } = useParams<{ userId: string }>();
    const location = useLocation();
    const username = (location.state as { username?: string } | null)?.username;

    const displayName = username ?? (userId ? `ID: ${userId}` : "ユーザー");

    return(
        <div>
            <Heading as="h1" size="3xl">
                ユーザー詳細
            </Heading>
            <Text mt={2}>
                {displayName}さんの詳細
            </Text>
        </div>
    );
});