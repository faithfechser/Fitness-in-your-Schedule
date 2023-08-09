import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const AppNavbar = () => {
    // set modal display state
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='navbar'>
            <Navbar bg='dark' variant='dark' expand='lg'>
                <Container fluid>
                    <Navbar.Brand as={Link} to='/'>
                        Exercise Stats Search
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbar' />
                    <Navbar.Collapse id='navbar'>
                        <Nav className='ml-auto'>
                            <Nav.Link as={Link} to='/'>
                                Search For Excercises
                            </Nav.Link>
                            {/* if user is logged in show saved workouts and logout */}
                            {Auth.loggedIn() ? (
                                <>
                                    <Nav.Link as={Link} to='/saved'>
                                        See Your Saved Excercises
                                    </Nav.Link>
                                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                                </>
                            ) : (
                                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* set modal data up */}
            <LoginForm show={showModal} onHide={() => setShowModal(false)} />
            <SignupForm show={showModal} onHide={() => setShowModal(false)} />
        </div>
    );
}

export default AppNavbar;