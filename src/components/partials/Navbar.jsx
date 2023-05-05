import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../../navbar.css'

export default function Navbar({ currentUser, handleLogout }) {

	const navigate = useNavigate()
	const [value, setValue] = useState('')

	const handleChange = (e) => {
		const location = e.target.value 
		setValue(location)
		navigate(location)
	}

	const loggedIn = (
		<>
			{/* if the user is logged in... */}
			<nav className='nav-bar'>
				<div className='nav-left'>
					
					<div className='btn'>
						<Link to="/home">
							<p>Home</p>
						</Link>
					</div>

					<div className='btn'>
						<Link to="/">
							<p>Friends</p>
						</Link>
					</div>

					<div className='btn'>

						<select onChange={handleChange} value={value} name="create-post">

							<option value={'/new'}>New Post</option>

							<option value={'/search'}>New review</option>

						</select>
						
					</div>

				</div>

				<div className='nav-right'>
				<div className='btn'>
						<Link to="/search">
							<p>Search</p>
						</Link>
					</div>

					<div className='btn'>
						<Link to="/profile">
							<p>profile</p>
						</Link>
					</div>

					<div className='btn'>
						<Link to="/">
							<p onClick={handleLogout}>logout</p>
						</Link>
					</div>

				</div>
			</nav>
		</>
	)

	const loggedOut = (
		<>
			{/* if the user is not logged in... */}
			<nav className='nav-bar-logged-out'>
				<div className='nav-right'>

				<div className='btn'>
					<Link to="/register">
						<p>register</p>
					</Link>
				</div>

				<div className='btn'>
					<Link to="/login">
						<p>login</p>
					</Link>
				</div> 

				</div>
			</nav>
		</>
	)

	const border = { 'border-bottom': '2px solid black' }





	return (
		<div>{currentUser ? loggedIn : loggedOut}</div>
	)
}