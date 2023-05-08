import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import BootstrapNavbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default function Navbar({ currentUser, handleLogout }) {
    const loggedInNavbarItems = (
        <>
            <NavDropdown title="Make a post" id="basic-nav-dropdown">
                <NavDropdown.Item href="/search">About a game</NavDropdown.Item>
                <NavDropdown.Item href="/new">
                    About something else
                </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="#" onClick={handleLogout}>
                Log Out
            </Nav.Link>
        </>
    )

    const loggedOutNavbarItems = (
        <>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Log in</Nav.Link>
        </>
    )

    return (
        <BootstrapNavbar bg="dark" variant="dark" expand="lg">
            <Container>
                <BootstrapNavbar.Brand href="/home">
                    Joystick Junkies
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
                <BootstrapNavbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {currentUser
                            ? loggedInNavbarItems
                            : loggedOutNavbarItems}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    )
}
