export default function Comments(props) {
    // const [form, setForm] = useState(props.initialState)

    return (
        <>
            <div>
                <label htmlFor="comment">Comments:</label>
                <input
                    type="text"
                    placeholder="enter comment"
                    id="comment"
                    // value={form.comment}
                    // onChange={(e) =>
                    //     setForm({ ...form, comment: e.target.value })
                    // }
                />
            </div>

            <button type="submit">Submit</button>
        </>
    )
}
