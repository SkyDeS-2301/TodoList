import './App.css'
import {TasksType, Todolist} from "./Todolist.tsx";
import {useState} from "react";

export type FilterValuesType = 'all' | 'active' | 'completed'
export function App() {

    const [tasks, setTasks] = useState<TasksType[]>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }
    function removeTask(id: number) {
        const filteredTasks = tasks.filter(t => t.id !== id)

        setTasks(filteredTasks)
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
            />
        </div>
    )
}





// const tasks2: TasksType[] = [
//     {id: 1, title: 'Game Of Thrones', isDone: true},
//     {id: 2, title: 'Captain of Marvel', isDone: false},
//     {id: 3, title: 'Better Call Soul', isDone: true},
// ]