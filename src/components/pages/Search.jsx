import axios from 'axios'
import { useState, useEffect } from 'react'
import '../../App.css'
import jwt_decode from 'jwt-decode'
import Details from '../partials/Details'

const token = localStorage.getItem('jwt')
let userId

export default function Search(props) {
    const [game, setGame] = useState()
    const [gameData, setGameData] = useState([])
    const [gameDetails, setGameDetails] = useState()
    const [gameClicked, setGameClicked] = useState(false)
    const [currentUser, setCurrentUser] = useState()
    const [showFave, setShowFave] = useState()

    useEffect(() => {
        setCurrentUser(props.currentUser)
    }, [props.currentUser])

    useEffect(() => {
        if (game) {
            const url = `${process.env.REACT_APP_SERVER_URL}/games?search=${game}`
            axios
                .get(url)
                .then((response) => {
                    setGameData(response.data.results)
                })
                .catch(console.warn)
        }
    }, [game])

    useEffect(() => {})

    const displayGames = gameData.map((game, i) => {
        return (
            <div key={i} onClick={() => handleGameClick(game.id)}>
                <h1>{game.name}</h1>
                <p>
                    {' '}
                    Release Year:{' '}
                    {game.released ? game.released.split('-')[0] : 'Unknown'}
                </p>
            </div>
        )
    })

    const handleGameClick = (e) => {
        const url = `${process.env.REACT_APP_SERVER_URL}/game/details?id=${e}`
        axios
            .get(url)
            .then((response) => {
                setGameDetails(response.data)
            })
            .catch(console.warn)
        setGameClicked(true)
    }

    const handleSearchClick = (e) => {
        e.preventDefault()
        const searchInput = document.getElementById('search-input')
        const searched = searchInput.value
        setGame(searched)
    }

    useEffect(() => {
        const decoded = jwt_decode(token)
        userId = decoded._id
    }, [])

    // const handleFavoriteClick = async () => {
    //     const gameId = gameDetails.id
    //     let tempUser = currentUser
    //     const gameIndex = tempUser.favoriteGames.indexOf(gameId)
    //     if (gameIndex !== -1) {
    //         tempUser.favoriteGames.splice(gameIndex, 1)
    //     } else {
    //         tempUser.favoriteGames.push(gameId)
    //     }
    //     setCurrentUser(tempUser)
    //     console.log('gameId', gameId)
    //     console.log(currentUser)

    //     if (currentUser.favoriteGames.includes(gameId)) {
    //         setShowFave(true)
    //     } else {
    //         setShowFave(false)
    //     }

    //     try {
    //         const options = {
    //             headers: {
    //                 Authorization: token,
    //             },
    //         }
    //         const response = await axios.put(
    //             `${process.env.REACT_APP_SERVER_URL}/users`,
    //             currentUser,
    //             options
    //         )
    //         console.log(response)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    return (
        <div>
            <div className="search-bar">
                <form>
                    <input id="search-input" type="text" />
                    <input onClick={handleSearchClick} type="submit" />
                </form>
            </div>

            <div className="search-container">
                <div className="left">{displayGames}</div>

                <div className="right">
                    <Details gameDetails={gameDetails} />
                </div>
            </div>
        </div>
    )
}
