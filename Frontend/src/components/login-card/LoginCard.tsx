import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/login";
import "./LoginCard.css";

export const LoginCard = () => {
  const navigation = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values.email, values.password)
        .then(() => {
          navigation("/");
        })
        .catch(console.error);
    },
  });
  return (
    <div className="main-card login-card">
      {/*-------- Header del card -------- */}
      <div className="header">
        <h1 className="text-center">Iniciar sesión</h1>
      </div>
      <Form className="login-form mb-3" onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Text>Correo:</Form.Text>
          <Form.Control
            type="text"
            id="email"
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

        <Button type="submit">Iniciar sesión</Button>
        <Button
          variant="outline-primary"
          onClick={() => navigation("/register")}
        >
          Registrarse
        </Button>
      </Form>
    </div>
  );
};
