import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useState, createContext, useEffect } from "react";

const MessageContext = createContext();

export const MessageContextProvider = (props) => {
    const [message, setMessage] = useState({})
    useEffect(() => {
        switch (message.type) {
            case "success":
                toast.success(message.message);
                break;
            case "error":
                toast.error(message.message);
                break;
        }
    }, [message])
    return (
        <MessageContext.Provider value={{ message: message, setMessage: setMessage }}>
            <ToastContainer />
            {props.children}
        </MessageContext.Provider>
    )
}

export default MessageContext;