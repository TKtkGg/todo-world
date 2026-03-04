import { FC, memo, ChangeEvent } from "react";
import { Input, Flex } from "@chakra-ui/react";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

type Props = {
    todoText: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
    disabled: boolean;
}

export const InputTodos:FC<Props> = memo((props) => {
    const { todoText, onChange, onClick, disabled} = props;

    const style = {
        backgroundColor: "lightgreen",
        width: "400px",
        height: "50px",
        padding: "8px",
        margin: "8px",
        borderRadius: "8px"
    }

    return(
        <Flex style={style}>
            <Input bg="white" w="50%" h="35px" disabled={disabled} placeholder="TODOを入力" value={todoText} onChange={onChange} />
            <PrimaryButton disabled={disabled} onClick={onClick} >追加</PrimaryButton>
        </Flex>
    );
});