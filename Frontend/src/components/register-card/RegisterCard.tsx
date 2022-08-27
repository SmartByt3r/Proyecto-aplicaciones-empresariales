import { useFormik } from "formik";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/login";

import "./RegisterCard.css";

export const RegisterCard = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await registerUser(values);
        navigation("/login");
      } catch (error) {
        setLoading(false);
        alert((error as Error).message);
      }
    },
  });
  return (
    <div className="main-card register-card">
      {/*-------- Header del card -------- */}
      <div className="header">
        <h1 className="text-center">Registrate</h1>
      </div>
      <Form className="register-form mb-3" onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Text>Nombre:</Form.Text>
          <Form.Control
            id="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Text>Nombre de usuario:</Form.Text>
          <Form.Control
            id="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Text>Correo:</Form.Text>
          <Form.Control
            id="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Text>Contraseña:</Form.Text>
          <Form.Control
            id="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "Registrarse"
          )}
        </Button>
        <Button onClick={() => navigation("/login")} variant="outline-primary">
          Iniciar sesión
        </Button>
      </Form>
    </div>
  );
};
