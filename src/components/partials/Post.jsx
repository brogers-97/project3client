import Comments from "./Comments"

export default function Post({ post, author }) {
    const border = { border: '1px solid black' }

    return (
        <div style={border}>
            <article className="bg-primary text-light rounded-4">
                <h2 className="fw-bolder mb-1">{post.postTitle}</h2>
                {/* Slice operation below truncates the post document
                createdAt property to show just YYYY/MM/DD */}
                <p className="text-muted fst-italic mb-2">Posted on {post.createdAt.slice(0, -14)} by {author}</p>
                <img src={post.imageUrl} alt="post.img" />
                <p>{post.postBody}</p>
                <p>Rating: {post.rating}</p>
            </article>

            <Comments />


             
        </div>
        
    )
}
