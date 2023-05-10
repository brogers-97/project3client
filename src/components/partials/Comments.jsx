import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

export default function Comments({ currentUser, id, comments }) {
    const [formData, setFormData] = useState({
        content: '',
        postedBy: currentUser.name,
    })
    const [commentsArray, setCommentsArray] = useState(comments)

    const handleSubmit = async (e, form) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('jwt')
            // make the auth headers
            const options = {
                headers: {
                    Authorization: token,
                },
            }
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/posts/${id}/comments`,
                form,
                options
            )
            setCommentsArray([...response.data.comments])
            setFormData({ ...formData, content: '' })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='card bg-primary text-light mb-4'>
            <Form className="w-75 mx-auto" onSubmit={(e) => handleSubmit(e, formData)}>
                <Form.Label htmlFor="content">Comments:</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Join the discussion!"
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            content: e.target.value,
                        })
                    }
                />

                <button type="submit">Submit</button>
            </Form>
            {commentsArray.map((comment) => (
                <div key={comment.id}>
                    <p><span className='fw-bold'>{comment.postedBy}:</span> {comment.content}</p>
                </div>
            ))}
        </div>
    )
}
