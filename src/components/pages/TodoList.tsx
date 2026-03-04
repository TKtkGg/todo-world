import { useState, FC, memo, ChangeEvent } from "react"
import { Flex, Box } from "@chakra-ui/react";
import "../../styles/todo.css"
import { InputTodos } from "../organisms/todo/InputTodos";
import { IncompleteTodos } from "../organisms/todo/IncompleteTodos";
import { CompleteTodos } from "../organisms/todo/CompleteTodos";

export const TodoList: FC = memo(() => {
    const [todoText, setTodoText] = useState("");
    const [incompleteTodos, setIncompleteTodos] = useState<string[]>([]);
    const [completeTodos, setCompleteTodos] = useState<string[]>([]);

    const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => 
        setTodoText(event.target.value);

    const onClickAdd = () => {
        if(todoText === "") return;
        const newTodos = [...incompleteTodos,todoText];
        setIncompleteTodos(newTodos);
        setTodoText("");
    };

    const onClickDelete = (index: number) => {
        const newTodos = [...incompleteTodos];
        newTodos.splice(index, 1);
        setIncompleteTodos(newTodos);
    };

    const onClickComplete = (index: number) => {
        const newIncompleteTodos = [...incompleteTodos];
        newIncompleteTodos.splice(index, 1);

        const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
        setIncompleteTodos(newIncompleteTodos);
        setCompleteTodos(newCompleteTodos);
    };

    const onClickBack = (index: number) => {
        const newCompleteTodos = [...completeTodos];
        newCompleteTodos.splice(index, 1);

        const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
        setIncompleteTodos(newIncompleteTodos);
        setCompleteTodos(newCompleteTodos);
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
                        onClickComplete={onClickComplete}
                        onClickDelete={onClickDelete}
                    />
                    <CompleteTodos
                        todos={completeTodos}
                        onClick={onClickBack}
                    />
                </Box>
            </Flex>
        </>
    );
});