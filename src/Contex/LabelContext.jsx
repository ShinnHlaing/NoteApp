import React from 'react'
import { useEffect, createContext, useState } from 'react'
import ax from '../ax'



const LabelContext = createContext(null);
export const LabelContextProvider = (props) => {
    const [label, setLabel] = useState([])
    const [load, setLoad] = useState(true)
    const [activeLabel, setActiveLabel] = useState(null)



    return (
        <LabelContext.Provider value={{ label, setLabel, load, setLoad, activeLabel, setActiveLabel }}>
            {props.children}
        </LabelContext.Provider>
    )
}

export default LabelContext;
