import { createContext, useContext, useState, useEffect } from 'react'

const FuelContext = createContext({ fuels: [] })

export const FuelProvider = ({ children }) => {
    const [fuels, setFuels] = useState([])
    const [directionCoordinates, setDirectionCoordinates] = useState([])

    return (
        <FuelContext.Provider
            value={{
                fuels,
                setFuels,
                directionCoordinates,
                setDirectionCoordinates,
            }}
        >
            {children}
        </FuelContext.Provider>)
}

export function useFuelContext() {
    const context = useContext(FuelContext);
    return context;
}