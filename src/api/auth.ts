export type LoginRequest = {
    username: string;
    password: string;
}

export type LoginResponse = {
    access: string;
    refresh: string;
}

export type MeResponse = {
    id: number;
    username: string;
}

const API_BASE_URL = "http://127.0.0.1:8000";

export async function loginApi(
    data: LoginRequest
): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/api/accounts/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const detail = 
            (errorBody && (errorBody.detail || JSON.stringify(errorBody))) ||
            "ログインに失敗しました";
        throw new Error(detail);
    }

    return response.json();
}

export async function fetchMe(accessToken: string): Promise<MeResponse> {
    const response = await fetch(`${API_BASE_URL}/api/accounts/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("ユーザー情報の取得に失敗しました。再度ログインしてください。");
    }
    return response.json();
}