export default function Post({ post }) {
    const border = { border: '1px solid black' }

    return (
        <div style={border}>
            <h2>I am a post component</h2>
            <img src={post.imageUrl} alt="post.img" />
            <p>Title: {post.postTitle}</p>
            <p>Body: {post.postBody}</p>
            <p>Rating: {post.rating}</p>
        </div>
    )
}
