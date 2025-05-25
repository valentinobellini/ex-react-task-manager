import { useEffect, useState } from "react"
const { VITE_API_URL } = import.meta.env

export default function useTasks() {
    const [tasks, setTasks] = useState([]);



    //FUNZIONE PER IL FETCH DELLE TASKS
    const fetchTasks = async () => {
        try {
            const res = await fetch(`${VITE_API_URL}/tasks`)
            const data = await res.json();
            console.log('Task ricevuti :', data);

            setTasks(data)

        } catch (err) {
            console.error('Errore nel caricamento dei tasks', err)
        }
    }



    // FUNZIONE AGGIUNGI TASK
    const addTask = async (newTask) => {

        const res = await fetch(`${VITE_API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        const { success, message, task } = await res.json();
        console.log(res);
        console.log(task);




        if (!success) throw new Error(message)

        setTasks(prev => [...prev, task])
    };




    // FUNZIONE DELETE TASK
    const removeTask = async (taskId) => {

        const res = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        });

        const { success, message } = await res.json();

        if (!success) throw new Error(message)

        setTasks(prev => prev.filter(task => task.id !== taskId))

    };




    // FUNZIONE AGGIONRA TASK
    const updateTask = async () => { };


    // use effect per invocare il fetch solo al caricamento del componente
    useEffect(() => {
        fetchTasks()
    }, [])

    return {
        tasks,
        setTasks,
        addTask,
        removeTask,
        updateTask
    }
}