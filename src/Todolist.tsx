import {FilterValuesType} from "./App.tsx";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: TasksType[]
    filter: FilterValuesType
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, value: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, newValue: string, taskId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.id, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed')
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }
    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/> <button onClick={removeTodolist}>X</button></h3>
            <div>
                <AddItemForm addItem={addTask}/>

                <ul>
                    {
                        props.tasks.map(t => {
                            const onRemoveHandler = () => {
                                props.removeTask(props.id, t.id)
                            }
                            const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(props.id, t.id, e.target.checked)
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(props.id, newValue, t.id)
                            }
                            return (
                                <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                                    <input type='checkbox'
                                           checked={t.isDone}
                                           onChange={onChangeStatus}
                                    />
                                    <EditableSpan title={t.title}
                                                  onChange={onChangeTitleHandler}/>
                                    <button onClick={onRemoveHandler}>X</button>
                                </li>
                            )
                        })
                    }
                </ul>

                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : ''}
                            onClick={onAllClickHandler}>All
                    </button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''}
                            onClick={onActiveClickHandler}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''}
                            onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}

