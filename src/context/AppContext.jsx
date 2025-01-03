import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext()

//we create context in React to share information easily across different parts of our app without passing it around manually like a chain of messages.

const AppContextProvider = (props) =>{

    const currencySymbol = "Rs"

    const value = {
        doctors,currencySymbol
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider