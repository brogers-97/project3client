import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Post from '../partials/Post'
import PostForm from '../partials/PostForm'

export default function PostDetails() {
    const [post, setPost] = useState({})
    const [postLoaded, setPostLoaded] = useState(false)
    const [showForm, setShowForm] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`)
            .then((response) => {
                setPost(response.data)
                if (post !== {}) {
                    setPostLoaded(true)
                }
            })
            .catch(console.warn)
    }, [])

    // const handleSubmit = async (e, form) => {
    //     e.preventDefault()
    //     try {
    //         const putResponse = await axios.put(`${process}/posts/${id}`)
    //         setPost(putResponse.data)
    //         setShowForm(false)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const handleDeleteClick = async () => {
    //     try {
    //         await axios.delete(
    //             `${process.env.REACT_APP_SERVER_URL}/posts/${id}`
    //         )

    //         //navigates home page
    //         navigate('/')
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // const initialState = {
    //     postTitle: post.postTitle,
    //     postBody: post.postBody,
    //     taggedGame: post.taggedGame,
    //     rating: post.rating,
    //     imageUrl: post.imageUrl,
    // }

    // const details = (
    //     <>
    //         {/* <h1>{postTitle}</h1>
    //         <p>{taggedGame}</p>
    //         <p>{rating}</p>
    //         <h2>{postBody}</h2>
    //         <h2>{imageUrl}</h2> */}

    //         <button onClick={handleDeleteClick}>Delete Bounty</button>
    //     </>
    // )

    // const form = (
    //     <>
    //         <h1>Post Edit Form for {post.postTitle}</h1>

    //         <PostForm
    //             initialState={initialState}
    //             handleSubmit={handleSubmit}
    //             handelCancelClick={() => setShowForm(false)}
    //         />
    //     </>
    // )

    const loading = (
        <div>
            <h2>loading post...</h2>
        </div>
    )

    const loaded = (
        <>
            <Post post={post} />
        </>
    )

    const postView = (
        <>
            {postLoaded ? loaded : loading}
            {/* need to lock this button to the logged-in user if they are the author of the post */}
            <button onClick={() => setShowForm(true)}>Edit</button>
        </>
    )

    const formView = (
        <>
            <p>this is where we edit the post</p>
            <PostForm initialState={post} />
            <button onClick={() => setShowForm(false)}>Back to post</button>
            {/* {!showForm && (
                <button onClick={() => setShowForm(true)}>Edit</button>
                )}
            {showForm ? form : details} */}
        </>
    )

    /* if the user is NOT editing the post, showForm is false:
    return a view that includes the Post component for the post whose ID was passed as a param
    
    if the user IS editing the post, showForm is true: return a view that includes the PostForm
    component and sending it as props the post whose ID was passed as a param */
    return showForm ? formView : postView
}
