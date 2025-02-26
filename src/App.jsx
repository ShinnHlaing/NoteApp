import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter'
import { AuthContextProvider } from './Contex/AuthContext'
import { MessageContextProvider } from './Contex/MessageContext'
import { LabelContextProvider } from './Contex/LabelContext'

function App() {
  return (
    <LabelContextProvider>
      <MessageContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <MainRouter />
          </BrowserRouter >
        </AuthContextProvider>
      </MessageContextProvider>
    </LabelContextProvider>
  )
}

export default App

