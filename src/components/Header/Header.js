import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { CiShare1 } from "react-icons/ci";

function Header() {
    const [show, setShow] = useState(false);

    // Maneja el estado del modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>Monitor Ambiental</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
                            <Nav.Link as={Link} to="/about" className="nav-link">Acerca De</Nav.Link>
                            <Nav.Link as={Link} to="/contact" className="nav-link">Contacto</Nav.Link>
                        </Nav>
                        {/* Botón de Compartir */}
                        <Button variant="outline-primary" onClick={handleShow} className="ms-2">
                            Compartir<CiShare1 />
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modal para mostrar el QR */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Compartir esta página</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <QRCodeCanvas 
                        value={window.location.href} 
                        size={200} 
                        level="H"  
                    />
                    <p className="mt-3">Escanea el código QR para abrir esta página en otro dispositivo.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Header;
