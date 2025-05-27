import { useState, useRef, useMemo } from "react"
import { useGlobalContext } from "../contexts/GlobalContext";


const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {

    const [title, setTitle] = useState('');
    const { addTask } = useGlobalContext();

    const titleError = useMemo(() => {
        if (!title.trim())
            return 'Il nome della task non può essere vuoto.'
        if ([...title].some(char => symbols.includes(char)))
            return 'Il nome della task non può contenere caratteri speciali.'
        return ''
    }, [title])

    const descriptionRef = useRef();
    const statusRef = useRef();


    async function handleSubmit(e) {
        e.preventDefault();

        if (titleError) return;

        const newTask = {
            title: title.trim(),
            description: descriptionRef.current.value.trim(),
            status: statusRef.current.value
        };

        try {
            await addTask(newTask);
            alert("Task creata con successo!");
            setTitle(""); // reset campo controllato
            descriptionRef.current.value = ""; // reset ref
            statusRef.current.value = "To do"; // reset ref
        } catch (err) {
            alert(err.message || "Errore nella creazione del task.");
        }
    }

    return (

        // <h2>Aggiungi un task</h2>

        <div className="form_wrapper">

            <form onSubmit={handleSubmit}>

                <section>Nome Task:
                    <input type="text"
                        placeholder="Titolo"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </section>
                {titleError && <p style={{ color: 'red' }}>{titleError}</p>}

                <section>Descrizione task:
                    <textarea
                        placeholder="Descrizione"
                        ref={descriptionRef}
                    ></textarea>
                </section>

                <section> Stato:
                    <select ref={statusRef} defaultValue={'To do'}>
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </section>

                <button type='submit' disabled={titleError}>Aggiungi Task</button>

            </form>
        </div>
    )
}
