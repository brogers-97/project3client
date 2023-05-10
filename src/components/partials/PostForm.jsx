import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default function PostForm(props) {
    const [formData, setFormData] = useState({
        postTitle: "",
        postBody: "",
        imageUrl: "",
        taggedGame: "",
        rating: "",
        isReview: false,
    })
    // can use this for conditional logic with props.originIsSearch if we decide we'd like to hide fields
    const [postIsAboutGame, setPostIsAboutGame] = useState(true)

    useEffect(() => {
        setFormData({ ...props.initialState })
    }, [props.initialState])

    const gameOnlyFields = (
        <>
            <Row className="align-items-center">
                <Col>
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
                            value={formData.taggedGame}
                        />
                    </Form.Group>
                </Col>{' '}
                <Col>
                    <Form.Group className="mb-3" controlId="rating">
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
                </Col>{' '}
                <Col>
                    <Form.Check
                        size="lg"
                        type="checkbox"
                        id="isReview"
                        label="review"
                        checked={formData.isReview}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                isReview: e.target.checked,
                            })
                        }
                    />
                </Col>
            </Row>
        </>
    )

    return (
        <Container className="bg-primary text-light rounded-4">
            <Form onSubmit={(e) => props.handleSubmit(e, formData)}>
                <Form.Group className="mb-3" controlId="postTitle">
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
                <Form.Group className="mb-3" controlId="postBody">
                    <Form.Label>Post:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={10}
                        value={formData.postBody}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                postBody: e.target.value,
                            })
                        }
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="imageUrl">
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
                <button className="btn btn-primary" type="submit">
                    Submit
                </button>
                <button
                    className="btn btn-primary"
                    onClick={props.handleCancel}
                >
                    {' '}
                    Cancel{' '}
                </button>
            </Form>
        </Container>
    )
}
