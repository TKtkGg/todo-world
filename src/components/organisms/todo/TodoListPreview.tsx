import { memo, type FC } from "react";
import "../../../styles/todo.css"

type Props = {
    incompleteTodos: string[];
    completeTodos: string[];
}

export const TodoListPreview: FC<Props> = memo((props) => {
    const { incompleteTodos, completeTodos } = props;

    return(
        <>
            <div className="incomplete-area">
                <p className="title">未完了のTODO</p>
                <ul>
                    {incompleteTodos.map((todo, index) => {
                        return(
                            <li key={`incomplete-${index}-${todo}`}>
                                <p className="todo-item">・{todo}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="complete-area">
                <p className="title">完了のTODO</p>
                <ul>
                    {completeTodos.map((todo, index) => {
                        return(
                            <li key={`complete-${index}-${todo}`}>
                                <p className="todo-item">・{todo}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
})