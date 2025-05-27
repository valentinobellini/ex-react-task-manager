import { useParams, useNavigate } from 'react-router-dom'
import { useGlobalContext } from "../contexts/GlobalContext"
import Modal from '../components/Modal';
import EditTaskModal from '../components/EditTaskModal';
import { useState } from 'react';



export default function TaskDetail() {

    const { id } = useParams();
    const { tasks, removeTask, updateTask } = useGlobalContext();
    const navigate = useNavigate();

    const task = tasks.find(t => t.id === parseInt(id));

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)


    if (!task) return <h3>Task non trovata.</h3>



    async function handleDelete() {

        try {
            await removeTask(task.id);
            alert('Task eliminato con successo.')
            navigate('/')
        } catch (err) {
            console.error(err);

            alert(err.message || 'Errore durante l\'eliminazione del task.')

        }
    }

    async function handleUpdate(updatedTask) {
        try {
            await updateTask(updatedTask)
            // alert('Task aggiornato con successo.')
            setShowUpdateModal(false)
        } catch (err) {
            console.error(err);

            alert(err.message || 'Errore durante l\'update del task.')
        }
    }


    return (

        <div className="detail_wrapper">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <span className={`status_badge_detail ${task.status.replace(' ', '').toLowerCase()}`}>
                {task.status}
            </span>
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>

            <button onClick={() => setShowDeleteModal(true)}>Elimina task</button>

            <button onClick={() => setShowUpdateModal(true)}>Aggiorna task</button>


            <Modal
                title='Conferma eliminazione'
                content={<span>Vuoi davvero eliminare queta task?</span>}
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                confirmText='Elimina'
            />

            <EditTaskModal

                show={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                task={task}
                onSave={handleUpdate}
            />
        </div>

    )

}