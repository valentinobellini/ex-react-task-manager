import { useRef, useState, useMemo } from 'react';
import Modal from './Modal';

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function EditTaskModal({ show, onClose, task, onSave }) {
    const editFormRef = useRef(null);
    const [editedTask, setEditedTask] = useState({ ...task });

    const { title, description, status } = editedTask;

    const changeEditedTask = (key, e) => {
        setEditedTask(prev => ({
            ...prev,
            [key]: e.target.value
        }));
    };

    const titleError = useMemo(() => {
        if (!title.trim()) return 'Il nome della task non può essere vuoto.';
        if ([...title].some(char => symbols.includes(char)))
            return 'Il nome della task non può contenere caratteri speciali.';
        return '';
    }, [title]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (titleError) return;
        onSave({
            ...editedTask,
            title: title.trim(),
            description: description.trim()
        });
    };

    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Modifica Task"
            confirmText="Salva"
            onConfirm={() => editFormRef.current.requestSubmit()}
            content={
                <form ref={editFormRef} onSubmit={handleSubmit}>
                    <label>
                        Nome Task:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => changeEditedTask('title', e)}
                            placeholder="Titolo"
                        />
                    </label>
                    {titleError && <p style={{ color: 'red' }}>{titleError}</p>}

                    <label>
                        Descrizione:
                        <textarea
                            value={description}
                            onChange={(e) => changeEditedTask('description', e)}
                            placeholder="Descrizione"
                        />
                    </label>

                    <label>
                        Stato:
                        <select
                            value={status}
                            onChange={(e) => changeEditedTask('status', e)}
                        >
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </label>
                </form>
            }
        />
    );
}
