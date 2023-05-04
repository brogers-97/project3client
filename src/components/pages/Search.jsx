import axios from 'axios'
import { useState, useEffect } from 'react'
import '../../App.css'

export default function Search() {

    const [game, setGame] = useState()
    const [gameData, setGameData] = useState([])
    const [gameDetails, setGameDetails] = useState()
    const [gameClicked, setGameClicked] = useState(false)

    useEffect(() => {
        const url = `https://api.rawg.io/api/games?key=974a7e3a2bb142c7be0f2b4cbfed4dfe&page_size=10&search=${game}`
        axios.get(url)
            .then(response => {
                setGameData(response.data.results)
            })
            .catch(console.warn)
    },[game])


    const displayGames = gameData.map((game,i) => {
        return(
            <div key={i} onClick={() => handleGameClick(game.id)}>
                <h1>{game.name}</h1>
                <p> Release Year: {game.released.split('-')[0]}</p>
                
            </div>
        )
    })


    const handleGameClick = (e) => {
        const url = `https://api.rawg.io/api/games/${e}?key=974a7e3a2bb142c7be0f2b4cbfed4dfe`
        axios.get(url)
            .then( response => {
                setGameDetails(response.data)
            })
            .catch(console.warn)
        setGameClicked(true)
        console.log('click',e)
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
            
            <div className='search-bar'>
                <input id='search-input' type="text" />
                <input onClick={handleSearchClick} type="submit" />
            </div>

            <div className='search-container'>
                <div className='left'>
                    {displayGames}
                </div>

                <div className='right'>
                    {gameClicked && gameDetails ? (
                        <h2>{gameDetails.name}</h2>
                    ) : (
                        <p>no details</p>
                    )}
                </div>
            </div>

        </div>

    )
}
