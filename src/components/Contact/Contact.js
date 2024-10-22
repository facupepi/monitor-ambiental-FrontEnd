import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Contact() {
    const [formData, setFormData] = useState({name: '', email: '', message: ''});
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData,[name]: value}));
    };

    /*
    prevData es el valor actual del estado (antes de la actualización).
    ...prevData es una operación de "spread" que copia todas las propiedades existentes de prevData (es decir, los datos actuales del formulario).
    [name]: value es una notación dinámica de clave en objetos. Lo que hace es actualizar el campo del formulario que coincide con el name del input modificado. Por ejemplo, si el name es "email", esta línea actualizará la propiedad email de formData con el valor que el usuario ingresó (por ejemplo, "user@example.com").
    */

    const validateForm = () => {
        let formErrors = {};
        if (!formData.name) formErrors.name = 'El nombre es obligatorio.';
        if (!formData.email) formErrors.email = 'El correo electrónico es obligatorio.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'El correo electrónico no es válido.';
        if (!formData.message) formErrors.message = 'El mensaje es obligatorio.';
        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        console.log(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            setErrors({});
        } else setErrors(validationErrors);

        /*Esta línea verifica si no hay errores en el objeto validationErrors. Object.keys(validationErrors) devuelve un arreglo con todas las claves del objeto, y length === 0 significa que el objeto está vacío, lo que indica que no hay errores y que los datos del formulario son válidos.
        
        Si no hay errores, se establece submitted en true para mostrar el mensaje de éxito y se restablece el formulario a su estado inicial. Si hay errores, se establecen en el estado para mostrarlos al usuario.*/
        };


    return (
        <div>
            <h1>Contacto</h1>
            <p>Puedes enviarnos un mensaje utilizando el formulario a continuación.</p>

            {submitted && (<Alert variant="success" onClose={() => setSubmitted(false)} dismissible> ¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.</Alert>)}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ingresa tu nombre" isInvalid={errors.name}/>
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" isInvalid={errors.email}/>
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" name="message" rows={3} value={formData.message} onChange={handleChange} placeholder="Escribe tu mensaje aquí" isInvalid={errors.message}/>
                <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">Enviar</Button>
            </Form>
        </div>
    );
}

export default Contact;
