import { createContext, useContext, useState } from 'react'

const GasStationContext = createContext({ gas_station: [] })

export const GasStationProvider = ({ children }) => {
    const [gas_station, setGasStation] = useState([])

    return (
        <GasStationContext.Provider
            value={{
                gas_station,
                setGasStation
            }}
        >
            {children}
        </GasStationContext.Provider>)
}

export function useGasStationContext() {
    const context = useContext(GasStationContext);
    return context;
}