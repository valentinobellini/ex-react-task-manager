import { createContext, useContext, useEffect, useState } from 'react';
const { VITE_API_URL } = import.meta.env

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
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

    // use effect per invocare il fetch solo al caricamento del componente
    useEffect(() => {
        fetchTasks()
    }, [])


    return (
        <GlobalContext.Provider value={{ tasks, setTasks }} >
            {children}
        </GlobalContext.Provider>
    )
}

// custom hooks per l'utilizzo del GlobalContext
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

