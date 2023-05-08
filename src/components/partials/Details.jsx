import '../../App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const token = localStorage.getItem('jwt')

export default function Details(props) {
    console.log(jwt_decode(localStorage.jwt))
    const [currentUser, setCurrentUser] = useState(jwt_decode(localStorage.jwt))
    console.log('current user from state', currentUser.favoriteGames)

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
        setCurrentUser({
            ...currentUser,
            favoriteGames: updatedFavoriteGames,
        })

        console.log('upated user', currentUser.favoriteGames)

        // console.log('click',props.gameDetails.id)

        try {
            const options = {
                headers: {
                    Authorization: token,
                },
            }
            const response = await axios.put(url, currentUser, options)
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
                    <button onClick={handleFavoriteClick}>
                        {currentUser.favoriteGames.includes(
                            props.gameDetails.id
                        )
                            ? 'Un-favorite'
                            : 'favorite'}
                    </button>
                </div>
            )}
        </div>
    )
}
