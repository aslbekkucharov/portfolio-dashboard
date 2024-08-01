import { RouteObject } from "react-router-dom"

import App from "@/App"
import Posts from "@/views/Posts"
import Files from "@/views/Files"
import { api } from "@/plugins/api"
import Experience from "@/views/Experience"
import Description from "@/views/Description"
import Auth from "@/views/Auth"
import PrivateRoutes from "@/components/PrivateRoutes"
import CreatePost from "@/views/CreatePost"
import EditPost from "@/views/EditPost"

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
                path: '/experience',
                element: <Experience />
            },
            {
                path: '/description',
                element: <Description />
            },
            {
                path: '/files',
                element: <Files />
            },
        ]
    },
    {
        path: '/login',
        element: <Auth />
    },
]