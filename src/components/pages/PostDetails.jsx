import React, {useState,useEffect} from "react"
import { useNavigate, useParams} from "react-router-dom"
import PostForm from "../partials/PostForm"
import axios from "axios"

export default function New() {
    const [inputData, setInputData] = useState({})
    const [showForm, setShowForm] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}}/post/${id}`)
        .then(response => {
            console.log(response)
            setInputData(response.data.result)
        })
        .catch(console.warn)
    })

    const handleSubmit = async (e, form) => {
        e.preventDefault()
        try{
            const putResponse = await axios.put(`${process}/post/${id}`)
            setInputData(putResponse.data.result)
            setShowForm(false)


        } catch(error) {
            console.log(error)
       }

   }

   const handleDeleteClick = async () => {
    try{
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/post/${id}`)

        //navigates home page
        navigate("/")

    } catch(err) {
        console.log(err)
    }
}
    
  
    const initialState = {
        postTitle: inputData.postTitle,
        postBody: inputData.postBody,
        taggedGame: inputData.taggedGame,
        rating: inputData.rating,
        imageUrl: inputData.imageUrl
    }

    const details = (
        <>
            {/* <h1>{postTitle}</h1>
            <p>{taggedGame}</p>
            <p>{rating}</p>
            <h2>{postBody}</h2>
            <h2>{imageUrl}</h2> */}


            <button onClick={handleDeleteClick}>Delete Bounty</button>
        </>
    )

    const form = (
        <>
        <h1>Post Edit Form for {inputData.postTitle}</h1>

            <PostForm 
                initialState={initialState}
                handleSubmit={handleSubmit}
                handelCancelClick={() => setShowForm(false)}
            />
        </>
    )




    return (
        <div>
            {!showForm && <button onClick={() => setShowForm(true)}>Edit</button>}
            {showForm ? form : details}
        </div>
    )
}