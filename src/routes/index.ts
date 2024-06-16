import { RouteObject, redirect } from "react-router-dom"

import Posts from "@/views/Posts"
import { api } from "@/plugins/api"
import CreatePost from "@/views/form/CreatePost"
import App from "@/App"

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
                Component: CreatePost
            },
            {
                path: '/edit-post/:id',
                Component: CreatePost,
                loader: async ({ params }) => {
                    const response = await api.get(`/posts/${params.id}`)
                    return response.data
                }
            }
        ]
    }
]