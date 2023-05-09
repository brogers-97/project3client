import React, { useState, useEffect } from 'react'
import PostForm from '../partials/PostForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { useLocation } from 'react-router-dom'

export default function New() {
    const [originIsSearch, setOriginIsSearch] = useState(false)
    const [isReview, setIsReview] = useState(false)
    const [gameId, setGameId] = useState(undefined)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.state) {
            setOriginIsSearch(true)
            setGameId(location.state.gameId)
            setIsReview(location.state.isReview)
        }
    }, [])

    const handleSubmit = async (e, form) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwt')
            const options = {
                headers: {
                    Authorization: token,
                },
            }
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/posts`,
                form,
                options
            )
            navigate(`/posts/${response.data}`)
        } catch (error) {
            console.log(error)
        }
    }

    const initialState = {
        postTitle: '',
        postBody: '',
        taggedGame: 0,
        rating: '',
        imageUrl: '',
    }

    return (
        <div>
            <h1>New Post page</h1>
            <Container>
                <PostForm
                    initialState={initialState}
                    handleSubmit={handleSubmit}
                />
            </Container>
        </div>
    )
}
