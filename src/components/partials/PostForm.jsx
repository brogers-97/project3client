import { useState } from "react"

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

    const [form, setForm] = useState(props.initialState)

    return (
        <div>
            <form onSubmit={e =>props.handleSubmit(e, form)}>
                <div>
                    <label htmlFor="title">Post Title</label>
                    <input 
                        type="text"
                        placeholder="enter name"
                        id="postTitle"
                        value={form.postTitle}
                        onChange={e => setForm({...form, postTitle: e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor="postBody">Post body</label>
                    <input 
                        type="text"
                        placeholder="enter your review"
                        id="postBody"
                        value={form.postBody}
                        onChange={e => setForm({...form, postBody: e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor="taggedGame">Tagged Game</label>
                    <input 
                        type="number"
                        placeholder="enter game"
                        id="taggedGame"
                        value={form.taggedGame}
                        onChange={e => setForm({...form, taggedGame: e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <input 
                        type="number"
                        placeholder="Rating"
                        id="rating"
                        value={form.rating}
                        onChange={e => setForm({...form, rating: e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor="isReview">Review:</label>
                    <input 
                        type="checkbox"
                        id="isReview"
                        value={form.isReview}
                        onChange={e => setForm({...form, isReview: !form.isReview})}
                    />
                </div>
                <div>
                    <label htmlFor="imageUrl">images:</label>
                    <input 
                        type="text"
                        placeholder="enter image"
                        id="imageUrl"
                        value={form.imageUrl}
                        onChange={e => setForm({...form, imageUrl: e.target.value})}
                    />
                </div>

                <button type="submit">Submit</button>



            </form>

            <button onClick={props.handleCancel}> Cancel </button>
        </div>
    )
}