import '../../App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const token = localStorage.getItem('jwt')

export default function Details(props) {
    const email = jwt_decode(localStorage.jwt).email
    const [currentUser, setCurrentUser] = useState()
    // console.log('current user from state', currentUser.favoriteGames)

    useEffect(() => {
        const getUserData = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users?userEmail=${email}`)
                setCurrentUser(response.data)
                console.log(response)
            }catch(err){
                console.log(err)
            }
        }
        getUserData()
    },[])
    const navigate = useNavigate()

    const handleFavoriteClick = async () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/users`
        console.log('first', currentUser)
        const gameIndex = currentUser.favoriteGames.indexOf(
            props.gameDetails.id
        )
        let updatedFavoriteGames

        if (gameIndex !== -1) {
            updatedFavoriteGames = [
                ...currentUser.favoriteGames.slice(0, gameIndex),
                ...currentUser.favoriteGames.slice(gameIndex + 1),
            ]
        } else {
            updatedFavoriteGames = [
                ...currentUser.favoriteGames,
                props.gameDetails.id,
            ]
        }
        let updatedUser = {
            ...currentUser,
            favoriteGames: updatedFavoriteGames
        }
        setCurrentUser(updatedUser)

        console.log('upated user', currentUser.favoriteGames)


        try {
            const options = {
                headers: {
                    Authorization: token,
                },
            }
            const response = await axios.put(url, updatedUser, options)
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {!props.gameDetails ? (
                <h1>no Details</h1>
            ) : (
                <div className="game-div">
                    <h1>{props.gameDetails.name}</h1>
                    <img
                        className="game-img"
                        src={props.gameDetails.background_image}
                        alt=""
                    />
                    <div className="d-flex p-2 justify-content-around">
                    <button className="btn btn-primary" onClick={handleFavoriteClick}>
                        {currentUser.favoriteGames.includes(
                            props.gameDetails.id
                        )
                            ? 'Un-favorite'
                            : 'favorite'}
                    </button>
                    <button className="btn btn-primary"
                        onClick={() => {
                            navigate('/new', {
                                state: {
                                    origin: 'search',
                                    gameName: props.gameDetails.name,
                                    gameId: props.gameDetails.id,
                                    isReview: false,
                                },
                            })
                        }}
                    >
                        post about this game
                    </button>
                    <button className="btn btn-primary"
                        onClick={() => {
                            navigate('/new', {
                                state: {
                                    origin: 'search',
                                    gameName: props.gameDetails.name,
                                    gameId: props.gameDetails.id,
                                    isReview: true,
                                },
                            })
                        }}
                    >
                        review this game
                    </button>
                    </div>
                </div>
            )}
        </div>
    )
}
