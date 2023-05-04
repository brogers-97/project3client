import React, {useState, useEffect} from 'react'
import PostForm from '../partials/PostForm'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export default function New() {

    const [postData, setPostData] = useState([])
    const navigate = useNavigate()

    // useEffect(() => {
    //     const url = `${process.env.REACT_APP_SERVER_URL}`
    //     axios.get(url)
    //     .then(response => {
    //         setPostData()

    //     })
    //     .catch(console.warn)
    // })

    const handleSubmit = async (e, form) => {
        e.preventDefault()
        try{
            const token = localStorage.getItem('jwt')
                // make the auth headers
                const options = {
                    headers: {
                        Authorization: token,
                    },
                }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, form, options)
            // const userPosts = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`)
            navigate(`/posts/${response.data}`)

        } catch (error) {
            console.log(error)
        }
    }

    const initialState = {
        postTitle: "",
        postBody: "",
        taggedGame: 0,
        rating: "",
        imageUrl: ""
    }

    return (
        <div>
            <h1>New Post page</h1>
            <PostForm 
                initialState={initialState}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}
