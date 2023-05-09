import Container from 'react-bootstrap/Container'

export default function Post({ post, author }) {

    return (
        <Container className="bg-primary text-light rounded-4 mb-4">
            <article>
                <h2 className="fw-bolder mb-1">{post.postTitle}</h2>
                {/* Slice operation below truncates the post document
                createdAt property to show just YYYY/MM/DD */}
                <p className="text-muted fst-italic mb-2">
                    Posted on {post.createdAt.slice(0, -14)} by {author}
                </p>
                <img className="img-fluid" src={post.imageUrl} alt="post.img" />
                <p>{post.postBody}</p>
                <p>Rating: {post.rating}</p>
            </article>

            <article className="bg-primary text-light rounded-4">
            </article>
        </Container>
    )
}
