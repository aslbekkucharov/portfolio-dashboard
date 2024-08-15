import { RouteObject } from "react-router-dom"

import App from "@/App"
import Auth from "@/views/Auth"
import About from "@/views/About"
import Posts from "@/views/Posts"
import { api } from "@/plugins/api"
import EditPost from "@/views/EditPost"
import CreatePost from "@/views/CreatePost"
import PrivateRoutes from "@/components/PrivateRoutes"

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <PrivateRoutes>
            <App />
        </PrivateRoutes>,

        children: [
            {
                index: true,
                element: <Posts />,
                loader: async () => {
                    const response = await api.get('/posts')
                    return response.data
                }
            },
            {
                path: '/create-post',
                element: <CreatePost />
            },
            {
                path: '/edit-post/:id',
                element: <EditPost />,
                loader: async ({ params }) => {
                    const response = await api.get(`/posts/${params.id}`)
                    return response.data
                }
            },
            {
                path: '/about',
                element: <About />
            }
        ]
    },
    {
        path: '/login',
        element: <Auth />
    },
]