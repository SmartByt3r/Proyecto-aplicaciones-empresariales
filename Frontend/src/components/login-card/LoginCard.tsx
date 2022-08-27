import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { login } from "../../services/login";
import "./LoginCard.css";

export const LoginCard = () => {
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);
  const navigation = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      login(values.email, values.password)
        .then((token) => {
          setToken(token);
          navigation("/");
        })
        .catch((e) => {
          console.error(e);
          alert(e.message);
          setLoading(false);
        });
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
            "Iniciar sesión"
          )}
        </Button>
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
