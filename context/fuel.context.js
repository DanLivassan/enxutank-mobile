import { createContext, useContext, useState, useEffect } from 'react'

const FuelContext = createContext({ fuels: [] })

export const FuelProvider = ({ children }) => {
    const [fuels, setFuels] = useState([])
    const [directionCoordinates, setDirectionCoordinates] = useState([])
    const [mean_price, setMeanPrice] = useState()

    useEffect(() => {
        let mean = 0
        for (let i = 0; i < fuels.length; i++) {
            mean = fuels[i] + mean
        }
        setMeanPrice(mean / fuels.length)
    }, [fuels])
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