import { Link } from "react-router-dom"

export default function PostCard(props: { post: { id: number, title: string, content: string, isActive: boolean } }) {

    return (
        <Link to={'/edit-post/' + props.post.id} className="p-3 bg-white border border-slate-50 rounded-md hover:shadow-post transition-shadow">
            <h3 className="mb-2 font-medium">{props.post.title}</h3>
            <p className="text-slate-400 text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: props.post.content }}></p>
        </Link>
    )
}