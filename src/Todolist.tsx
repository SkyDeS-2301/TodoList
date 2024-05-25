import {FilterValuesType} from "./App.tsx";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <div style={ { paddingBottom: 20 } }>
                    <AddItemForm addItem={addTask}/>
                </div>

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
                                <div className={t.isDone ? 'is-done' : ''} key={t.id}>
                                    <Checkbox checked={t.isDone}
                                           onChange={onChangeStatus}
                                    />
                                    <EditableSpan title={t.title}
                                                  onChange={onChangeTitleHandler}/>
                                    <IconButton onClick={onRemoveHandler}>
                                        <Delete/>
                                    </IconButton>
                                </div>
                            )
                        })
                    }
                </ul>

                <div>
                    <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                            onClick={onAllClickHandler}>All
                    </Button>
                    <Button variant={props.filter === 'active' ? 'contained' : 'text'} color={"primary"}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button variant={props.filter === 'completed' ? 'contained' : 'text'} color={'secondary'}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
}

