import { Button, Form, Navbar, Nav, NavDropdown } from "react-bootstrap";
import Title from "./Title.js";

const NavBar = () => {
    return <Navbar bg="dark" variant="dark">
        <Navbar.Brand><Title smallSize={"h4"} bigSize={"h2"} pt={0} /></Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/feed">Feed</Nav.Link>
            <Nav.Link href="/post">Post</Nav.Link>
            {/* <Nav.Link href="/DM">Messages</Nav.Link> */}
            <NavDropdown title="Profile" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/">Sign Out</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        <h5 className="text-white">{localStorage["username"]}</h5>
    </Navbar>
}

export default NavBar;