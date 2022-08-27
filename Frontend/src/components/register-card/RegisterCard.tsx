import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./RegisterCard.css";

export const RegisterCard = () => {
  const navigation = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
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
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Text>Nombre de usuario:</Form.Text>
          <Form.Control
            id="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Text>Correo:</Form.Text>
          <Form.Control
            id="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Text>Contraseña:</Form.Text>
          <Form.Control
            id="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </Form.Group>

        <Button type="submit">Registrarse</Button>
        <Button onClick={() => navigation("/login")} variant="outline-primary">
          Iniciar sesión
        </Button>
      </Form>
    </div>
  );
};