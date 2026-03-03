const API_BASE_URL = "http://127.0.0.1:8000"

export type ProfileResponse =  {
    id: number
    username: string
    message: string
}

function getAccessTokenOrThrow(): string {
    const token = localStorage.getItem("accessToken");
    if(!token) {
        throw new Error("ログイン状態が無効です。再度ログインしてください。");
    }
    return token;
}

export async function fetchProfile(): Promise<ProfileResponse> {
    const accessToken = getAccessTokenOrThrow()

    const response = await fetch(`${API_BASE_URL}/api/accounts/profile`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null)
        const detail = 
            (errorBody && (errorBody.detail || JSON.stringify(errorBody))) ||
            "プロフィールの取得に失敗しました。";
        throw new Error(detail);
    }
    return response.json();
}


export type UpdateProfileRequest = {
    username?: string
    message?: string
}

export async function updateProfile(
    data: UpdateProfileRequest,
): Promise<ProfileResponse> {
    const accessToken = getAccessTokenOrThrow()

    const response = await fetch(`${API_BASE_URL}/api/accounts/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    });

    if(!response.ok) {
        const errorBody = await response.json().catch(() => null)
        const detail = 
            (errorBody && (errorBody.detail || JSON.stringify(errorBody))) ||
            "プロフィールの取得に失敗しました。";
        throw new Error(detail);
    }

    return response.json();
}