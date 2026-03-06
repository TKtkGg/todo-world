import { createContext, useState, useEffect, useCallback, useContext } from "react";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContent";
import { createMyTodo, deleteMyTodo, fetchMyTodos, type TodoItemResponse, updateMyTodo } from "../api/todo";

type TodoContextType = {
    incompleteTodos: string[];
    completeTodos: string[];
    addTodo: (text: string) => void;
    deleteTodo: (index: number) => void;
    completeTodo: (index: number) => void;
    backTodo: (index: number) => void;
};

const TodoContext = createContext<TodoContextType | null>(null);

type Props = { children: ReactNode };

export function TodoProvider(props: Props) {
    const { children } = props;
    const { user } = useAuth();

    const [items, setItems] = useState<TodoItemResponse[]>([]);
    const [, setLoading] = useState(true);
    
    const incompleteTodos = items.filter((i) => !i.is_completed).map((i) => i.text);
    const completeTodos = items.filter((i) => i.is_completed).map((i) => i.text);

    // stateが変わるたびに localStorage に保存
    useEffect(() => {
        if(!user) {
            setItems([]);
            setLoading(false);
            return;
        }
        let cancelled = false;
        setLoading(true);
        fetchMyTodos()
            .then((data) => {
                if (!cancelled) setItems(data);
            })
            .catch(() => {
                if (!cancelled) setItems([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            })
        return () => {
            cancelled = true;
        }
    }, [user?.id]);

    const addTodo = useCallback((text: string) => {
        if (!text.trim()) return;
        createMyTodo(text.trim()).then((created) => {
            setItems((prev) => [...prev, created]);
        })
    }, []);

    const deleteTodo = useCallback((index: number) => {
        const list = items.filter((i) => !i.is_completed);
        const item = list[index];
        if (!item) return;
        deleteMyTodo(item.id).then(() => {
            setItems((prev) => prev.filter((i) => i.id !== item.id));
        })
    }, [items]);

    const completeTodo = useCallback((index: number) => {
        const list = items.filter((i) => !i.is_completed);
        const item = list[index];
        if(!item) return
        updateMyTodo(item.id, { is_completed: true }).then((updated) => {
            setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)))
        })
    }, [items]);

    const backTodo = useCallback((index: number) => {
        const list = items.filter((i) => i.is_completed);
        const item = list[index];;
        if(!item) return;
        updateMyTodo(item.id, { is_completed: false }).then((updated) => {
            setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)))
        })
    }, [items]);

    const value: TodoContextType = {
        incompleteTodos,
        completeTodos,
        addTodo,
        deleteTodo,
        completeTodo,
        backTodo,
    }

    return(
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
}

export function useTodos() {
    const ctx = useContext(TodoContext);
    if(!ctx) {
        throw new Error("useTodos must be used within TodoProvider");
    }
    return ctx;
}