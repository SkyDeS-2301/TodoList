import './App.css'
import {TasksType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm.tsx";

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: TasksType[]
}
export function App() {

    const todolist1 = v1();
    const todolist2 = v1()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to watch', filter: 'all'}
    ])

    const [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolist1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'Typescript', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolist2]: [
            {id: v1(), title: 'Game Of Thrones', isDone: false},
            {id: v1(), title: 'Captain of Marvel', isDone: true},
            {id: v1(), title: 'Better Call Soul', isDone: true},
        ],
    })

    function changeFilter(todolistId: string, value: FilterValuesType) {
        const todolist: TodolistType | undefined = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function removeTask(todolistId: string, id: string) {
        const tasks = tasksObj[todolistId]
        const filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function addTask(todolistId: string, value: string) {
        const task: TasksType = {id: v1(), title: value, isDone: false}
        const tasks = tasksObj[todolistId]
        const newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks

        setTasksObj({...tasksObj})
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    function removeTodolist(todolistId: string) {
        const filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists([...filteredTodolists])
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    function addTodolist(title: string) {
        const todolistId = v1()
        const todolist: TodolistType = {
            id: todolistId,
            title: title,
            filter: 'all'
        }
        tasksObj[todolistId] = []
        setTodolists([todolist, ...todolists])
        setTasksObj({...tasksObj})
    }

    function changeTaskTitle(todolistId: string, newValue: string, taskId: string) {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newValue
            setTasksObj({...tasksObj})
        }
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = title
            setTodolists([...todolists])
        }
    }

    return (
        <div className='App'>
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasksObj[tl.id]
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
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
                                     removeTodolist={removeTodolist}
                                     changeTaskTitle={changeTaskTitle}
                                     changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }
        </div>
    )
}