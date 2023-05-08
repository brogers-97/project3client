import React, { useState } from 'react'
import axios from 'axios'

export default function Setting({ currentUser }) {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleChangePassword = async (e) => {
        e.preventDefault()
        if (newPassword !== confirmNewPassword) {
            setErrorMessage('New password and confirm password do not match.')
            return
        }
        try {
            const data = {
                userId: currentUser._id,
                oldPassword,
                newPassword,
                confirmNewPassword,
            }
            console.log(currentUser)
            const token = localStorage.getItem('jwt')
            // make the auth headers
            const options = {
                headers: {
                    Authorization: token,
                },
            }
            const response = await axios.put(
                `${process.env.REACT_APP_SERVER_URL}/users/change-password`,
                data,
                options
            )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleChangePassword}>
            <div>
                <label>
                    Old Password:
                    <input
                        type="password"
                        autoComplete="current-password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    New Password:
                    <input
                        type="password"
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Confirm New Password:
                    <input
                        type="password"
                        autoComplete="new-password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                </label>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            <button type="submit">Change Password</button>
        </form>
    )
}
