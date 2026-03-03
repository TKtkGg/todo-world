import { useCallback, useState } from "react";
import { useMessage } from "./useMessage";
import { fetchAllUsers } from "../api/users";

type User = {
    id: number;
    username: string;
    iconUrl: string;
}

export const useAllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const { showMessage } = useMessage();

    const getUsers = useCallback(async () => {
        setLoading(true);
        try{
            const data = await fetchAllUsers();
            setUsers(data);
        } catch (error) {
            showMessage({
                title: error instanceof Error ? error.message : "ユーザー取得に失敗しました",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    }, [showMessage]);

    return { users, loading, getUsers };
}