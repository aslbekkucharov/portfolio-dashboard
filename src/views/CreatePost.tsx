import PostForm from "@/components/PostForm"

function CreatePost() {
    return (
        <div className="pb-10">
            <PostForm isEditing={false} />
        </div>
    )
}

export default CreatePost