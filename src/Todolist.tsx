import {FilterValuesType} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

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
    removeTask: (id: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (value: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle('')
        } else {
            setError('You must to fill a field')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    const onAllClickHandler = () => props.changeFilter(props.id, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? 'error' : ''}
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}

                <ul>
                    {
                        props.tasks.map(t => {
                            const onRemoveHandler = () => {
                                props.removeTask(t.id)
                            }
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.target.checked)
                            }
                            return (
                                <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                                    <input type='checkbox'
                                           checked={t.isDone}
                                           onChange={onChangeHandler}
                                    />
                                    <span>{t.title}</span>
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