import React, { useState } from 'react';
import { useForm } from '@formspree/react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    // Configuración de Formspree
    const [state, handleSubmit] = useForm("xbljdppd");

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Actualiza el campo correspondiente en el estado formData
        setFormData((prevData) => ({...prevData, [name]: value}));

        // Elimina el mensaje de error del campo que se está corrigiendo
        setErrors((prevErrors) => {
            const { [name]: _, ...restErrors } = prevErrors;
            return restErrors;
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.name) formErrors.name = 'El nombre es obligatorio.';
        else if (!formData.email) formErrors.email = 'El correo electrónico es obligatorio.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'El correo electrónico no es válido.';
        else if (!formData.message) formErrors.message = 'El mensaje es obligatorio.';
        else if (formData.message.length > 500) formErrors.message = 'El mensaje no puede tener más de 500 caracteres.';
        else if (formData.name.length > 50) formErrors.name = 'El nombre no puede tener más de 50 caracteres.';
        else if (formData.email.length > 50) formErrors.email = 'El correo electrónico no puede tener más de 50 caracteres.';
        
        return formErrors;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            try {
                await handleSubmit(e); // Usa handleSubmit de Formspree
                setSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
                setErrors({});
            } catch (error) {
                console.error("Error al enviar el formulario:", error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div>
            <h1>Contacto</h1>
            <p>Puedes enviarnos un mensaje utilizando el formulario a continuación.</p>

            {submitted && (
                <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
                    ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.
                </Alert>
            )}

            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Ingresa tu nombre" 
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="name@example.com" 
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        name="message" 
                        rows={3} 
                        value={formData.message} 
                        onChange={handleChange} 
                        placeholder="Escribe tu mensaje aquí" 
                        isInvalid={!!errors.message}
                    />
                    <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={state.submitting}>
                    {state.submitting ? 'Enviando...' : 'Enviar'}
                </Button>
            </Form>
        </div>
    );
}

export default Contact;
