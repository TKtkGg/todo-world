import { FC, memo } from "react";

type Props = {
    todos: string[];
    onClick: (index: number) => void;
}

export const CompleteTodos:FC<Props> = memo((props) => {
    const { todos, onClick } = props
    
    return(
        <div className="complete-area">
            <p className="title">完了のTODO</p>
            <ul>
                {todos.map((todo, index) => {
                    return(
                        <li key={todo}>
                            <div className="list-row">
                                <p className="todo-item">・{todo}</p>
                                <button onClick={() => onClick(index)}>戻す</button>
                            </div> 
                        </li>
                    );
                })}
            </ul>
        </div>
    );
});