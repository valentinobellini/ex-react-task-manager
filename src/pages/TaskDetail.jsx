import { useParams, useNavigate } from 'react-router-dom'
import { useGlobalContext } from "../contexts/GlobalContext"
import Modal from '../components/Modal';
import { useState } from 'react';


export default function TaskDetail() {

    const { id } = useParams();
    const { tasks, removeTask } = useGlobalContext();
    const task = tasks.find(t => t.id === parseInt(id));
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)

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


    return (

        <div className="detail_wrapper">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <span className={`status_badge_detail ${task.status.replace(' ', '').toLowerCase()}`}>
                {task.status}
            </span>
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>

            <button onClick={() => setShowModal(true)}>Elimina task</button>

            <Modal
                title='Conferma eliminazione'
                content={<span>Vuoi davvero eliminare queta task?</span>}
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                confirmText='Elimina'
            />
        </div>

    )

}