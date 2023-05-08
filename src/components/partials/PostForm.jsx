import { useState } from 'react'
import Form from 'react-bootstrap/Form'

export default function PostForm(props) {
    /*{
        isReview: "boolean",
        postTitle: "",
        postBody: "",
        taggedGame: 1,
        rating: 0,
        imageUrl: "false",

    }
    */

    const [formData, setFormData] = useState(props.initialState)
    const [ postIsAboutGame, setPostIsAboutGame ] = useState(true)

    const gameOnlyFields = (
        <>
                        <Form.Group
                    /* think we should probably be hiding this -- user's never gonna
                    need to put it in manually right? Just disabling it in the meantime*/
                    className="mb-3"
                    controlId="taggedGame"
                >
                    <Form.Label>Tagged Game</Form.Label>
                    <Form.Control
                        disabled
                        size="lg"
                        type="text"
                        placeholder="tagged game"

                        value={formData.taggedGame}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                taggedGame: e.target.value,
                            })
                        }
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="rating"
                >
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="rating"
                        value={formData.rating}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                rating: e.target.value,
                            })
                        }
                    />
                </Form.Group>
                <Form.Check
                    size="lg"
                    type="checkbox"
                    id="isReview"
                    label="review"
                    checked={formData.isReview}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            isReview: !formData.isReview,
                        })
                    }
                />
        </>
    )

    return (
        <>
            <Form onSubmit={(e) => props.handleSubmit(e, formData)}>
                <Form.Group
                    className="mb-3"
                    controlId="postTitle"
                >
                    <Form.Label>Post Title:</Form.Label>
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="post title"
                        value={formData.postTitle}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                postTitle: e.target.value,
                            })
                        }
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="postBody"
                >
                    <Form.Label>Post:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.postBody}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                postBody: e.target.value,
                            })
                        }
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="imageUrl"
                >
                    <Form.Label>Post Image:</Form.Label>
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="image source"
                        value={formData.imageUrl}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                imageUrl: e.target.value,
                            })
                        }
                    />
                </Form.Group>
                {postIsAboutGame ? gameOnlyFields : null}
                <button type="submit">Submit</button>
                <button onClick={props.handleCancel}> Cancel </button>
            </Form>
        </>
    )
}
