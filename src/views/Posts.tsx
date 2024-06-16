import { Post } from "../types"
import PostCard from "../components/cards/Post"
import { useLoaderData } from "react-router-dom"

export default function Posts() {

    const posts = useLoaderData() as Post[] // Workaround, because react-router-dom is not provides any other way to type return data

    const postCards = posts.map(post => <PostCard post={post} key={post.id} />)

    return (
        <div className="grid grid-cols-3 gap-3">
            {postCards}
        </div>
    )
}