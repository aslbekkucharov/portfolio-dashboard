import { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"

import { useAuth } from "@/context/auth"

function PrivateRoutes({ children }: PropsWithChildren) {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? children : <Navigate to='/login' />
}

export default PrivateRoutes