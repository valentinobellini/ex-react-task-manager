import { useEffect, useState } from "react"
const { VITE_API_URL } = import.meta.env

export default function useTasks() {
    const [tasks, setTasks] = useState([]);

    //funzione per il fetch delle tasks
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


    const removeTask = async () => { };
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