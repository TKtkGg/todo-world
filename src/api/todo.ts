import { API_BASE_URL } from "./config";

function getAccessTokenOrThrow(): string {
    const token = localStorage.getItem("accessToken");
    if(!token) {
        throw new Error("ログイン状態が無効です。再度ログインしてください。");
    }
    return token;
}

export type TodoItemResponse = {
    id: number;
    text: string;
    is_completed: boolean;
}

export type UserTodosResponse = {
    incompleteTodos: string[];
    completeTodos: string[];
}

export async function fetchUserTodos(userId: number): Promise<UserTodosResponse> {
    const accessToken = getAccessTokenOrThrow();

    const response = await fetch(`${API_BASE_URL}/api/accounts/users/${userId}/todos`,
        {
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
            "TODOの取得に失敗しました。";
        throw new Error(detail)
    }

    const raw = (await response.json()) as TodoItemResponse[];

    const incompleteTodos = raw.filter((t) => !t.is_completed).map((t) => t.text);
    const completeTodos = raw.filter((t) => t.is_completed).map((t) => t.text);

    return { incompleteTodos, completeTodos };
}

export async function fetchMyTodos(): Promise<TodoItemResponse[]> {
    const accessToken = getAccessTokenOrThrow();
    const response = await fetch(`${API_BASE_URL}/api/accounts/me/todos`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    
    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const detail = 
            (errorBody && (errorBody.detail || JSON.stringify(errorBody))) ||
            "TODOの取得に失敗しました。";
        throw new Error(detail)
    }
    return response.json()
}

export async function createMyTodo(text: string): Promise<TodoItemResponse> {
    const accessToken = getAccessTokenOrThrow();
    const response = await fetch(`${API_BASE_URL}/api/accounts/me/todos`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const detail = 
            (errorBody && (errorBody.detail || JSON.stringify(errorBody))) ||
            "TODOの作成に失敗しました。";
        throw new Error(detail);
    }
    return response.json();
}

export async function updateMyTodo(
    id: number,
    data: { is_completed?: boolean, text?: string},
): Promise<TodoItemResponse> {
    const accessToken = getAccessTokenOrThrow();
    const response = await fetch(`${API_BASE_URL}/api/accounts/me/todos/${id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const detail = 
            (errorBody && (errorBody.detail || JSON.stringify(errorBody))) ||
            "TODOの更新に失敗しました。";
        throw new Error(detail);
    }
    return response.json();
}

export async function deleteMyTodo(id: number): Promise<void> {
    const accessToken = getAccessTokenOrThrow();
    const response = await fetch(`${API_BASE_URL}/api/accounts/me/todos/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const detail = 
            (errorBody && (errorBody.detail || JSON.stringify(errorBody))) ||
            "TODOの削除に失敗しました。";
        throw new Error(detail);
    }
}