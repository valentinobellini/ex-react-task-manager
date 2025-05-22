import { createContext, useContext } from 'react';
import useTasks from '../hooks/useTasks';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const taskData = useTasks()


    return (
        <GlobalContext.Provider value={{ ...taskData }} >
            {children}
        </GlobalContext.Provider>
    )
}

// custom hooks per l'utilizzo del GlobalContext
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

