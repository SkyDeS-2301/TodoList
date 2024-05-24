import './App.css'
import {TasksType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function App() {

    const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'Typescript', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])

    function changeFilter(todolistId: string, value: FilterValuesType) {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolist([...todolists])
        }
    }

    function removeTask(id: string) {
        const filteredTasks = tasks.filter(t => t.id !== id)

        setTasks(filteredTasks)
    }

    function addTask(value: string) {
        const newTask: TasksType = {id: v1(), title: value, isDone: false}

        setTasks([newTask, ...tasks])
    }

    function changeStatus(taskId: string, isDone: boolean) {
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }


    const [todolists, setTodolist] = useState<TodolistType[]>([
        {id: v1(), title: 'What to learn', filter: 'active'},
        {id: v1(), title: 'What to watch', filter: 'completed'}
    ])

    return (
        <div className='App'>

            {
                todolists.map(tl => {

                    let tasksForTodolist = tasks
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasks.filter(t => !t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasks.filter(t => t.isDone)
                    }

                    return <Todolist key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={tasksForTodolist}
                                     filter={tl.filter}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                    />
                })
            }

        </div>
    )
}


// const tasks2: TasksType[] = [
//     {id: 1, title: 'Game Of Thrones', isDone: true},
//     {id: 2, title: 'Captain of Marvel', isDone: false},
//     {id: 3, title: 'Better Call Soul', isDone: true},
// ]