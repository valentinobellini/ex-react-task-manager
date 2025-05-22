import React from 'react'


function TaskRow({ task }) {

    const statusClassName = task.status.replace(' ', '').toLowerCase();

    return (
        <tr>
            <td>{task.title}</td>
            <td className={statusClassName}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
}


export default React.memo(TaskRow);