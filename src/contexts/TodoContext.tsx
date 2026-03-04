import { createContext, useState, useEffect, useCallback, useContext } from "react";
import type { ReactNode } from "react";

const STORAGE_KEY = "todo-world-todos";

type TodoContextType = {
    incompleteTodos: string[];
    completeTodos: string[];
    addTodo: (text: string) => void;
    deleteTodo: (index: number) => void;
    completeTodo: (index: number) => void;
    backTodo: (index: number) => void;
};

const TodoContext = createContext<TodoContextType | null>(null);

function loadFromStorage(): { incomplete: string[]; complete: string[]; } {
    try{
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { incomplete: [], complete: []};
        const parsed = JSON.parse(raw) as { incomplete?: string[]; complete?: string[];};
        return {
            incomplete: Array.isArray(parsed.incomplete) ? parsed.incomplete : [],
            complete: Array.isArray(parsed.complete) ? parsed.complete : [],
        }
    } catch {
        return { incomplete: [], complete: []};
    }
}

function saveToStorage(incomplete: string[], complete: string[]) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ incomplete, complete}),
        )
    } catch {
        
    }
}

type Props = { children: ReactNode };

export function TodoProvider(props: Props) {
    const { children } = props;

    type TodoState = { incomplete: string[]; complete: string[]; };

    const [todoState, setTodoState] = useState<TodoState>(() => loadFromStorage());

    const incompleteTodos = todoState.incomplete;
    const completeTodos = todoState.complete;

    // stateが変わるたびに localStorage に保存
    useEffect(() => {
        saveToStorage(todoState.incomplete, todoState.complete);
    }, [todoState]);

    const addTodo = useCallback((text: string) => {
        if (text === "") return;
        setTodoState((prev) => ({
            ...prev,
            incomplete: [...prev.incomplete, text],
        }));
    }, []);

    const deleteTodo = useCallback((index: number) => {
        setTodoState((prev) => {
            const next = [...prev.incomplete];
            next.splice(index, 1);
            return {...prev, incomplete: next}
        })
    }, []);

    const completeTodo = useCallback((index: number) => {
        setTodoState((prev) => {
            const nextIncomplete = [...prev.incomplete];
            const [item] = nextIncomplete.splice(index, 1);
            return{
                incomplete: nextIncomplete,
                complete: [...prev.complete, item],
            };
        });
    }, []);

    const backTodo = useCallback((index: number) => {
        setTodoState((prev) => {
            const nextComplete = [...prev.complete];
            const [item] = nextComplete.splice(index, 1);
            return{
                incomplete: [...prev.incomplete, item],
                complete: nextComplete,
            };
        })
    }, []);

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