import { useGlobalContext } from "../contexts/GlobalContext"

import TaskRow from "../components/TaskRow";

export default function TaskList() {

    const { tasks } = useGlobalContext();


    return (


        < div >
            <h1>Lista dei Task</h1>

            {
                tasks.length === 0 ? (
                    <p>nessun task trovato</p>
                ) : (
                    // <ul>
                    //     {tasks.map(task => (
                    //         <li key={task.id}>
                    //             <h4>{task.title}</h4>
                    //             <p>{task.description}</p>
                    //             <span>{task.status}</span>
                    //         </li>
                    //     ))}
                    // </ul>


                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Stato</th>
                                <th>Data di Creazione</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <TaskRow key={task.id} task={task} />
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div >
    )
}