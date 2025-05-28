import { useGlobalContext } from "../contexts/GlobalContext"
import { useState, useMemo, useCallback } from 'react';
import TaskRow from "../components/TaskRow";

function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay)
    };
}


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


    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = useCallback(
        debounce(setSearchQuery, 500),
        []
    )

    const filteredAndSortedTasks = useMemo(() => {
        const filtered = tasks.filter(task =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const sorted = [...filtered];

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
    }, [tasks, sortBy, sortOrder, searchQuery])


    return (

        // <h1>Lista dei Task</h1>

        < div className="table_wrapper">

            {
                tasks.length === 0 ? (
                    <p>nessun task trovato</p>
                ) : (
                    <>
                        <input type="text"
                            className="search_bar"
                            placeholder="Cerca task per nome..."
                            onChange={e => handleSearch(e.target.value)}
                        />

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
                                {filteredAndSortedTasks.map((task, index) => {
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
                    </>
                )
            }
        </div >

    )
}