import axios from 'axios'
import { useState, useEffect } from 'react'
import '../../App.css'

export default function Search() {
    const [game, setGame] = useState()
    const [gameData, setGameData] = useState([])
    const [gameDetails, setGameDetails] = useState()
    const [gameClicked, setGameClicked] = useState(false)

    useEffect(() => {
        if (game) {
            const url = `${process.env.REACT_APP_SERVER_URL}/games?search=${game}`
            axios
                .get(url)
                .then((response) => {
                    console.log(response.data.results)
                    setGameData(response.data.results)
                })
                .catch(console.warn)
        }
    }, [game])

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
        console.log('click', e)
    }

    const handleSearchClick = (e) => {
        e.preventDefault()
        const searchInput = document.getElementById('search-input')
        const searched = searchInput.value
        setGame(searched)
    }

    // console.log('games',gameData)

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
                    {gameClicked && gameDetails ? (
                        <div>
                            <h2>{gameDetails.name}</h2>
                            <img
                                className="game-img"
                                src={gameDetails.background_image}
                                alt={`image of${gameDetails.name}`}
                            />
                            {/* <div dangerouslySetInnerHTML={{__html: gameDetails.description}}></div> */}
                        </div>
                    ) : (
                        <p>no details</p>
                    )}
                </div>
            </div>
        </div>
    )
}
