export default function Post({ post }) {
    const border = { border: '1px solid black' }
    console.log(post)

    return (
        <div style={border}>
            <h2>I am a post component</h2>
            <img src={post.imageURL} alt="post.img" />
            <p>Title: {post.postTitle}</p>
            <p>Body: {post.postBody}</p>
            <p>Rating: {post.rating}</p>
        </div>
    )
}
