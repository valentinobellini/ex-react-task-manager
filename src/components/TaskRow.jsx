import React from 'react'
import { Link } from 'react-router-dom'


function TaskRow({ task, rowClassName }) {

    const statusClassName = task.status.replace(' ', '').toLowerCase();

    return (
        <tr className={rowClassName}>
            <td>
                <Link to={`/task/${task.id}`}>{task.title}</Link>
            </td>
            <td>
                <span className={`status_badge ${statusClassName}`}>{task.status}</span>
            </td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
}


export default React.memo(TaskRow);