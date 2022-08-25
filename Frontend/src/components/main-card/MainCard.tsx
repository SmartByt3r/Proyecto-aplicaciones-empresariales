import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ToDo } from "../todo/ToDo";

export const MainCard = () => {
  return (
    <div className="main-card">
      <div className="header">
        <h1 className="text-center">TODO's</h1>
        <Form className="form mb-3">
          <Form.Control type="text" placeholder="Añade un nuevo ToDo" />
          <Button>
            <i className="bi bi-plus" />
          </Button>
        </Form>
      </div>
      <div className="todo-outlet">
        <ToDo>
          Hacer caca asdasdasdja sd ajskld alksdj askljd aksj alskj dlaksjd
          laksjdlaksjd lks{" "}
        </ToDo>
        <ToDo>Hacer caca</ToDo>
        <ToDo>Hacer caca</ToDo>
        <ToDo>Hacer caca</ToDo>
        <ToDo>Hacer caca</ToDo>
        <ToDo>Hacer caca</ToDo>
        <ToDo>Hacer caca</ToDo>
        <ToDo>Hacer caca</ToDo>
        <ToDo>Hacer caca</ToDo>
        <ToDo>Hacer caca</ToDo>
      </div>
      <div className="footer">
        Tienes 2 tareas pendientes <Button variant="danger">Borrar Todo</Button>
      </div>
    </div>
  );
};
