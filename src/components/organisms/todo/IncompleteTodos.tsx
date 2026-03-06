import { memo, type FC } from "react";

type Props = {
    todos: string[];
    onClickComplete: (index: number) => void;
    onClickDelete: (index: number) => void;
}

export const IncompleteTodos:FC<Props> = memo((props) => {
    const { todos, onClickComplete, onClickDelete} = props;
    return(
        <div className="incomplete-area">
            <p className="title">未完了のTODO</p>
            <ul>
                {todos.map((todo, index) => {
                    return(
                        <li key={todo}>
                            <div className="list-row">
                                <p className="todo-item">・{todo}</p>
                                <button onClick={() => onClickComplete(index)}>完了</button>
                                <button onClick={() => onClickDelete(index)}>削除</button>
                            </div> 
                        </li>
                    );
                })}
            </ul>
        </div>
    );
});