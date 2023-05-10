import React, { useState, useEffect } from 'react'
import PostForm from '../partials/PostForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { useLocation } from 'react-router-dom'

export default function New() {
    const [originIsSearch, setOriginIsSearch] = useState(false)
    const [gameName, setGameName] = useState('')
    const [gameId, setGameId] = useState(undefined)
    const [gameImage, setGameImage] = useState(undefined)
    const [isReview, setIsReview] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.state) {
            setOriginIsSearch(true)
            setGameName(location.state.gameName)
            setGameImage(location.state.gameImage)
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
        taggedGame: gameId || undefined,
        rating: '',
        imageUrl: gameImage || '',
        isReview: isReview,
    }

    return (
        <div>
            <Container className='pt-4'>
                <PostForm
                    originIsSearch={originIsSearch}
                    gameName={gameName}
                    initialState={initialState}
                    handleSubmit={handleSubmit}
                />
            </Container>
        </div>
    )
}
