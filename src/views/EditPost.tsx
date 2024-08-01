import { Post } from "@/types"
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"

import PostForm from "@/components/PostForm"
import { api } from "@/plugins/api"

function EditPost() {
    const { id } = useParams()
    const [initialValues, setInitialValues] = useState<Post & { id?: number }>({ title: '', content: '', isActive: true })

    useEffect(() => {
        api.get(`/posts/${id}`).then((res) => setInitialValues((preValues) => ({ ...preValues, ...res.data })))
    }, [])

    return <PostForm isEditing={true} initialValues={initialValues} />
}

export default EditPost