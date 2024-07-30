import { RouteObject } from "react-router-dom"

import App from "@/App"
import Posts from "@/views/Posts"
import Files from "@/views/Files"
import { api } from "@/plugins/api"
import PostForm from "@/views/PostForm"
import Experience from "@/views/Experience"
import Description from "@/views/Description"

export const routes: RouteObject[] = [
    {
        path: '/',
        Component: App,

        children: [
            {
                index: true,
                Component: Posts,
                loader: async () => {
                    const response = await api.get('/posts')
                    return response.data
                }
            },
            {
                path: '/create-post',
                Component: PostForm
            },
            {
                path: '/edit-post/:id',
                Component: PostForm,
                loader: async ({ params }) => {
                    const response = await api.get(`/posts/${params.id}`)
                    return response.data
                }
            },
            {
                path: '/experience',
                Component: Experience
            },
            {
                path: '/description',
                Component: Description
            },
            {
                path: '/files',
                Component: Files
            },
        ]
    }
]