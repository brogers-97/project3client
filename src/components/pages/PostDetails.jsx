import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Post from '../partials/Post'
import PostForm from '../partials/PostForm'
import Comments from '../partials/Comments'

export default function PostDetails({ currentUser, setCurrentUser }) {
    const [post, setPost] = useState({})
    const [author, setAuthor] = useState('')
    const [postLoaded, setPostLoaded] = useState(false)
    const [showForm, setShowForm] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`)
            .then((response) => {
                const [responsePost, responseAuthor] = response.data
                setPost(responsePost)
                setAuthor(responseAuthor)
                if (post !== {}) {
                    setPostLoaded(true)
                }
            })
            .catch(console.warn)
    }, [])

    const handleSubmit = async (e, form) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwt')
            // make the auth headers
            const options = {
                headers: {
                    Authorization: token,
                },
            }
            const response = await axios.put(
                `${process.env.REACT_APP_SERVER_URL}/posts`,
                form,
                options
            )
            // const userPosts = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`)
            setPost(response.data)
            setShowForm(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('jwt')
            // make the auth headers
            const options = {
                headers: {
                    Authorization: token,
                },
            }
            await axios.delete(
                `${process.env.REACT_APP_SERVER_URL}/posts/${id}`,
                options
            )
            navigate('/home')
        } catch (error) {
            console.log(error)
        }
    }

    const loading = (
        <div>
            <h2>loading post...</h2>
        </div>
    )

    const loaded = (
        <>
            <Row>
                <Col />
                <Col md="auto">
                    <Post
                        post={post}
                        author={author}
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        id={id}
                    />
                    {/* first layer of ternary checks whether there's a user loaded in state.  once the current user is loaded in state, second layer of ternary checks whether the logged in user's name matches that of the author.  if so, client shows edit button. 
                    
                    with more time, ideally we'd do server side checking to confirm that the logged in user matches the user who wrote the post, as this implementation is susceptible to a user changing state in dev tools to cause the edit button to appear on someone else's post */}
                    {currentUser ? (
                        currentUser.name === author ? (
                            <>
                                <button onClick={() => setShowForm(true)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete()}>
                                    Delete
                                </button>
                            </>
                        ) : null
                    ) : null}
                    <Comments
                        currentUser={currentUser}
                        id={id}
                        comments={post.comments}
                    />
                </Col>
                <Col />
            </Row>
        </>
    )

    const postView = <>{postLoaded ? loaded : loading}</>

    const formView = (
        <>
            <PostForm
                initialState={post}
                handleSubmit={handleSubmit}
                handleCancel={() => setShowForm(false)}
            />
        </>
    )

    return (
        /* if the user is NOT editing the post, showForm is false:
    return a view that includes the Post component for the post whose ID was passed as a param
    
    if the user IS editing the post, showForm is true: return a view that includes the PostForm
    component and sending it as props the post whose ID was passed as a param */
        <Container className="bg-secondary">
            {showForm ? formView : postView}
        </Container>
    )
}
