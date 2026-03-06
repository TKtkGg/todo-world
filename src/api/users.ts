import { API_BASE_URL } from "./config";

export type User = {
    id: number;
    username: string;
    iconUrl: string;
};

export async function fetchAllUsers(): Promise<User[]> {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch(`${API_BASE_URL}/api/accounts/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const detail = 
            (errorBody && (errorBody.detail || JSON.stringify(errorBody))) ||
            "ユーザー取得に失敗しました";
        throw new Error(detail);
    }

    const raw = await response.json() as {
        id: number;
        username: string;
        icon_url?: string;
    }[];

    return raw.map((u) => ({
        id: u.id,
        username: u.username,
        iconUrl: u.icon_url ?? "",
    }))
}