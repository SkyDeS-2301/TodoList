import './App.css'
import {TasksType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
export function App() {

    const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }
    function removeTask(id: string) {
        const filteredTasks = tasks.filter(t => t.id !== id)

        setTasks(filteredTasks)
    }
    function addTask(value: string) {
        const newTask: TasksType = { id: v1(), title: value, isDone: false}

        setTasks([newTask, ...tasks])
    }
    function changeStatus(taskId: string, isDone: boolean) {
        const task = tasks.find(t => t.id === taskId)
        if(task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    return (
        <div className='App'>
            <Todolist title='What to learn'
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
            />
        </div>
    )
}





// const tasks2: TasksType[] = [
//     {id: 1, title: 'Game Of Thrones', isDone: true},
//     {id: 2, title: 'Captain of Marvel', isDone: false},
//     {id: 3, title: 'Better Call Soul', isDone: true},
// ]