import { useGlobalContext } from "../contexts/GlobalContext"

export default function TaskList() {

    const { tasks } = useGlobalContext();


    return (


        < div >
            <h1>Lista dei Task</h1>

            {
                tasks.length === 0 ? (
                    <p>nessun task trovato</p>
                ) : (
                    <ul>
                        {tasks.map(task => (
                            <li key={task.id}>
                                <h4>{task.title}</h4>
                                <p>{task.description}</p>
                                <span>{task.status}</span>
                            </li>
                        ))}
                    </ul>
                )
            }


        </div >
    )
}