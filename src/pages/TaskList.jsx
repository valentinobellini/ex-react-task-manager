import { useGlobalContext } from "../contexts/GlobalContext"
import { useState, useMemo } from 'react';
import TaskRow from "../components/TaskRow";

export default function TaskList() {

    const { tasks } = useGlobalContext();

    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1)


    function handleSort(column) {
        if (sortBy === column) {
            setSortOrder(prev => -prev);
        } else {
            setSortBy(column);
            setSortOrder(1);
        }
    }


    const sortedTasks = useMemo(() => {
        const sorted = [...tasks];

        sorted.sort((a, b) => {
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title) * sortOrder;
            } else if (sortBy === 'status') {
                const order = { "To do": 1, "Doing": 2, "Done": 3 };
                return (order[a.status] - order[b.status]) * sortOrder;
            } else if (sortBy === 'createdAt') {
                return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder;
            }
        })

        return sorted;
    }, [tasks, sortBy, sortOrder])


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

                                <th onClick={() => handleSort('title')} className="sortable">Nome
                                    {sortBy === "title" && (
                                        <span className="arrow">{sortOrder === 1 ? "▲" : "▼"}</span>
                                    )}
                                </th>

                                <th onClick={() => handleSort('status')} className="sortable">Stato
                                    {sortBy === "status" && (
                                        <span className="arrow">{sortOrder === 1 ? "▲" : "▼"}</span>
                                    )}
                                </th>

                                <th onClick={() => handleSort('createdAt')} className="sortable">Data di Creazione
                                    {sortBy === "createdAt" && (
                                        <span className="arrow">{sortOrder === 1 ? "▲" : "▼"}</span>
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTasks.map((task, index) => {
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