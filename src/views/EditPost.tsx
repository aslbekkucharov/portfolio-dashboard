import { Post } from "@/types"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { api } from "@/plugins/api"
import PostForm from "@/components/PostForm"

function EditPost() {
    const { id } = useParams()
    const [initialValues, setInitialValues] = useState<Post & { id?: number }>({
        title: '',
        content: '',
        excerpt: '',
        isActive: true
    })

    useEffect(() => {
        api.get(`/posts/${id}`).then((res) => setInitialValues((preValues) => ({ ...preValues, ...res.data })))
    }, [])

    return <PostForm isEditing={true} initialValues={initialValues} />
}

export default EditPost