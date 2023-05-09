import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Post from '../partials/Post'
import axios from 'axios'
import '../../profile.css'
import Setting from '../partials/Settings'
const token = localStorage.getItem('jwt')

export default function Profile({ currentUser, handleLogout }) {
    console.log('profile mounted')
    const [msg, setMsg] = useState('')
    const [usersPosts, setUsersPosts] = useState([])
    const [userId, setUserId] = useState(null)
    const navigate = useNavigate()
    const [favoriteGames, setFavoriteGames] = useState([])

    // useEffect for getting the user data and checking auth
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwt')
                const options = {
                    headers: {
                        Authorization: token,
                    },
                }

                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/users/auth-locked`,
                    options
                )

                // added setting the userId state
                const decoded = jwt_decode(token)
                setUserId(decoded._id)
                setMsg(response.data.msg)
            } catch (err) {
                console.warn(err)
                if (err.response) {
                    if (err.response.status === 401) {
                        handleLogout()
                        navigate('/login')
                    }
                }
            }
        }
        fetchData()
    }, [handleLogout, navigate])

    useEffect(() => {
        if (userId) {
            const url = `${process.env.REACT_APP_SERVER_URL}/users/posts?userId=${userId}`
            // console.log(url)
            axios
                .get(url)
                .then((response) => {
                    setUsersPosts(response.data)
                })
                .catch(console.warn)
            return () => {
                setUsersPosts([])
            }
        }
    }, [userId])

    useEffect(() => {
        // Fetch the favoriteGames data from the server when the component mounts
        if(userId) {
            axios
                .get(`${process.env.REACT_APP_SERVER_URL}/users/favorites?userId=${userId}`)
                .then((response) => {
                    // Update the component state with the favoriteGames data
                    // console.log(response.data.favoriteGames)
                    setFavoriteGames(response.data.favoriteGames)
                })
                .catch((error) => {
                    console.log(error)
                })
            }
    }, [userId])

    

    const renderPost = usersPosts.map((post, i) => {
        return <Post key={i} post={post} />
    })

    const renderReviews = usersPosts.map((post, i) => {
        return <li key={i}>{post.postBody}</li>
    })

    return (
        <div className="profile-container">
            <div className="profile-left">
                <h1>Hello {currentUser?.name}</h1>

                <div className="favorites">
                    <div className="favorite-game"></div>
                    {/* <p>{renderFavorites}</p> */}
                </div>

                <div className="reviews">
                    <div className="recent-reviews">
                        <h2>Recent Reviews</h2>
                    </div>
                    <ul>{renderReviews}</ul>
                </div>
            </div>

            <div className="profile-post">
                <div className="post-container">{renderPost}</div>
            </div>
            <div>
                <Setting currentUser={currentUser} />
            </div>
        </div>
    )
}
