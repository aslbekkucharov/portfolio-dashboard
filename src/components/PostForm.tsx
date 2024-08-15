import { useNavigate } from "react-router-dom"
import { Button, Input, Typography } from "antd"
import { useEffect, useMemo, useState } from "react"

import { Post } from "@/types"
import { api } from "@/plugins/api"
import Editor from "@/components/editor/Editor"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"

type Props = {
    isEditing: boolean
    initialValues?: Post & { id?: number }
}

type FormConfig = {
    formTitle: string
    formEndpoint: string
    formButtonLabel: string
    formMethod: 'post' | 'put' | 'patch' | 'get'
}

export default function PostForm(props: Props) {

    const { TextArea } = Input
    const navigator = useNavigate()
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [post, setPost] = useState<Post>({
        title: '',
        content: '',
        excerpt: '',
        isActive: true
    })

    useEffect(() => {
        props.isEditing ? setPost((prevVal) => ({ ...prevVal, ...props.initialValues })) : null
    }, [props.initialValues])

    const formConfig = useMemo<FormConfig>(() => {
        return {
            formMethod: props.isEditing ? 'patch' : 'post',
            formTitle: props.isEditing ? 'Редактирование поста' : 'Создание поста',
            formButtonLabel: props.isEditing ? 'Сохранить изменения' : 'Создать пост',
            formEndpoint: props.isEditing ? `/posts/${props.initialValues?.id}` : '/posts'
        }
    }, [props.initialValues])

    function handlePostTitleChange(payload: string) {
        setPost((prevPost) => ({ ...prevPost, title: payload }))
    }

    function handlePostContentChange(payload: string) {
        setPost((prevPost) => ({ ...prevPost, content: payload }))
    }

    function handlePostExcerptChange(payload: string) {
        setPost((prevPost) => ({ ...prevPost, excerpt: payload }))
    }

    async function handlePostAction() {
        try {

            setIsFetching(true)

            const response = await api[formConfig.formMethod](formConfig.formEndpoint, post)

            if (response.status >= 200 && response.status <= 300) {
                navigator('/')
            }

        } finally {
            setIsFetching(false)
        }
    }

    return (
        <div className="p-5 bg-white rounded-xl flex flex-col gap-8">
            <Typography.Title level={3}>{formConfig.formTitle}</Typography.Title>

            <Input
                size="large"
                placeholder="Введите заголовок"
                value={post.title} onChange={(e) => handlePostTitleChange(e.target.value)}
            />

            <TextArea
                rows={5}
                showCount
                size="large"
                maxLength={200}
                value={post.excerpt}
                classNames={{ textarea: 'resize-none' }}
                placeholder="Введите краткое описание статьи"
                onChange={(e) => handlePostExcerptChange(e.target.value)}
            />

            <Editor value={post.content} onChange={handlePostContentChange} />

            <div className="ml-auto max-w-xs w-full">
                <Button onClick={handlePostAction} loading={isFetching} icon={isFetching ? <LoadingOutlined /> : <PlusOutlined />} type="primary" size="large" block>
                    {isFetching ? null : <span>{formConfig.formButtonLabel}</span>}
                </Button>
            </div>
        </div>
    )
}