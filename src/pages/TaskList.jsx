import { useGlobalContext } from "../contexts/GlobalContext"

import TaskRow from "../components/TaskRow";

export default function TaskList() {

    const { tasks } = useGlobalContext();

    return (

        // <h1>Lista dei Task</h1>

        < div className="table_wrapper">

            {
                tasks.length === 0 ? (
                    <p>nessun task trovato</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Stato</th>
                                <th>Data di Creazione</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => {
                                const rowClassName = index % 2 === 0 ? 'row' : 'row_alternate';
                                return (
                                    <TaskRow
                                        key={task.id}
                                        task={task}
                                        rowClassName={rowClassName}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                )
            }
        </div >
    )
}