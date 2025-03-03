import { createContext } from "react";


export const AppContext = createContext()

export const AppContextProvider = (props) =>{

    const currency = 'Rs'

    const calculateAge = (dob) =>{
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()

        return age
    }
    const value = {
        calculateAge,
        currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

// Creates a provider (AppContext.Provider) to wrap the entire app.
// The value prop holds shared data that all components can access.
// {props.children} ensures that child components inside AppContextProvider get access to the context.