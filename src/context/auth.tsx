import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
    tokenKey: string
}

interface AuthContextType {
    saveToken: (token: string) => void
    deleteToken: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
    saveToken() { },
    deleteToken() { },
    isAuthenticated: false
})

export const AuthProvider = ({ tokenKey, children }: Props & PropsWithChildren) => {

    const [token, setToken] = useState<string | null>(() => localStorage.getItem(tokenKey))

    function saveToken(userToken: string) {
        setToken(() => {
            localStorage.setItem(tokenKey, userToken)
            return userToken
        })
    }

    function deleteToken() {
        setToken(() => {
            localStorage.removeItem(tokenKey)
            return null
        })
    }

    const isAuthenticated = !!token

    return (
        <AuthContext.Provider value={{ isAuthenticated, saveToken, deleteToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}