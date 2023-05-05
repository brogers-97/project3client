import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Post from '../partials/Post'
import axios from 'axios'
import '../../profile.css'
const token = localStorage.getItem('jwt')
let userId;

export default function Profile({ currentUser, handleLogout }) {

    const [msg, setMsg] = useState('')
    const [usersPosts, setUsersPosts] = useState([])
    const navigate = useNavigate()

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
        const url = `${process.env.REACT_APP_SERVER_URL}/posts`
        axios.get(url)
            .then(response => {
                setUsersPosts(response.data)
            })
            .catch(console.warn)
    }, [])


    useEffect(() => {
        const decoded = jwt_decode(token)
        console.log(decoded.name)
        userId = decoded._id
    },[])
    
    
    const renderPost = usersPosts.map((post, i) => {
        if(post.poster === userId)
        return (
            <Post key={i} post={post}/>
        )
    })

    const renderReviews = usersPosts.map((post, i) => {
        if(post.poster === userId && post.isReview == true){
            return(
                <li>{post.postBody}</li>
            )
        }
    })
    


    return (

        <div className='profile-container'>

            <div className='profile-left'>

                <h1>Hello {currentUser?.name}</h1>

                <div className='favorites'>
                    <div className='favorite-game'>

                    </div>
                </div>

                <div className='reviews'>
                    <div className='recent-reviews'>
                        <h2>Recent Reviews</h2>
                    </div>
                    <ul>
                        {renderReviews}
                    </ul>
                </div>

            </div>
            


            <div className='profile-post'>
                <div className='post-container'>
                    {renderPost}
                </div>
            </div>

        </div>
    )
}
