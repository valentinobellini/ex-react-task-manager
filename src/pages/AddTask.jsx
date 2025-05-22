import { useState, useRef, useMemo } from "react"

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {

    const [title, setTitle] = useState('');
    const titleError = useMemo(() => {
        if (!title.trim())
            return 'Il nome della task non può essere vuoto.'
        if ([...title].some(char => symbols.includes(char)))
            return 'Il nome della task non può contenere caratteri speciali.'
        return ''
    }, [title])

    const descriptionRef = useRef();
    const statusRef = useRef();


    function handleSubmit(e) {
        e.preventDefault();

        const newTask = {
            title: title.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value
        }

        console.log(newTask);

    }

    return (

        // <h2>Aggiungi un task</h2>

        <div className="form_wrapper">

            <form onSubmit={handleSubmit}>
                <section>
                    <input type="text"
                        placeholder="Titolo"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </section>
                {titleError && <p style={{ color: 'red' }}>{titleError}</p>}

                <section>
                    <textarea
                        placeholder="Descrizione"
                        ref={descriptionRef}
                    ></textarea>
                </section>

                <section>
                    <select ref={statusRef} defaultValue={'To Do'}>
                        <option value="Seleziona uno stato"></option>
                        <option value="To Do">To Do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </section>

                <button type='submit' disabled={titleError}>Aggiungi Task</button>

            </form>
        </div>
    )
}
