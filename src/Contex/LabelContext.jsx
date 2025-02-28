import React from 'react'
import { useEffect, createContext, useState } from 'react'
import ax from '../ax'



const LabelContext = createContext(null);
export const LabelContextProvider = (props) => {
    const [label, setLabel] = useState([])
    const [load, setLoad] = useState(true)
    const [activeLabel, setActiveLabel] = useState(null)
    const token = localStorage.getItem("token");

    useEffect(() => {
        ax.get("/category", { headers: { Authorization: "Bearer " + token } })
            .then((res) => {
                const { data } = res.data;
                setLabel(data);
                setLoad(false)
                // console.log(data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setLoad(false);
            });
    }, [])

    return (
        <LabelContext.Provider value={{ label, setLabel, load, setLoad, activeLabel, setActiveLabel }}>
            {props.children}
        </LabelContext.Provider>
    )
}

export default LabelContext;
