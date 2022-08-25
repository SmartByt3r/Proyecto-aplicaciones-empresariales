import { PropsWithChildren } from "react";
import { Button, Form } from "react-bootstrap";

export const ToDo = (props: PropsWithChildren) => {
  return (
    <div className="to-do">
      <Form className="form">
        <Form.Check type="checkbox" />
        <div className="todo-content">{props.children}</div>
        <Form.Group className="todo-button-container">
          <Button variant="outline-primary">
            <i className="bi bi-pencil" />
          </Button>
          <Button variant="outline-danger">
            <i className="bi bi-trash" />
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};
