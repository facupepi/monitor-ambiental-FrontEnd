import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

import {Link} from 'react-router-dom';

function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Monitor de Gases</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to="/" className="nav-link">Home</Link>
                        </Nav.Link>

                        <Nav.Link>
                            <Link to="/about" className="nav-link">Acerca De</Link>
                        </Nav.Link>
                        
                        <Nav.Link>
                            <Link to="/contact" className="nav-link">Contacto</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        
    );
}

export default Header;