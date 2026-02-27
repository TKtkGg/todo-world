export type LoginRequest = {
    username: string;
    password: string;
}

export type LoginResponse = {
    access: string;
    refresh: string;
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