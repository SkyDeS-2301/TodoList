import {FilterValuesType} from "./App.tsx";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>X</button>
                <ul>
                    {
                        props.tasks.map(t => (
                                <li key={t.id}>
                                    <input type='checkbox' checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <button onClick={ () => { props.removeTask(t.id) } }>X</button>
                                </li>
                            )
                        )
                    }
                </ul>
                <div>
                    <button onClick={() => props.changeFilter('all')}>All</button>
                    <button onClick={() => props.changeFilter('active')}>Active</button>
                    <button onClick={() => props.changeFilter('completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}