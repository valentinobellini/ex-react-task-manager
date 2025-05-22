import React from 'react'


function TaskRow({ task, rowClassName }) {

    const statusClassName = task.status.replace(' ', '').toLowerCase();

    return (
        <tr className={rowClassName}>
            <td>{task.title}</td>
            <td>
                <span className={`status_badge ${statusClassName}`}>{task.status}</span>
            </td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
}


export default React.memo(TaskRow);