import { useEffect, useRef, useState } from "react"
import { Button, Input, Switch, notification } from "antd"
import { Form, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { Post } from "@/types"
import { api } from "@/plugins/api"
import BaseEditor from "@/components/editor/Editor"

interface Form {
    title: string
    content: string
    isActive: boolean
}

export default function CreatePost() {

    const { id } = useParams()
    const timeoutId = useRef(-1)
    const navigate = useNavigate()
    const post = useLoaderData() as Post
    const [isPostCreating, setIsPostCreating] = useState(false)
    const [isPostDeleting, setIsPostDeleting] = useState(false)
    const [meta, setMeta] = useState({ title: '', buttonLabel: '' })
    const [notificationApi, contextHolder] = notification.useNotification()
    const [form, setForm] = useState<Form>({ title: '', content: '', isActive: true })

    useEffect(() => {

        if (id) {
            setForm({ title: post.title, content: post.content, isActive: post.isActive })
            setMeta({ title: 'Редактирование поста', buttonLabel: 'Сохранить изменения' })
        } else {
            setMeta({ title: 'Создание поста', buttonLabel: 'Опубликовать пост' })
        }

        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current)
            }
        }

    }, [])

    function handleTitleChange(value: string) {
        setForm((f) => ({ ...f, title: value }))
    }

    function handleContentChange(value: string) {
        setForm((f) => ({ ...f, content: value }))
    }

    function handleIsActiveChange(value: boolean) {
        setForm((f) => ({ ...f, isActive: value }))
    }

    async function handlePostDelete() {

        try {
            setIsPostDeleting(true)

            const response = await api.delete(`/posts/${id}`)

            if (response.status === 200) {

                timeoutId.current = setTimeout(() => {
                    navigate('/')
                }, 1000)

                notificationApi.success({
                    message: 'Пост успешно удален!',
                    description: 'Через секунду вы будете перенаправлены на главную страницу'
                })

            } else {
                notificationApi.error({
                    message: 'Произошла непредвиденная ошибка при удалении поста!',
                    description: 'При удалении поста возникла непредвиденная ошибка, попробуйте позже...'
                })
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsPostDeleting(false)
        }

    }

    async function handlePostCreate() {

        const method = id ? 'patch' : 'post'
        const endpoint = id ? `/posts/${id}` : '/posts'
        const successMessage = id ? 'Пост успешно сохранён!' : 'Пост успешно создан!'
        const errorMessage = id ? 'Произошла непредвиденная ошибка при сохранении поста!' : 'Произошла непредвиденная ошибка при создании поста!'

        try {
            setIsPostCreating(true)

            const response = await api[method](endpoint, form)

            if (response.status === 201 || response.status === 200) {
                navigate('/')
                notificationApi.success({ message: successMessage })
            } else {
                notificationApi.error({ message: errorMessage })
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsPostCreating(false)
        }
    }

    return (
        <>
            <h2 className="mb-4 font-semibold">{meta.title}</h2>
            <div className="flex flex-col gap-4">

                <label className="flex flex-col gap-y-1">
                    <span className="text-sm font-medium">Введите Заголовок</span>
                    <Input size="large" placeholder="Введите заголовок" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} />
                </label>

                <span className="flex flex-col gap-y-1">
                    <span className="text-sm font-medium">Введите контент</span>
                    <BaseEditor value={form.content} onChange={handleContentChange} />
                </span>

                <label className="inline-flex items-center gap-2 select-none">
                    <Switch onChange={handleIsActiveChange} value={form.isActive} className="w-10" />
                    <span className="font-medium">Опубликовать на сайте</span>
                </label>

                <div className="flex gap-2">
                    <Button size="large" loading={isPostCreating} block type="primary" onClick={handlePostCreate}>
                        <span className="font-medium text-white">{meta.buttonLabel}</span>
                    </Button>
                    <Button size="large" loading={isPostDeleting} block type="text" onClick={handlePostDelete}>
                        <span className="font-medium">Удалить пост</span>
                    </Button>
                </div>
            </div>
            {contextHolder}
        </>
    )
}