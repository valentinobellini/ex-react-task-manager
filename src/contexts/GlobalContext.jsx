import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`)
            console.log('Task ricevuti :', res.data);

            setTasks(res.data)

        } catch (err) {
            console.error('Errore nel caricamento dei tasks', err)
        }
    }


    useEffect(() => {
        fetchTasks()
    }, [])

    return (

        <GlobalContext.Provider value={{ tasks, setTasks }} >
            {children}
        </GlobalContext.Provider>
    )

}


export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

