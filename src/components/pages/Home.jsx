import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../partials/Post'

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
        <div>
            <h1>Home page</h1>

            {posts.map((post) => (
                <div key={post.id}>
                    <a href={`/posts/${post._id}`}>
                        <Post post={post} />
                    </a>
                </div>
            ))}
        </div>
    )
}
