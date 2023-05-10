import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../partials/Post'
import Container from 'react-bootstrap/Container'

export default function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/posts`)
            .then((response) => {
                const postData = response.data
                setPosts(postData)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <Container className='pt-4'>
            {posts.map((post, i) => (
                <div key={`post at ${i}`}>
                    <a href={`/posts/${post._id}`}>
                        <Post post={post} />
                    </a>
                </div>
            ))}
        </Container>
    )
}
