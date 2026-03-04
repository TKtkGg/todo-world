import { useState, FC, memo, ChangeEvent } from "react"
import { Flex, Box } from "@chakra-ui/react";
import "../../styles/todo.css"
import { InputTodos } from "../organisms/todo/InputTodos";
import { IncompleteTodos } from "../organisms/todo/IncompleteTodos";
import { CompleteTodos } from "../organisms/todo/CompleteTodos";
import { useTodos } from "../../contexts/TodoContext";

export const TodoList: FC = memo(() => {
    const [todoText, setTodoText] = useState("");
    const { incompleteTodos, completeTodos, addTodo, deleteTodo, completeTodo, backTodo } = useTodos();

    const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => 
        setTodoText(event.target.value);

    const onClickAdd = () => {
        if(todoText === "") return;
        addTodo(todoText);
        setTodoText("");
    };

    const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

    return(
        <>
            <Flex align="flex-start" justify="center" py={{ base: 6, md: 10 }}>
                <Box w="450px" h="520px" bg="white" borderRadius="10px" shadow="md" p={4}>
                    <InputTodos
                        todoText= {todoText}
                        onChange={onChangeTodoText}
                        onClick={onClickAdd} 
                        disabled={isMaxLimitIncompleteTodos}
                    />
                    {isMaxLimitIncompleteTodos && (
                        <p style={{ color:"red"}}>TODOが多すぎます！</p>
                    )}
                    
                    <IncompleteTodos
                        todos={incompleteTodos}
                        onClickComplete={completeTodo}
                        onClickDelete={deleteTodo}
                    />
                    <CompleteTodos
                        todos={completeTodos}
                        onClick={backTodo}
                    />
                </Box>
            </Flex>
        </>
    );
});