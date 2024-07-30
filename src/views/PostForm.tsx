import { useState } from "react"
import { Button, Input, Typography } from "antd"

import { Post } from "@/types"
import Editor from "@/components/editor/Editor"
import { api } from "@/plugins/api"

export default function PostForm() {

    const [post, setPost] = useState<Post>({ title: '', content: '', isActive: true })

    function handlePostTitleChange(payload: string) {
        setPost((prevPost) => ({ ...prevPost, title: payload }))
    }

    function handlePostContentChange(payload: string) {
        setPost((prevPost) => ({ ...prevPost, content: payload }))
    }

    function handlePostAction() {
        const response = api.post('/posts/create', post)
        console.log(response)
    }

    return (
        <div className="flex flex-col gap-6">
            <Typography.Title level={3}>Создание поста</Typography.Title>
            <Input size="large" value={post.title} onChange={(e) => handlePostTitleChange(e.target.value)} placeholder="Введите заголовок" />
            <Editor value={post.content} onChange={handlePostContentChange} />
            <div className="ml-auto max-w-xs w-full">
                <Button onClick={handlePostAction} type="primary" size="large" block>Создать пост</Button>
            </div>
        </div>
    )
}