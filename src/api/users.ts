const API_BASE_URL = "http://127.0.0.1:8000";

export type User = {
    id: number;
    username: string;
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
    return response.json();
}