import { API_BASE_URL } from "./config";

function getAccessTokenOrThrow(): string {
    const token = localStorage.getItem("accessToken");
    if(!token) {
        throw new Error("ログイン状態が無効です。再度ログインしてください。");
    }
    return token;
}

export type LikeStatusResponse = {
    liked: boolean;
};

export async function fetchLikeStatus(userId: number): Promise<LikeStatusResponse> {
    const accessToken = getAccessTokenOrThrow();
    const response = await fetch(`${API_BASE_URL}/api/accounts/users/${userId}/like`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    },
    );

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const detail = 
            (errorBody && (errorBody.detail || JSON.stringify(errorBody))) ||
            "いいねの状態の取得に失敗しました。";
        throw new Error(detail);
    }
    return response.json();

}

export async function postLike(userId: number): Promise<void> {
    const accessToken = getAccessTokenOrThrow();
    const response = await fetch(`${API_BASE_URL}/api/accounts/users/${userId}/like`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({}),
    },
    );

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const detail = 
            (errorBody && (errorBody.detail || JSON.stringify(errorBody))) ||
            "いいねに失敗しました。";
        throw new Error(detail);
    }
}